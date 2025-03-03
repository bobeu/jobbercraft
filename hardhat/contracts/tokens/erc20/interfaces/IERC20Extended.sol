// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

interface IERC20Extended {

    /**
     * @dev Mints `amount` tokens from `from` to `to` 
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Mint} event.
     */
    function mint(
        address to,
        uint256 amount
    ) external returns (bool);
}
