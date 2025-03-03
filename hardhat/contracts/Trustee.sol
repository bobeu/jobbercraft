// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./interfaces/ITrustee.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
  @title Trustee: Manages payment for parties to job i.e hirer and jobber.
  @author Bobeu : https://github.com/bobeu 

  ERROR CODE
  ----------
  "18" : Withdrawal failed
  "19" : Bal < netPay
  "20" : NothingToWithdraw
 */
contract Trustee is ITrustee, Ownable, ReentrancyGuard {
  // Amount withdrawable by hirer from this contract at any time.
  uint256 public withdrawable;

  // Amount engaged at any time
  uint256 public engaged;

  //Job owner
  address public hirer;

  // tESTUSDT address
  address public tESTUSDT;

  //Payment ledger
  mapping(address => uint256) public payment;

  constructor (address hirer_, address _tESTUSDT) {
    hirer = hirer_;
    tESTUSDT = _tESTUSDT;
  }

  receive() external payable {}

  /**
    @dev Splits payment for jobbers on this hirer's request.
    Note hirer is able to withdraw available balances in this contract, but 
        we ensure withdrawables does not affect the position of currently 
        engaged jobbers.
  */
  
  function splitPayment(
    IJob.Jobber[] memory tos, 
    uint netPay,
    uint fee,
    uint refundable,
    address feeTo
  ) external onlyOwner returns(bool) {
    // require(feeTo != address(0), "W");
    uint _balances = _getBalances();
    uint size = tos.length;
    uint eachPay = netPay / size;

    if(_balances < (netPay + fee)) revert('Trustee: Balances too low');
    if(fee > 0) { _withdraw(feeTo, fee); }
    if(netPay > 0) {
      for(uint i = 0; i < size; i++ ){
        address to = tos[i].identifier;
        payment[to] += eachPay;
      }
    }
    if(refundable > 0) {
      payment[_hirer()] += refundable;
    }

    return true;
  }
  
  function _getCUSDAddr() private view returns(address _token) {
    _token = tESTUSDT;
  }

  /**
    @dev Withdraw payment.
        Only preselected address are allowed.
   */
  function withdraw() external payable nonReentrant returns(bool) { 
    address to = _msgSender();
    uint pay = payment[to];
    require(pay > 0, "Trustee: Nothing to withdraw");
    payment[to] = 0;
    _withdraw(to, pay); 
    return true; 
  }

  function _withdraw(address to, uint amount) private {
    require(IERC20(_getCUSDAddr()).transfer(to, amount), 'Trustee: Withdrawal failed');
  
  }

  function _getBalances() internal view returns(uint _balances) {
    address token = _getCUSDAddr();
    _balances = IERC20(token).balanceOf(address(this));
  } 

  function _hirer() internal view returns(address) { return hirer ; }
}