// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
Claimabl3
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

contract Claimabl3 is ERC721 {
    using ECDSA for bytes32;
    using ECDSA for bytes;


    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    address public owner;
    address private messageSigner;


    string public baseURI;
   

    uint16 public constant maxSupply = 40;



    constructor() ERC721("Claimabl3", "CL3") {
        owner=msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not a contract owner");
        _;
    }

    //** Read Functions **

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }

    function tokenURI(uint256 tokenId)public view virtual override returns (string memory)
    {
        require(_exists(tokenId),"ERC721Metadata: URI query for nonexistent token");
        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(),
                        ".json"
                    )
                )
                : "";
    }

    function totalSupply() public view returns (uint256) {
        return supply.current();
    }

    //** Write Functions **

    function mint(address _to) private {
        supply.increment();  
        uint256 _nftId=supply.current();
        _safeMint(_to,_nftId);      
    }

    //** Only Owner Functions **

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function setMessageSigner(address _messageSigner) public onlyOwner{
        messageSigner=_messageSigner;
    }

    //** Support Functions **

    function verifyHash(string calldata message, bytes calldata signature) external   {
        require(supply.current() <= maxSupply,"Max supply");
        // bytes32 h = keccak256(message);
        bytes memory h = bytes(message);
        address signer = h.toEthSignedMessageHash().recover(signature);
        require(signer==messageSigner,"Not Eligible to mint");
        mint(msg.sender);
    }
}