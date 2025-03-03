// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "../interfaces/ITrustee.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";

library Lib {
  /**@dev PPerform boolean equality operation */
  function boolEq(bool actual, bool expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform equality operation on uint256 typed data*/
  function uint8Eq(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform greater than or equals-to operation on uint8 typed data*/
  function uint8Ge(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  {
    _compare(actual >= expected, errorMessage);
  }

  /**@dev Perform greater-than operation on uint8 typed data*/
  // function uint8G(uint8 actual, uint8 expected, string memory errorMessage) internal pure
  // {
  //   _compare(actual > expected, errorMessage);
  // }

  /**@dev Perform less-than operation on uint8 typed data*/
  function uint8L(uint8 actual, uint8 expected, string memory errorMessage) internal pure 
  {
    _compare(actual < expected, errorMessage);
  }

  /**@dev Perform equality operation on address typed data*/
  function addressEq(address actual, address expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform not-equals-to operation on address typed data*/
  function addressNE(address actual, address expected, string memory errorMessage) internal pure 
  {
    _compare(actual != expected, errorMessage);
  }

  /**@dev Perform equality operation on uint256 typed data*/
  function uint256Eq(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual == expected, errorMessage);
  }

  /**@dev Perform greater than or equals-to operation on uint256 typed data*/
  function uint256GE(uint256 actual, uint256 expected, string memory errorMessage, uint8 toReturn) internal pure returns(uint256 _return)
  {
    _compare(actual >= expected, errorMessage);
    _return = toReturn == 0? actual : expected;
  }

  /**@dev Perform greater than operation on uint256 typed data*/
  function uint256G(uint256 actual, uint256 expected, string memory errorMessage, uint8 toReturn) internal pure returns(uint256 _return) {
    _compare(actual > expected, errorMessage);
    _return = toReturn == 0? actual : expected;
  }

  /**@dev Performs a single check with returned error messsage*/
  function uint256L(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual < expected, errorMessage);
  }

  /**@dev Perform less than or equals-to operation on uint256 typed data*/
  function uint256LE(uint256 actual, uint256 expected, string memory errorMessage) internal pure 
  {
    _compare(actual <= expected, errorMessage);
  }

  /**@dev Performs a single check with returned error messsage*/
  function _compare(bool value, string memory errorMessage) internal pure 
  {
    require(value, errorMessage);
  }

  /**@dev Performs a single check with returned error messsage*/
  function getNetPay(uint256 grossPay) internal pure returns(uint256 _netPay, uint256 fee) {
    require(grossPay >= 1 ether, "Invalid gross amount" );
    fee = (grossPay * 5) / 100;
    _netPay = grossPay - fee;
  }

  function getAllowance(address token, address owner, address beneficiary) internal view returns(uint allowance) {
    allowance = IERC20(token).allowance(owner, beneficiary);
  }

  function spendAllowance(uint allowance, address token, address owner, address receiver) internal returns(uint _return) {
    if(allowance > 0) {
      require(IERC20(token).transferFrom(owner, receiver, allowance));
    }
    _return = allowance;
  }

  function encode(string memory arg) internal pure returns(bytes memory _return) {
    _return = abi.encode(arg);
  }

}