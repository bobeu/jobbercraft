// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./IJob.sol";

interface ITrustee {
  error NothingToWithdraw();

  function splitPayment(
    IJob.Jobber[] memory tos, 
    uint netPay,
    uint fee,
    uint refundable,
    address feeTo
  ) external returns(bool);

  function withdraw() external payable returns(bool);
}