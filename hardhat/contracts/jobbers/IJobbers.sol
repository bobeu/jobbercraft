// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

interface IJobber {
  event MembershipUpgraded(address indexed who);
  event MembershipDowngraded(address indexed who);

  function becomeAJobber(
    string memory name,
    string memory aka,
    string memory field,
    string memory profileURI,
    string memory avatar
  ) external payable returns(bool);
  function queryStatus(address target) external view returns(uint8);
  function getAvatarInfo(address jobber) external view returns(uint);
  function updateProfileInfo(string memory field, string memory profileURI, string memory avatar) external payable returns(bool);
}