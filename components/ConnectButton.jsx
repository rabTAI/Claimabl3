import { useState } from "react"
import { Web3Button } from "@web3modal/react";

export default function ConnectButton() {


    return (
        <>
            <div
                className="fixed bottom-8"
            >
                <Web3Button />
            </div>

        </>
    )
}