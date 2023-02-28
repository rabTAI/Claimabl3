// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/*
Claimabl3
*/

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract Claimabl3 is ERC721 {
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

    function mint(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public {
        require(supply.current() <= maxSupply,"Max supply");
        bytes32 _messageDigest = keccak256(  abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        address _messageSigner= ecrecover(_messageDigest, v, r, s);
        require(_messageSigner==messageSigner);
            supply.increment();
            uint256 _nftId=supply.current();
          _safeMint(msg.sender,_nftId);        
    }

    //** Only Owner Functions **

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }


    //** Support Functions **

}