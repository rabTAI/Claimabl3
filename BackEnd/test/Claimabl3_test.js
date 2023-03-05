const { expect } = require("chai");
const { ethers } = require("hardhat");
const axios = require("axios");
var crypto = require("crypto");



describe("Claimabl3.sol", () => {
    let contractFactory;
    let contract;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    before(async () => {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        contractFactory = await ethers.getContractFactory("Claimabl3");
        contract = await contractFactory.deploy();
        console.log("Claimabl3 deployed to:", contract.address);
        console.log("User address ", owner.address);
    });

    describe("Correct setup", () => {
        it("should be named 'Claimabl3", async () => {
            const name = await contract.name();
            expect(name).to.equal("Claimabl3");
        });
    });

    describe('IERC165 supportsInterface', () => {
        it('IERC165', async () => {
            expect(await contract.supportsInterface('0x01ffc9a7')).to.equal(true);
        });
        it('IERC721 nft', async () => {
            expect(await contract.supportsInterface('0x80ac58cd')).to.equal(true);
        });
        it('IERC721Metadata', async () => {
            expect(await contract.supportsInterface('0x5b5e139f')).to.equal(true);
        });
        // it('IERC721Enumerable totalSupply, tokenOfOwnerByIndex', async () => {
        //     expect(await contract.supportsInterface('0x780e9d63')).to.equal(true);
        // });
        // it('IERC2981 royalties', async () => {

        //     expect(await contract.supportsInterface('0x2a55205a')).to.equal(true);
    });

    describe("Mint", () => {
        it(`Should Mint NFTs`, async () => {
            let message = crypto.randomBytes(20).toString('hex');
            let { data } = await axios.post("http://localhost:4782/getSignedMessage", {
                code: message
            });
            console.log('tst')
            const signingAddress = ethers.utils.verifyMessage(message, data.signature)
            console.log("Message Signer ", signingAddress);
            await contract.setMessageSigner("0xdB35C36CdBdD56008D73e43ef64F5F12c492883f");

            let tx = await contract.verifyHash(message, data.signature);

            let tokenId = await getTokenId(tx);
            console.log("New token ID ", parseInt(tokenId));
            console.log("Total Supply", parseInt(await contract.totalSupply()));
            console.log("User balance ", parseInt(await contract.balanceOf(owner.address)));
            console.log(">>>>>>");
        });
    });
});

async function getTokenId(tx) {
    const _tx = tx instanceof Promise ? await tx : tx;
    const _receipt = await _tx.wait();
    const _interface = new ethers.utils.Interface([
        'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
    ]);
    // console.log(_receipt)
    const _data = _receipt.logs[0].data;
    const _topics = _receipt.logs[0].topics;
    const _event = _interface.decodeEventLog('Transfer', _data, _topics);
    return _event.tokenId;
}