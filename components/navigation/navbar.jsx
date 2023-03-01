import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../../styles/Navbar.module.css";
export default function Navbar() {
	return (
		<nav className={styles.navbar}>

			<h1>Claimabl3</h1>

			<ConnectButton></ConnectButton>
		</nav>
	);
}
