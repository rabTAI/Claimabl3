import styles from "../../styles/Navbar.module.css";
import Image from "next/image";
import { Web3Button } from "@web3modal/react";

export default function Navbar({ setScreen }) {

	return (
		<nav className={`${styles.navbar}`}>
			<div
				className="cursor-pointer"
				onClick={() => setScreen("landing")}
			>Home</div>

			<Web3Button
				className="relative right-0"
			></Web3Button>
			
		</nav>
	);
}
