// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/** JobberCraft Approved Membership GoodWill
    @author : Bobeu
    Github: https://github.com/bobeu
*/
contract Approved is Ownable, ERC721Pausable {
    //Membership counter
    // uint256 private counter;

    address public probationer;

    //Initialize state
    constructor(
        address _factoryAddr,
        address _probationer
    ) ERC721("Approved Member", "HAM") {
        transferOwnership(_factoryAddr);
        require(_probationer != address(0), "Approved: Zero address");
        probationer = _probationer;
    }

    /**
    Fallback: Alternative/Inplicit method of minting HPM
   */
    receive() external payable {
        revert();
    }

    // function totalMembers() external returns(uint256 _total) { _total = counter; }

    /**
  @notice Mint Jobbercraft Approved Membership NFT
          Owner's privilege.
          Note: Can only upgrade user that was already on probation.
              o Here, we are simply migrating owner of 'tokenId' to approved member.
              o 'TokenId' must not have been approved before now.
              o No user can have more than one approved membership NFT.
  */
    function mint(
        address to,
        uint256 tokenId
    ) external onlyOwner returns (bool _return) {
        address _owner = IERC721(probationer).ownerOf(tokenId);
        _return = _owner == to;
        if (_return) {
            _safeMint(to, tokenId);
            _approve(_msgSender(), tokenId);
        }
    }

    ///@dev Downgrades user mapped to 'tokenId' Note - Owner's privilege
    function burn(uint tokenId) external onlyOwner returns (bool) {
        // address who = ownerOf(tokenId);
        _burn(tokenId);

        return true;
    }

    /** See ERC721 _transfer. HAM is not transferable*/
    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        require(paused(), "");
        super._transfer(from, to, tokenId);
    }

    /** @dev halts contract execution */
    function pause() external onlyOwner {
        _pause();
    }

    /** @dev Continues contract execution */
    function unpause() external onlyOwner {
        _unpause();
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external override returns (bytes4) {}

}