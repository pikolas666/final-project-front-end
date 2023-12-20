import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";

const Register: React.FC = () => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [messageText, setMessageText] = useState("");
	const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
		null
	);

	const router = useRouter();

	const validateInputs = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

		if (!name || !email || !password) {
			setMessageText("Please fill in all fields.");
			return false;
		}

		if (!emailRegex.test(email)) {
			setMessageText("Please enter a valid email address.");
			return false;
		}

		if (!passwordRegex.test(password)) {
			setMessageText(
				"Password must be at least 6 characters long and include at least one letter and one digit."
			);
			return false;
		}

		return true;
	};

	const onRegisterUser = async () => {
		if (!validateInputs()) {
			return;
		}

		try {
			const body = {
				name,
				password,
				email,
			};

			const response = await axios.post(
				`${process.env.SERVER_URL}/users/register`,
				body
			);

			setResponse(response);

			if (response.status === 201) {
				setMessageText("User Registered");
				setTimeout(() => {
					router.push("/");
				}, 2000);
			}
		} catch (err) {
			const axiosError = err as AxiosError;
			setResponse(axiosError.response || null);
			setMessageText(`Error: ${axiosError.message}`);
			console.log(axiosError);
		}
	};

	return (
		<PageTemplate>
			<div className={styles.formWrapper}>
				<h1 className={styles.title}>Register</h1>

				<div className={styles.form}>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="name"
					/>

					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
					/>

					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="email"
					/>

					<Button
						text="Register"
						onClick={onRegisterUser}
						className={styles.registerButton}
					/>
				</div>

				<div
					className={`${styles.message} ${
						response?.status === 201 ? styles.success : styles.error
					}`}
				>
					{messageText}
				</div>
			</div>
		</PageTemplate>
	);
};

export default Register;
