// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

import "./ReadOnly.sol";
import "./utils/Lib.sol";
import "./utils/SafeCall.sol";
import "./interfaces/ITrustee.sol";
import "./Trustee.sol";
import "./curators/Curators.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
// import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";

/**
      @@@\
      @@@ |
      @@@ |
      @@@ |
      @@@ |
 @@@  @@@ |
 @  \/  @ |
 @@@@@@@@ |
 \________|

*/  

/**
    ERROR CODE
    ----------
    "1" : "Not a member".
    "2" : "No interested participants yet".
    "4" : "Probation hit limit.
    "6" : "Invalid caller".
    "7" : "Invalid entry".
    "8" : "Approval to zero address".
    "9" : "Already signed".
    "11" : "Insufficient value provided".
    "13" : "Time elapsed: Cannot initialize again".
    "14" : "Offer price less than minimumOffer". 
    "15" : Only owner | curator.
    "16" : Low bal
    "17" : OnlyOwner

*/

contract JobberCraft is ReadOnly, Pausable, Curators {
  using Lib for *;

  error TestError(address pay, uint offer, address caller);

  // Contract initializer. Useful in testing and minor upgrade
  uint8 private initializer;

  //Mapping of hirer to trustee
  mapping (address => address) public trustees;

  // Caller must be a valid member of JobberCraft
  modifier isValidMember() {
    require(_queryJobberStatus(_msgSender()) > 0, "1");
    _;
  }

  /**@dev Initialized storage vars 
   * @param _initializer : Used to set initial parameters. 
   *  The parameters can only be altered the number of times the _initializer was set.
  */
  constructor (uint8 _initializer, address _feeTo) Storage(_feeTo) { 
    initializer = _initializer; 
  }

  function initialize (
    uint8 _cancellationRate,
    uint256 _minimMumOffer, 
    address _paymentCurrency,
    address _jobbersContract
  ) public onlyOwner {
      require(initializer > 0, "13");
      initializer --;
    _initialize (
      _cancellationRate, 
      _minimMumOffer, 
      _paymentCurrency,
      _jobbersContract 
    );
  }

  //Fallback/Receive func
  receive () external payable {
    Address.sendValue(payable(feeTo), msg.value);
  }

  /**@dev Posts new Job
          @param jobRef - Can be Job URL or any reference to the current job.
          @param proposedEndDateInDays - Expected duration to complete the job.
          @param curatorId : On the frontend, curators are mapped to their respective ids,
                  Hirers may add curator service or not.
          @param offerPrice : The amount in stable coin the hirer is willing to pay for this job.
          Note - Hirer must have given approval to withdraw the offerPrice in cUSD, which
                  must also be greater than minimum offer.
                  Note : Payment currency is in cUSD. 
  */
  function postJob(
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint16 proposedEndDateInDays, 
    uint offerPrice, 
    uint curatorId
  ) external payable whenNotPaused returns(uint jobId) {
    address _trustee = trustees[_msgSender()];
    if(_trustee == address(0)) {
      _trustee = address(new Trustee(_msgSender(), paymentCurrency));
      trustees[_msgSender()] = _trustee;
    }
    paymentCurrency
      .getAllowance(_msgSender(), address(this))
        .uint256GE(minimMumOffer, '14', 0)
          .uint256GE(offerPrice, '14', 1)
            .uint256G(1e18, '14', 0)
              .spendAllowance(paymentCurrency, _msgSender(), _trustee);

    unchecked {
      offerPrice = offerPrice - 1e18;
    }
    jobId = _postJob(jobType, title, tags, jobRef,  uint64(proposedEndDateInDays * 1 days),  offerPrice,  _msgSender(),  _getCuratorAddr(curatorId));
    emit JobCreated(jobId, offerPrice, _trustee, jobRef);
    
    return jobId;
  }

  /**
    @dev Jobbers show interest to work on a particular job
        @param jobId - The Job id Jobber is applying for. An id not greater than the job array 
          length is expected.
        @param proposedCompletionDateInDays - Jobbers can propose completion date.
          This however should not be confused for that of the hirer. Hirer will eventually
          accept or reject the proposal date. 
        Note: The parameter "proposedCompletionDateInDays" should be in days e.g 7
        @param myBestPrice - Best price jobber will accept the job. This enables better negotiation
          thereby protecting the interests and rights of both parties.
        
        Note: Intending Jobber applying for this job must either be on probation or approved member.  
   */
  function requestToWork(
    uint256 jobId, 
    uint16 proposedCompletionDateInDays, 
    uint256 myBestPrice
  ) external whenNotPaused isValidMember isJobIdValid(jobId) enforceJobStatus(jobId, JobStatus.OPEN) returns(bool) {
    JobMetadata memory j = _getJobData(jobId);
    address caller = _msgSender();
    uint bestRate = myBestPrice == 0 ? j.job.offerPrice : myBestPrice;
    uint64 completionDate = proposedCompletionDateInDays == 0 ? j.job.proposeEnd : proposedCompletionDateInDays * 1 days;
    
    _enforceJobOfferLimit(j.job.offerPrice, caller);
    _enforceCompliance(caller);
    require(proposedCompletionDateInDays > 0 && proposedCompletionDateInDays < 365 days, "7");
    _createAndUpdateNewRequest(
      caller, 
      jobId,
      completionDate,
      bestRate
    );

    _postComplianceFor(caller, block.timestamp);

    emit WorkRequested(jobId, caller, j.job.offerPrice, myBestPrice, completionDate);
    return true;
  }

  /**@dev Hirer accepts request (s) to work on job.
        @param jobId - Job index
        @param selectedPositions - List of jobbers hirer accepts 
                            to collaborate on the job.
                            It should contain jobbers' 
                            position Id.
        Note - Caller be the creator of job at jobId
              - Job must be open.
              - There must be requests greater than 0.
              It is assumed Hirer has scrutinized properly, the interests shown in job at 
                jobId, hence, proposed completion time of each collaborator is 
                evaluated, and that best satisfy the hirer's interest.
  */
  function approveRequests(
    uint jobId, 
    uint8[] memory selectedPositions
  ) 
    external 
    whenNotPaused 
    isJobIdValid(jobId) 
    enforceJobStatus(jobId, JobStatus.OPEN)
    returns(bool)
  {
    JobMetadata memory j = _getJobData(jobId);
    _onlyHirerOrCurator(j.job.hirer, _msgSender(), j.curator, true);
    j.requests.length.uint256GE(1, "2", 0);
    for(uint8 i = 0; i < selectedPositions.length; i++) {
      uint8 sel = uint8(selectedPositions[i]);
      j.requests[sel].identifier.addressNE(address(0), "8");
      uint64 jobbersProposedJobEnd = j.requests[sel].proposedJobEnd;
      _updateRequest(jobId, sel);
      if(jobbersProposedJobEnd > j.job.proposeEnd) {
        _updateProposeEndDate(jobId, jobbersProposedJobEnd);
      }
    }
    _setStatus(jobId, JobStatus.TAKEN);

    emit RequestApproved(jobId, selectedPositions);
    return true;
  }

   /**@dev Utility to submit completed jobs.
        Note: We enforce strict rules that ensure caller is a 
                valid collaborator since position of any valid
                collaborator will always be greater than zero. 
          - If there is only one collaborator, we simply set 
              completion and exit the program.
          - If collaborator is more than one, we check that caller's 
              signature is not appended before now, otherwise the program reverts.

        Note If collaborator is more than one, then minimum of 2 signatures
              are required to  set job state to `completed`.
      @param jobId - Job index/position.
   */
  function submitAndSignCompletion(uint jobId) 
    public 
    isValidMember 
    isJobIdValid(jobId) 
    whenNotPaused
    enforceJobStatus(jobId, JobStatus.TAKEN) 
    returns(bool _return)
  {
    JobMetadata memory j = _getJobData(jobId);
    address caller = _msgSender();
    uint8 pos = _getPosition(caller, jobId);
    j.requests[pos].signed.boolEq(false, "9");
    if(j.requests.length == 1) return _setStatus(jobId, JobStatus.COMPLETED);
    uint8 sig;
    //If there was at least one signature
    if((j.job.signature + 1) == 2) {
      sig = 2;
      _return = _setStatus(jobId, JobStatus.COMPLETED);
    }

    //If there was no previous signature
    if((j.job.signature + 1) < 2) {
      sig = 1;
      _return = true;
    }
    _updateSignature(jobId, sig);
    _updateSignedFlag(jobId, pos);
    emit Submission(jobId, caller);

    return _return;
  }

  /**Hirer confirms and approve that job at jobId was completed and final.
        Note - Payment (less fee) is splitted among the jobbers.
              o Jobbers are able to withdraw payment from the trustee.
              o Rewards are minted to jobbers.
               Function is able to handle if there was collaboration or not.
        @param jobId - Job index.
  
  */
  function approveCompletion(uint jobId) 
    external 
    whenNotPaused
    enforceJobStatus(jobId, JobStatus.COMPLETED) 
    isJobIdValid(jobId) returns(bool) 
  {
    JobMetadata memory j = _getJobData(jobId);
    _onlyHirerOrCurator(j.job.hirer, _msgSender(), j.curator, true);
    _setStatus(jobId, JobStatus.CLOSED);
    (uint256 netPay, uint256 fee) = j.job.offerPrice.getNetPay();
    address _trustee = trustees[j.job.hirer];
    // uint len = j.requests.length;
    // require(_trustee != address(0), 'd');
    unchecked {
      SafeCall.safeSplit(ITrustee(_trustee), j.requests, netPay, fee + 1e18, 0, feeTo);
    }

    emit JobCompleted(jobId);
    return true;
  }

  /**@dev Internal: Enforces that Probationary members cannot accept jobs with 
      offer above certain limit e.g $500
      @param offerPrice - Actual price Hirer is willing to pay for
                            the job offer.
      Note :  We enquire from HPM NFT contract if caller owns a 
                balance. We can be sure that each jobber cannot hold
                more than 1 NFT collection at any time.
            o NFT membership is not transferable.
   */
  function _enforceJobOfferLimit(uint256 offerPrice, address jobber) internal view {
    uint256 c1 = IJobbers(jobberContract).getAvatarInfo(jobber);
    // if(c1 == 1) revert("Here");
    if(c1 == 1) {
      if(probationOfferLimit > 0) {
        offerPrice.uint256LE(probationOfferLimit, "4");
      }
    }
  }

  ///@dev Checks if caller is the hirer with jobId
  function _onlyHirerOrCurator(address hirer, address caller, address curator, bool doubleCheck) internal virtual {
    bool pass;
    if(caller == hirer) pass = true;
    if(!pass && doubleCheck) {
      if(curator != address(0)) {
        if(caller == curator) pass = true;
      }
    }
    require(pass, "15");
  }

  /**@dev Cancels job offer @param jobId - {Job index}
      Note 
        - Caller must be the hirer of Job with valid JobId.
        - Caller must not be a contract address.
        For more info, see { Storage.sol - _removeJob }
  
   */
  function cancelJob(uint jobId) external whenNotPaused isJobIdValid(jobId) returns(bool) {
    (uint refund, uint platformFee, uint splittable, Jobber[] memory requests) = _removeJob(jobId);
    address _trustee = trustees[_msgSender()];
    SafeCall.safeSplit(ITrustee(_trustee), requests, splittable, platformFee, refund, feeTo);

    emit JobCanceled(jobId, refund, splittable);
    return true;
  }

  /**
    @dev Withdraws from this contract if any.
        Note - Owner's privilege.
        @param to - Address to send funds to.
        @param amount - Amount to withdraw.
   */
  function withdraw(address to, uint amount) public onlyOwner{
    if(address(this).balance < amount) revert();
    (bool s,) = to.call{value: amount}("");
    if(!s) revert();
  }

  /** 
    @dev Halts contract execution 
      Note: Owner's privilege
  */
  function pause() public onlyOwner { _pause(); }

  /** 
    @dev Continues contract execution 
      Note: Owner's privilege
  */
  function unpause() public onlyOwner { _unpause(); }

    /**
    @dev Reset cancellation fee.
        Note - Owner's privilege.
        @param newRate - Cancellation rate.
         Rate should not be greater than 100%.
   */
  function setCancellationRate(uint8 newRate) public onlyOwner {
    newRate.uint8L(100, "7");
    _setCancellationRate(newRate);
  }

  function _beforeInvocation() internal view override {
    require(_msgSender() == owner(), "17");
  }

}


    