import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar({ setScreen }) {


	return (
		<nav className={styles.navbar}>
			<h1
				className="cursor-pointer"
				onClick={() => setScreen("landing")}
			>Claimabl3</h1>
			<ConnectButton></ConnectButton>
		</nav>
	);
}
