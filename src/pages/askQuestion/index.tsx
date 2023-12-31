import { useState, useEffect } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import Head from "next/head";

const AskQuestion = () => {
	const router = useRouter();

	const [question_text, setQuestion_text] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	const headers = cookie.get("jwt_token");

	const checkIfLogged = () => {
		if (!headers) {
			router.push("/login");
		}
	};
	useEffect(() => {
		checkIfLogged();
	}, []);

	const onAskQuestion = async () => {
		const headers = {
			authorization: cookie.get("jwt_token"),
		};
		try {
			const body = {
				question_text: question_text,
			};

			const response = await axios.post(
				`${process.env.SERVER_URL}/question`,
				body,
				{ headers }
			);

			if (response.status === 401) {
				setMessage("Please log in to ask questions.");
				router.push("/login");
			} else if (response.status === 200) {
				setMessage("Question submitted successfully!");
				router.push("/");
			} else {
				setMessage(`Unexpected response status: ${response.status}`);
			}

			console.log("response", response);
		} catch (err) {
			console.error("Error during asking question:", err);
			setMessage("Error asking question. Please try again.");
		}
	};

	return (
		<PageTemplate>
			<Head>
				<title>Ask Question Page</title>
			</Head>
			<div className={styles.formWrapper}>
				<h1 className={styles.title}>Ask Question</h1>

				<div className={styles.form}>
					<textarea
						placeholder="question text"
						value={question_text}
						onChange={(e) => setQuestion_text(e.target.value)}
					/>

					<Button
						text="Ask question"
						className={styles.AskButton}
						onClick={onAskQuestion}
					/>
					<div className={styles.message}>{message}</div>
				</div>
			</div>
		</PageTemplate>
	);
};

export default AskQuestion;
