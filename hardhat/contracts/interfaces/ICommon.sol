// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface ICommon {
    /**@dev Categories of jobber.  */
  enum Tier { NONE, PROBATION, APPROVED }

  struct Membership {
    Tier status;
    uint avatarId;
    JobberData other;
  }

  // membership
  struct MembershipBase {
    uint probFee;
    address upgrader;
  }

  struct JobberData {
    bytes name;
    bytes aka;
    bytes field;
    bytes profileURI;
    bytes avatar;
    uint8 ratings;
    uint8 level;
  }
  
}