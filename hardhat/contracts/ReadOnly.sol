/** SPDX-License-Identifier: MIT*/
pragma solidity 0.8.24;

import "./Storage.sol";

abstract contract ReadOnly is Storage {

  /**@dev Returns list of interested participants for a job 
          @param jobId - {job index} */
  function getRequests(uint jobId) public view isJobIdValid(jobId) returns(Jobber[] memory) 
  {
    return _getJobRequests(jobId);
  }

  /**@dev Read single job from storage.
      @param jobId - Job index
  */
  function getJobInfo(uint jobId) external view isJobIdValid(jobId) returns(JobMetadata memory) {
    return _getJobData(jobId);
  }

  /**@dev Read all jobs from storage.
  */
  function viewJobs() public view returns(JobMetadata[] memory all) {
    return _getAllJobs();
  }

  /**
    @dev See { Storage - _getPosition} 
      @param jobId - Job index/position.
  */
  function getPosition(address jobber, uint jobId) public view isJobIdValid(jobId) returns (uint8) 
  {
    return uint8(_getPosition(jobber, jobId));
  }

}