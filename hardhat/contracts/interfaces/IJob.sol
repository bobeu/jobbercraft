// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./ICommon.sol";

interface IJob {
  error InvalidSelector(uint8);

  event CompletedJob(uint jobId, uint newSpotId, address indexed _trustee, address indexed hirer);
  event JobCanceled(uint jobId, uint amountRefundToHirer, uint amountPaidToJobbers);
  event JobCreated(uint jobId, uint offer, address trustee, string detail);
  event WorkRequested(
    uint jobId, 
    address indexed jobber, 
    uint actualOffer, 
    uint negotiatedPrice, 
    uint proposedCompletionDateInDays
  );
  event RequestApproved(uint jobId, uint8[] jobbers);
  event Submission(uint jobId, address indexed jobber);
  event JobCompleted(uint jobId);

  /**@dev Steps of jobs. Each job inherits the {JobStatus.CLOSED} status by default which is 
    synchronous, and can only be in one step at any given time.  
   */
  enum JobStatus { NULL, OPEN, TAKEN, COMPLETED, CLOSED }

  // Job type
  enum JobType { ONEOFF, PARTTIME, FULLTIME }

  /**
    @dev Camp all kinds of fees applicable.
      o PROBATION: By jobbers on sign up.
      o APPROVED: By jobbers while upgrading.
      o CANCELLATION: Paid by Hirer for cancelling jobs that are already engaged.
      o PLATFORMONCANCEL: Fee charged in favor of the platform, computed on gross value of CANCELLATION.
      o WITHDRAWAL: BY Jobbers as % of earning.
  */
  enum Fees { PROBATION, APPROVED, CANCELLATION, PLATFORMONCANCEL, WITHDRAWAL}

  /**
    @dev Post a new job. 
    @param jobRef - Link or any reference of type string to the job.
    @param proposedEndDateInDays - Proposed/preferred assigned time to execute the job.
    Note - Should be in days.
  */

  function postJob(
    uint8 jobType,
    string memory title,
    string[] memory tags,
    string memory jobRef, 
    uint16 proposedEndDateInDays, 
    uint offerPrice, 
    uint curatorId
  ) external payable returns(uint jobId);
  function requestToWork(uint256 jobId, uint16 proposedCompletionDateInDays, uint256 myBestPrice) external returns(bool);
  function approveRequests(uint jobId, uint8[] memory selectedPositions) external returns(bool);
  function submitAndSignCompletion(uint jobId) external returns(bool);
  function approveCompletion(uint jobId) external returns(bool);
  function cancelJob(uint jobId) external returns(bool);
  // function becomeAJobber() external payable returns(bool);
  function getJobInfo(uint jobId) external view returns(JobMetadata memory);

  //Job's subdata type
  struct Metadata {
    JobType jobType;
    bytes title;
    bytes jobRef;
    uint8 signature;
    uint64 datePosted;
    uint64 proposeEnd;
    uint256 offerPrice;
    address hirer;
    JobStatus jStatus;
  
  }

  //Job data type
  struct JobMetadata {
    Metadata job;
    Jobber[] requests;
    bytes[] tags;
    address curator;
  }

  //Jobber's data type
  struct Jobber {
    uint64 proposedJobEnd;
    uint256 myBestPrice;
    address identifier;
    bool signed;
    bool acceptance;
  }

}
