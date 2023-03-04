import { ethers } from "ethers";


export default function MintButton({ isThere }) {

    return (
        <>
            <button
                className={`${isThere ? `cursor-pointer` : `cursor-not-allowed border-gray-400 text-gray-400`} border-2 p-4 mt-2`}
                disabled={!isThere}
            >{isThere ? "Claim" : "Test Your Location to Claim"}
            </button>
        </>
    );
}