import { ethers } from "ethers";
import { ConnectButton, openConnectModal } from '@rainbow-me/rainbowkit';

export default function MintButton({ isThere }) {

    const askContractToMintNft = async () => {



    }
    return (
        <>
            <button
                className={`${isThere ? `cursor-pointer` : `cursor-not-allowed border-gray-400 text-gray-400`} border-2 p-4`}
                onClick={askContractToMintNft}
                disabled={isThere}
            >Claim
            </button>
        </>
    );
}