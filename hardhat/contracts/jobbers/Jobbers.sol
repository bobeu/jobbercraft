// SPDX-License-Identifier: MIT 

pragma solidity 0.8.24;

import "./IJobbers.sol";
import "../utils/Lib.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "../tokens/erc721/interfaces/IERC721Extended.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Jobber is IJobber, Ownable, Pausable {
  using Address for address;
  using Lib for *;

  //Members count
  uint256 public counter;

  // Required fee to update profile
  uint256 public updateFee;

  //Account to receive fee
  address public feeTo;

  ///@dev Membership controller
  ICommon.MembershipBase public mShip;

  ///@dev Membership zone
  mapping (address => uint) public ids;

  ICommon.Membership[] private jobbers;

  modifier checkmate(bool condition, string memory errorMessage) {
    require(condition, errorMessage);
    _;
  }

  modifier onlyApprovedOrOwner() {
    require(
      mShip.upgrader != address(0) &&
      (_msgSender() == mShip.upgrader ||
      _msgSender() == owner()),
    "Not authorized"
   );
    _;
  }

  /**@dev We made an initial push to the jobbers array. This is to ensure 
    any unregistered user have a default id of 0.
   */
  constructor(
    address _feeTo,
    // address _probationer, 
    // address _approver,
    address _upgrader
    // IERC20 _feeDenom
  ) { 
    mShip.upgrader = _upgrader; 
    feeTo = _feeTo;
    jobbers.push();
    updateFee = 5 ether;
  }

  receive() external payable {}

  function _initialize (uint _probFee, address _upgrader) private {
    
    mShip = ICommon.MembershipBase(_probFee == 0? 1e17 wei : _probFee, _upgrader);
    // feeDenom = _feeDenom;
  }

  function _getId(address target) internal view returns(uint _return) {
    _return = jobbers[ids[target]].avatarId;
  }

  /**@dev Internal - Returns membership status of caller
    @param target - Address of caller
  */
  function _status(address target) internal virtual view returns(uint _return) {
    uint id = ids[target];
    _return = jobbers[id].other.level;
  }

  /**@dev View - Returns membership status of caller
    Using an array of string literal in memory, we
    return membership status.
   */
  function myStatus() public view returns(string memory) 
  {
    string[3] memory str = ["None", "Probation", "Approved"];
    uint8 idx = jobbers[ids[_msgSender()]].other.level;
    return str[idx];
  }

  function queryStatus(address target) external view returns(uint8) {
    return jobbers[_getId(target)].other.level;
  }

  /**
  @dev Signs up 'target'
      @notice When jobbers sign up, Probation membership NFT is minted to the 'target' address. 
  */
  function _signUp(
    address target,
    string memory name,
    string memory aka,
    string memory field,
    string memory profileURI,
    string memory avatar

  ) private checkmate(_status(target) == 0, "Already signed up"){
    counter ++;
    uint id = counter; // We will eventually switch to using ERC721
    // IERC721Extended(mShip.probationer).mint(target, id);
    ids[target] = id;
    jobbers.push(
      ICommon.Membership(
        ICommon.Tier.PROBATION,
        id,
        ICommon.JobberData(
          name.encode(),
          aka.encode(),
          field.encode(),
          profileURI.encode(),
          avatar.encode(),
          0,
          1
        ) 
      )
    );
  }

  function _checkAndWithdrawFee(uint probFee, uint256 value) private {
    value.uint256GE(probFee, 'Msg value insufficient', 1);
    (bool success,) = feeTo.call{value: value}('');
    require(success);
  }

  /**
  @dev User sign up to be probation member.
    o Caller's current membership status must be null.
    o Must send along with call the sufficient value for signup fee.
    Note: Fee is denominated in stablecoin e.g uSDT
  */
  function becomeAJobber(
    string memory name,
    string memory aka,
    string memory field,
    string memory profileURI,
    string memory avatar
  ) external payable whenNotPaused returns(bool) {
    _checkAndWithdrawFee(mShip.probFee, msg.value);
    _signUp(_msgSender(), name, aka, field, profileURI, avatar);
    return true;
  }

  /**@dev Jobbers can only update field, profileURI and avatar after sign up
    It costs something to do that
   */
  function updateProfileInfo(string memory field, string memory profileURI, string memory avatar) external payable returns(bool) {
    address caller = _msgSender();
    uint id = ids[caller];
    jobbers[id].other.field = field.encode();
    jobbers[id].other.profileURI = profileURI.encode();
    jobbers[id].other.avatar = avatar.encode();
    _checkAndWithdrawFee(updateFee, msg.value);
    return true;
  }

  /**
    @dev Upgrade 'target' from probation to Approved member.
      @param target - address to upgrade.
      Note - 'target' must already be on probation before now.
   */
  function _upgrade(address target) private checkmate(_status(target) == 1,"Not on probation"){
    uint id = _getId(target);
    jobbers[id].other.level = 2;
    jobbers[id].status = ICommon.Tier.APPROVED;

  }

    /**
    @dev Downgrade 'target' from Approved member to probation.
      @param target - address of target to downgrade.
      Note - 'target' must already be an approved member before now.
   */
  function _downgrade(address target) private checkmate(_getId(target) > 0, "18"){
    ICommon.Membership memory _m = jobbers[ids[target]];
    uint id = _getId(target);
    uint8 newStatus;
    if(_m.other.level == 2) {
      newStatus = 1;
    }

    if(_m.other.level == 1) {
      newStatus = 0;
    }

    jobbers[id].other.level = newStatus;

  }

    // Set Miscellaneous
  function updateMembershipInfo(
    uint _probFee,
    address _upgrader,
    uint _updateFee
  ) public onlyOwner {
    updateFee = _updateFee == 0? 50 ether : _updateFee;
    _initialize(_probFee, _upgrader);
  }

  /**
    @dev Upgrade or downgrade'target'
      o 'target' must be the probation member.
      o Upgrader must be approved client.
   */
  function upgradeOrDowngradeUser(address target, uint8 upgrade_) public whenNotPaused onlyApprovedOrOwner {
    if(upgrade_ == 1) {
      _upgrade(target);
      emit MembershipUpgraded(target);
    } else {
      _downgrade(target);
      emit MembershipDowngraded(target);
    }
  }

  function withdraw(address to, address erc20, uint amount) public onlyOwner() {
    if(to != address(0)) {
      if(erc20 != address(0) && erc20.isContract()) {
        require(IERC20(erc20).transfer(to, amount), "ERC20 Transfer failed");
      } else {
        (bool s,) = to.call{value: amount}('');
        require(s, 'Value Transfer failed.');
      }
    }
  }

  function getJobbers() public view returns(ICommon.Membership[] memory _return) {
    _return = jobbers;
    return _return;
  }

  function getAvatarInfo(
    address jobber
  ) external view returns(uint) {
    return ids[jobber];
  }

  function getAvatarId(address _of) public view returns(uint) {
    return _getId(_of);
  }

}