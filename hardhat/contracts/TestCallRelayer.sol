//SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract TestCallRelayer is Ownable {
  address private t;
  receive() external payable {}
  constructor (address _target) {
    t = _target;
  }

  function fakeWithdrawSomeBal(address to, uint amount) public onlyOwner {
    bytes memory data = abi.encodeWithSelector(
      bytes4(keccak256(bytes("withdrawBalance(address,uint256)"))), to, amount
    );
    (bool wiped, bytes memory _returnData) = t.call(data);
    Address.verifyCallResult(wiped, _returnData, "Oops");
  }

  function fakeClaim(address) public {
    bytes memory data = abi.encodeWithSelector(
      bytes4(keccak256(bytes("claimWORK()"))));
    (bool wiped, bytes memory _returnData) = t.call(data);
    Address.verifyCallResult(wiped, _returnData, "Oops");
  }

  function fakeWithdraw(uint8 which) public payable {
    bytes memory data = abi.encodeWithSelector(
      bytes4(keccak256(bytes("withdraw(uint8)"))), which
    );
    (bool wiped, bytes memory _returnData) = t.call(data);
    Address.verifyCallResult(wiped, _returnData, "Oops");
  }
}