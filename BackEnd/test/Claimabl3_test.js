const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getOpcodeLength } = require("hardhat/internal/hardhat-network/stack-traces/opcodes");

describe("Claimabl3.sol", () => {
    let contractFactory;
    let contract;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let highLvlGems;

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

    // let totalMint = 10;
    // describe("Mint", () => {
    //     console.log(">>>>>>>>>>>>> Minting >>>>>>>>>>>>>>>>")
    //     it(`should mint ${totalMint} NFTs`, async () => {
    //         // this.timeout(0);
    //         for (i = 1; i <= totalMint; i++) {
    //             await new Promise(resolve => setTimeout(resolve, 100));
    //             await contract.mint();
    //         }
    //         const totalSupply = await contract.activeSupply();
    //         expect(totalSupply).to.equal(totalMint);

    //     });
    // describe("information", () => {
    //     it("should display information", async () => {
    //         let highestGemLevel = await contract.highestGemLevel();
    //         console.log("Highest Gem Level ", parseInt(highestGemLevel._hex));
    //         highLvlGems = parseInt(await contract.getTotalHighLevelGems());
    //         console.log("Total high Gems ", highLvlGems);

    //         // highLvlGems = parseInt(await contract.getTotalHighLevelGems());
    //         for (let i = 0; i < highLvlGems; i++) {
    //             let heightGem = await contract.highestLevelGems(i);
    //             console.log("Highest Level Gems ", parseInt(heightGem._hex));
    //             oneHighLvlGem = heightGem;
    //         }

    //         let gamePot = await contract.gamePot();
    //         console.log("Gem Pot ", parseInt(gamePot._hex) / 10 ** 18);

    //         // let collectedFee = await contract.collectedFee();
    //         // console.log("Fee Pot ", parseInt(collectedFee._hex) / 10 ** 18);
    //         console.log("Last draw ", await contract.lastDraw());
    //         console.log(">>> Time to pick a winner >>>");
    //         // console.log("This is the Gem that send to pick winner ", oneHighLvlGem);
    //         try {
    //             await contract.pickWinner(oneHighLvlGem);
    //         } catch (error) {
    //             console.log("not ready yet");
    //         }
    //         await new Promise(resolve => setTimeout(resolve, 3000));
    //         let winner = await contract.pickWinner(oneHighLvlGem);
    //         let findWinner = await checkWinner(winner);
    //         console.log(findWinner);
    //         let lastWinner = await contract.lastWinner();
    //         let lWinner = parseInt(lastWinner._hex);
    //         console.log("Winner ", lWinner);
    //         let gemStatus = await contract.gemStatus(lWinner);
    //         console.log("Token Info of a winner");
    //         console.log("level ", parseInt(gemStatus.level._hex));
    //         console.log("balance ", parseInt(gemStatus.balance._hex));

    //         // console.log("Winners's info")
    //         // let uri = await contract.tokenURI(lWinner);
    //         // console.log(uri);

    //         // gamePot = await contract.gamePot();
    //         // console.log("Gem Pot ", parseInt(gamePot._hex) / 10 ** 18);
    //         let collectedFee = await contract.collectedFee();
    //         console.log("Fee Pot ", parseInt(collectedFee._hex) / 10 ** 18);


    //         console.log("****** Withdraw Gem Fee ***** ");
    //         await contract.withdrawCollectedFee();
    //         gamePot = await contract.gamePot();
    //         console.log("Gem Pot ", parseInt(gamePot._hex) / 10 ** 18);

    //         console.log("*********** Withdraw users' balance *************");
    //         console.log("User MM address Before withdraw ", await owner.getAddress());
    //         console.log("User MM balance Before withdraw ", await owner.getBalance());
    //         console.log("Owner of ", await contract.ownerOf(lWinner));
    //         gemStatus = await contract.gemStatus(lWinner);

    //         await contract.withdrawBalance(lWinner);
    //         console.log("*********** After Withdraw User Balance ***********");
    //         console.log("Owner of ", await contract.ownerOf(lWinner))
    //         console.log("Token Info lWinner: ", await contract.gemStatus(lWinner))
    //         console.log("User MM balance After withdraw ", await owner.getBalance());
    //         console.log("Token Info of a winner");
    //         console.log("level ", parseInt(gemStatus.level._hex));
    //         console.log("balance ", parseInt(gemStatus.balance._hex));

    //         console.log("Highest Level ", await contract.highestGemLevel())
    //     });
    // });
    // });
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