import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import cookie from "js-cookie";
import styles from "./Header.module.css";
import Image from "next/image";
import logo from "../../assets/Stack-Overflow.png";
import Button from "../Button/Button";

import { useRouter } from "next/router";
import UserLoggedIcon from "../UserLoggedIcon/UserLoggedIcon";
import HomeButton from "../HomeButton/HomeButton";

const Header = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			const headers = {
				authorization: cookie.get("jwt_token"),
			};
			try {
				const response = await axios.get(`${process.env.SERVER_URL}/user`, {
					headers,
				});
				setUserData(response.data.name);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		if (isLoggedIn) {
			fetchData();
		}
	}, [isLoggedIn]);

	useEffect(() => {
		const savedCookie = cookie.get("jwt_token");
		setIsLoggedIn(!!savedCookie);
	}, [isLoggedIn]);

	const onLogOut = () => {
		cookie.remove("jwt_token");
		setIsLoggedIn(false);
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
						<li className={styles.homeButtonWrapper}>
							<HomeButton />
						</li>
						<li className={styles.navItem}>
							{isLoggedIn ? (
								<>
									<UserLoggedIcon userData={userData[0] as string} />
									<Button
										className={styles.logOutButton}
										onClick={onLogOut}
										text="Log out"
									/>
								</>
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
