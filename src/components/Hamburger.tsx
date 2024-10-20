"use client";
import { useState } from "react";
import styles from "./HamburgerMenu.module.css";
import { Container } from "./Container";
import SignOutButton from "./SignoutButton";

const HamburgerMenu: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleMenu = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<div className={styles.hamburgerContainer}>
			<button
				onClick={toggleMenu}
				className={styles.hamburgerButton}
				style={{ paddingLeft: "16px" }}
			>
				<div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
				<div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
				<div className={`${styles.bar} ${isOpen ? styles.open : ""}`}></div>
			</button>

			<Container>
				<div className='inner'>
					<nav
						className={`${styles.menu} ${isOpen ? styles.open : ""}`}
						style={{ height: "100vh" }}
					>
						<ul>
							<li>
								<a href='/'>TOP</a>
							</li>
							<li>
								<a href='/mypage//'>マイページ</a>
							</li>
							<li>
								<a href='/create/'>アイテムの追加</a>
							</li>
							<li>
								<a href='/user/signIn'>サインイン</a>
							</li>
							<li>
								<a href='/user/signUp'>新規登録</a>
							</li>
							<li style={{ padding: "15px 0", color: "#ff5e2a", fontWeight:"bold" }}>
								<SignOutButton />
							</li>
						</ul>
					</nav>
				</div>
			</Container>
		</div>
	);
};

export default HamburgerMenu;
