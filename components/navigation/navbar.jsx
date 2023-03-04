import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Image from "next/image";

export default function Navbar({ setScreen }) {

	return (
		<nav className={styles.navbar}>
			<div
				className="cursor-pointer"
				onClick={() => setScreen("landing")}
			>Home</div>
			<ConnectButton
				className="relative right-0"
			></ConnectButton>
		</nav>
	);
}
