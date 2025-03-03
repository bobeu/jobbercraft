// SPDX-License-Identifier: MIT

pragma solidity  0.8.24;

import "@openzeppelin/contracts/interfaces/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

interface IERC721Extended is IERC721, IERC721Receiver, IERC721Metadata {
  function pause() external;
  function unpause() external;
  function burn(uint256 tokenId) external returns(bool);
  function mint(address to, uint256 tokenId) external returns(bool);
}