import { useState } from "react"

export default function ConnectButton() {
    function ConnectWallet() {
        console.log("connect a wallet")
    }

    return (
        <>
            <p className="mt-4 border border-1 w-[400] p-2 text-center"
                onClick={ConnectWallet}
            >Connect Wallet</p>
        </>
    )
}