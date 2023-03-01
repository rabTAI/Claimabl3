const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getOpcodeLength } = require("hardhat/internal/hardhat-network/stack-traces/opcodes");
const axios = require("axios");
const ethUtil = require('ethereumjs-util')
const sigUtil = require('eth-sig-util')

const { utils } = require('ethers');

const keccak256 = require('keccak256')


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
        it(`Should send request to server to sign the message`, async () => {
            let code = "hello";//Later will be implemented crypto hash for each request 
            let { data } = await axios.post("http://localhost:4782/getSignedMessage", {
                code
            });



            // Recover the address that actually signed this message
            const messageSignedAddress = sigUtil.recoverPersonalSignature({
                data: ethUtil.bufferToHex(Buffer.from(code, 'utf8')),
                sig: data.signedMessage
            });
            console.log(messageSignedAddress)
            // console.log(sig)

            // let sig = ethers.utils.splitSignature(data.signedMessage);
            // let messageDigest = keccak256("\x19Ethereum Signed Message:\n32", code);
            // const msgHex = ethUtil.bufferToHex(Buffer.from(messageDigest));
            // const msgBuffer = ethUtil.toBuffer(msgHex);
            // const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
            // pub = ethUtil.ecrecover(msgHash, sig.v, sig.r, sig.s);
            // addrBuf = ethUtil.pubToAddress(pub);
            // addr = ethUtil.bufferToHex(addrBuf);
            // console.log(add)
        });
    });
});

async function getTokenId(tx) {
    const _tx = tx instanceof Promise ? await tx : tx;
    const _receipt = await _tx.wait();
    const _interface = new ethers.utils.Interface([
        'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
    ]);
    const _data = _receipt.logs[8].data;
    const _topics = _receipt.logs[8].topics;
    const _event = _interface.decodeEventLog('Transfer', _data, _topics);
    return _event.tokenId;
}