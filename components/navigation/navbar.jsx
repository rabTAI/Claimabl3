import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
import Image from "next/image";

export default function Navbar({ setScreen }) {

	return (
		<nav className={styles.navbar}>
			<Image
				src={"/logo.png"}
				alt="Logo"
				width={250}
				height={250}
				className="w-1/2 md:w-[300px]"
				onClick={() => setScreen("landing")}
			/>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
