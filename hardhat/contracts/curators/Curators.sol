/** SPDX-License-Identifier: MIT
*/
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/** @title Curator

    ERROR CODE
    ---------
    "21" : Out of bound error
    "22" : Registered
    "23" : Not a curator

 */
abstract contract Curators is Ownable {
  enum Status { NONE, REGISTERED, WHITELISTED }
  struct Curator {
    Status status;
    uint id;
    address addr;
  }

  // Curators
  Curator[] public curators;

  // Curators curatorsId
  mapping(address => uint) public curatorsId;

  // Mapping of curators to jobId
  mapping(address => mapping(uint => bool)) private isCurator;

  // Validate permissions
  modifier checkEligibility(uint8 selector, string memory errorMessage) {
    if(selector > 2) revert('21');
    require(_curatorStatus(_msgSender()) == Status(selector), errorMessage);
    _;
  }

  /**@dev We initialize the curators array with an empty element. This helps 
      us properly track valid curators easily. Approved Curators cannot have 
      zero id.
   */
  constructor() {
    curators.push();
  }

  // Return the current status of a curator
  function _curatorStatus(address target) internal view returns(Status status) {
    uint id = curatorsId[target];
    status = curators[id].status;
  }

  // Registers a new curator. Such address must not have been registered
  function becomeACurator() public checkEligibility(0, "22") {
    address caller = _msgSender();
    uint id = curators.length;
    curatorsId[caller] = id; 
    curators.push(Curator(Status.REGISTERED, id, caller));
  }

  // Curators are free to remove themselves
  function deleteMe() public {
    address caller = _msgSender();
    uint id = curatorsId[caller];
    require(id > 0, '23');
    delete curators[id];
    curatorsId[caller] = 0;
  }

  /**@dev Only Owner can whitelist curators.
    Such address must have been registered before the invocation can be 
    successful.
  */ 
  function whitelistCurators(address[] memory targets) public onlyOwner {
    for(uint i = 0; i < targets.length; i++) {
      address target = targets[i];
      uint id = curatorsId[target];
      if(_curatorStatus(target) == Status.REGISTERED) {
        curators[id].status = Status.WHITELISTED;
      }
    }
  }

  // Return curators status to none
  function blacklistCurators(address[] memory targets) public onlyOwner {
    for(uint i = 0; i < targets.length; i++) {
      curators[curatorsId[targets[i]]].status = Status.NONE;
    }
  }

  // Return curator's address.
  function _getCuratorAddr(uint curatorId) internal view returns(address _curator) {
    require(curatorId < curators.length, "21");
    _curator = curators[curatorId].addr;
  }

}