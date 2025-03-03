// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./Trustee.sol";
import "./utils/Lib.sol";
import "./interfaces/IJob.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "./tokens/erc721/interfaces/IERC721Extended.sol";
import "./jobbers/IJobbers.sol";

/** 
  
    ERROR CODE
    ----------
    "1" : Not a member.
    "3" : Ownership not found.
    "5" : Transfer failed.
    "7" : Invalid entry.
    "10" : Probation period is over.
    "12" : Max of 5 collaborators for a job.
    "16" : Job cannot be canceled at this stage.
    "18" : Target level differs.
    "19" : Type out of bound
*/

abstract contract Storage is IJob {
  using Lib for *;

  ///@dev Minimum threshold for all job offers.
  uint256 public minimMumOffer;

  address public jobberContract;

  //Account to receive fee
  address public feeTo;

  // Stablecoin address i.e cUSD
  address public paymentCurrency;

  ///@dev Cancellation rate
  uint8 public cancellationRate;

  ///@dev Limits the offer probationary members can accept.
  uint public probationOfferLimit;

  // Array of jobs
  JobMetadata[] private jobs;

  /**@dev Mapping of addresses in Jobs to position 
    i.e Jobber's position in the list of collaborators
    for each posted jobs.
  */ 
  mapping(address => mapping(uint => uint8)) private positions;

  //Mapping of Jobbers to compliance
  mapping(address => uint64) private compliance;

  /**@dev Guards against error accessing non-exisitng item in the job array.
            Job must be in an acceptable status.
  */
  modifier enforceJobStatus(uint256 jobId, JobStatus _jobStat)
  {
    uint8 jStatus = uint8(jobs[jobId].job.jStatus);
    jStatus.uint8Eq(uint8(_jobStat), "12");
    _;
  }

  modifier isJobIdValid(uint jobId) {
    uint jobIndex = jobs.length;
    jobId.uint256LE(jobIndex, "7");
    _;
  }

  constructor(address _feeTo) {
    feeTo = _feeTo;
  }

  function _initialize (
    uint8 _cancellationRate, 
    uint _minimMumOffer, 
    address _paymentCurrency,
    address _jobbersContract
  )
    internal 
  {
    minimMumOffer = _minimMumOffer;
    cancellationRate = _cancellationRate;
    paymentCurrency = _paymentCurrency;
    jobberContract = _jobbersContract;
  }

  function _now() internal view returns(uint64 _return) {
    _return = uint64(block.timestamp);
  }

  /**@dev Cancels job @param jobId - {job index}
    Note : Hirer is at liberty to cancel job anytime if:
        - Deadline has elapsed, or
        - Job in states other than completed.
      o Cannot cancel completed jobs.
    They're surcharged if wish to cancel when it is opened or taken and interest already shown.
    Cancellation fee (less platform fee) is splitted among collaborators.
  
   */
  function _removeJob(uint jobId) internal virtual isJobIdValid(jobId) returns (uint refund, uint platformFee, uint splittable, Jobber[] memory requests) {
    JobMetadata memory j = _getJobData(jobId);
    requests = j.requests;
    refund = j.job.offerPrice;
    msg.sender.addressEq(j.job.hirer, "3");
    require(uint8(j.job.jStatus) < uint8(JobStatus.COMPLETED), "16");

    if(j.job.jStatus == JobStatus.TAKEN || _now() > (j.job.datePosted + 24 hours)) {
      uint8 rate = _getCancellationRate();
      if(rate > 0) {
        uint cancellationFee = (refund * rate) / 100;
        unchecked {
          refund = refund - cancellationFee;
          platformFee = (cancellationFee * 15) / 100;
          splittable = cancellationFee - platformFee;
        }
      }
    }
    
    delete jobs[jobId];
  }

  //Returns cancellation rate: #Gas saving
  function _getCancellationRate() internal view returns (uint8 cRate) {
    cRate = cancellationRate;
  }

  /**
    @dev Returns job at jobId in storage 
      @param jobId - Job index/position.
  */
  function _getJobData(uint jobId) internal view virtual returns (JobMetadata memory _jobD ){ 
    _jobD = jobs[jobId]; 
  }

  /**
    @dev Populates job in job array in storage 
      @param jobRef - Job link or can be any string or byte;
      @param proposeEnd - Expected time to complete job;
      @param offerPrice - Price offer for this job;
        Note - We explicitly initialize 5 empty interest slots for 
                each job created.
    
      @notice 
      
      Noticable error:
            Using the current compiler version in the truffle config file, I get 
              compiler error while trying to instantiate a new request, which is 
              more like copying from memory to the storage, and solidity seems not 
              support such operation at this time.

              jobs.push(jobber({
                jobRef: jobRef,
                datePosted: uint32(block.timestamp),
                proposeEnd: uint32(proposeEnd),
                offerPrice: offerPrice,
                hirer: msg.sender,
                jStatus: JobStatus.OPEN,
                ...
                requests: new jobber[](5)  <=== This part causes a panic, and the program exit, producing the following Compile error.
              }))

              CompileError: UnimplementedFeatureError: Copying of type struct Iprobationer.jobber memory[] memory to storage not yet supported.

              This could have been the easiest way of creating an empty request array. Notwithstanding, to most problem, there is 
              at least a way out.
  */
  function _postJob( 
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint256 proposeEnd, 
    uint256 offerPrice,
    address hirer,
    address curator
  ) internal virtual returns(uint jobId) {
    require(jobType < 3, "19");
    jobId = jobs.length;
    jobs.push();
    jobs[jobId].job = Metadata(
                                JobType(jobType),
                                title.encode(),
                                jobRef.encode(), 
                                0, 
                                _now(), 
                                uint64(proposeEnd), 
                                offerPrice, 
                                hirer, 
                                JobStatus.OPEN
                              );
    jobs[jobId].curator = curator;
    for(uint8 i = 0; i < tags.length; i++) {
      jobs[jobId].tags.push(tags[i].encode());
    }
  }

  /**
    @dev Returns position for jobber on job at jobId in storage 
      @param jobber - Subject.
      @param jobId - Job index/position.
  */
  function _getPosition(address jobber, uint jobId) internal view virtual returns (uint8) 
  { return positions[jobber][jobId]; }

  /**
     @dev Returns updates position for jobber 
      @param jobber - Subject.
      @param jobId - Job index/position.
  */
  function _assignAndUpdateIndex(address jobber, uint jobId) internal virtual returns (uint8)
  {
    uint8 newPos = _createNewIndex(jobId);
    positions[jobber][jobId] = newPos;
    return newPos;
  }

  /**
    @dev Returns interests for job at jobId in storage 
      @param jobId - Job index/position.
  */
  function _getJobRequests(uint jobId) internal virtual view returns (Jobber[] memory req) 
  {
    req = jobs[jobId].requests;
  }

  /**
     @dev Returns updates position for jobber 
      @param jobber - Subject.
      @param jobId - Job index/position.
      @param proposedCompletionDateInDays - Jobber's proposed completion 
            time (in days),
      @param proposedOffer - Jobber's preferred price.
  */
  function _createAndUpdateNewRequest(
    address jobber, 
    uint jobId,
    uint64 proposedCompletionDateInDays,
    uint proposedOffer
  ) internal virtual 
  {
    _assignAndUpdateIndex(jobber, jobId);
    jobs[jobId].requests.push(
      Jobber(
        proposedCompletionDateInDays,
        proposedOffer,
        jobber,
        false,
        false
      )
    );
  }

  /**
    @dev Returns all jobs in storage 
  */
  function _getAllJobs() internal virtual view returns (JobMetadata[] memory _jobs) 
  {
    _jobs = jobs;
    return _jobs;
  }

  /**
    @dev Returns job at jobId from storage 
      @param jobber - Subject
  */
  function _getCompliance(address jobber) internal virtual view returns (uint64) 
  {
    return compliance[jobber];
  }

  /**
    @dev Returns job at jobId from storage 
      @param jobber - Subject
      @param value - Value to update for subject
  */
  function _postComplianceFor(address jobber, uint value) internal virtual 
  {
    compliance[jobber] = uint32(value);
  }

  /**@dev Generates new interest position for @param jobId - {Job index} */
  function _createNewIndex(uint jobId) private view returns (uint8) 
  {
    return uint8(jobs[jobId].requests.length);
  }

  function _queryJobberStatus(address target) internal virtual view returns(uint8 _return) {
    _return = IJobber(jobberContract).queryStatus(target);
  }

  /**@dev Enforces compliance. Jobbers with HiWork Probationary Membership
        are expected to upgrade within 60 days by undergoing compentency 
        test to upgrade by interacting with the probationer contract. 

      @notice - If jobber already passed test, they're encouraged to explicitly upgrade
        by calling designated function.
  */
  function _enforceCompliance(address caller) 
    internal
    virtual 
  {
    uint8 _status = _queryJobberStatus(caller);
    if(_status == 1) //i.e "Member on probation. 
    {
      uint64 startProbation = _getCompliance(caller);
      if(startProbation == 0) compliance[caller] = uint64(block.timestamp);
      else require(block.timestamp < startProbation + (60 * 1 days), "10");
    }

    if(_status == 0) revert ("1");
  }

  /**@dev Internal: Updates Job completion status. */
  function _setStatus(uint jobId, JobStatus status) internal virtual returns (bool) 
  {
    jobs[jobId].job.jStatus = status;
    return true;
  }

  /**@dev Updates signature for job 
        @param jobId {Job index} with 
        @param value - {New signature}
  */
  function _updateSignature(uint jobId, uint8 value) internal virtual 
  {
    jobs[jobId].job.signature = value;
  }

  /**@dev Updates signature for specific job 
        @param jobId {Job index} with 
        @param pos - Jobber's position
  */
  function _updateSignedFlag(uint jobId, uint8 pos) internal virtual 
  {
    jobs[jobId].requests[pos].signed = true;
  }

  /**@dev Updates request for Jobber at pos 
      @param jobId - job Index
      @param pos - Position of jobber for whom to update request
  */
  function _updateRequest(uint jobId, uint8 pos) internal virtual 
  {
    jobs[jobId].requests[pos].acceptance = true;
  }

  ///@dev Sets cancellatioon rate
  function _setCancellationRate(uint8 newFeeRate) internal virtual 
  {
    _beforeInvocation();
    cancellationRate = newFeeRate;
  }

  function _updateProposeEndDate(uint jobId, uint64 newDate) internal {
    jobs[jobId].job.proposeEnd = newDate; 
  }

  function setOfferLimit(uint _newLimit) public {
    _beforeInvocation();
    minimMumOffer = _newLimit;
  }

  function setProbationOfferLimit(uint _newLimit) public {
    _beforeInvocation();
    probationOfferLimit = _newLimit;
  }
  
  function _beforeInvocation() internal virtual {}
  function getLastJobId() public view returns(uint) {
    return jobs.length;
  }

}
