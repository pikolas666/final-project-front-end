import { useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";

const Login = () => {
	const router = useRouter();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const onLogin = async () => {
		try {
			const body = {
				email: email,
				password: password,
			};

			const response = await axios.post(
				"http://localhost:3000/users/login",
				body
			);

			if (response.status === 200) {
				cookie.set("jwt_token", response.data.token);
				router.push("/");
			}

			console.log("response", response);
		} catch (err) {
			console.error("Error during login:", err);
		}
	};

	return (
		<PageTemplate>
			<div className={styles.formWrapper}>
				<h1 className={styles.title}>Log in</h1>
				<div className={styles.form}>
					<input
						placeholder="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
					<Button
						className={styles.button}
						onClick={onLogin}
						text="Log in"
					></Button>
				</div>
			</div>
		</PageTemplate>
	);
};

export default Login;
