import { useEffect, useState } from "react";
import Link from "next/link";
import cookie from "js-cookie";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/Stack-Overflow.png";
import Button from "../Button/Button";

import { useRouter } from "next/router";

const Header = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const savedCookie = cookie.get("jwt_token");

		if (savedCookie) {
			setIsLoggedIn(true);
		}
	}, []);
	const onLogOut = () => {
		cookie.remove("jwt_token");
		router.push("/");
	};
	return (
		<header className={styles.header}>
			<div className={styles.wrapper}>
				<Link href="/" className={styles.logo}>
					<Image src={logo} alt="logo" width="150" priority={true} />
				</Link>
				<nav className={styles.nav}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							{isLoggedIn ? (
								<Button
									className={styles.logOutButton}
									onClick={onLogOut}
									text="Log out"
								/>
							) : (
								<div className={styles.buttonWrapper}>
									<Button
										className={styles.loginButton}
										text="Log in"
										onClick={() => {
											router.push("/login");
										}}
									/>
									<Button
										className={styles.signUpButton}
										text="Sign up"
										onClick={() => {
											router.push("/register");
										}}
									/>
								</div>
							)}
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
