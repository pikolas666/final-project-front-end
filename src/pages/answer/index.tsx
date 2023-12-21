import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Button from "@/components/Button/Button";
import Head from "@/components/Head/Head";

const AnswerQuestion = () => {
	const [answerText, setAnswerText] = useState("");
	const [messageText, setMessageText] = useState<string>("");

	const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
		null
	);
	const [questionId, setQuestionId] = useState("");

	const router = useRouter();

	const headers = cookie.get("jwt_token");

	const checkIfLogged = () => {
		if (!headers) {
			router.push("/login");
		}
	};
	useEffect(() => {
		checkIfLogged();
	}, []);

	useEffect(() => {
		const storedQuestionId = localStorage.getItem("id");

		if (storedQuestionId) {
			setQuestionId(storedQuestionId);
		}
	}, []);

	const onAnswerQuestion = async (id: string) => {
		const headers = {
			authorization: cookie.get("jwt_token"),
		};
		try {
			const body = {
				answer_text: answerText,
			};
			console.log(questionId);

			const response = await axios.post(
				`${process.env.SERVER_URL}/question/${questionId}/answers`,
				body,
				{ headers }
			);
			setResponse(response);

			if (response.status === 201) {
				setMessageText("Answer added");
				setTimeout(() => {
					router.push(`/question/${questionId}`);
				}, 2000);
			}
			console.log("response", response);
		} catch (err) {
			console.error("Error during asking question:", err);
			setMessageText("Error asking question. Please try again.");
		}
	};

	return (
		<PageTemplate>
			<Head title="Answer page" />
			<div className={styles.formWrapper}>
				<h1 className={styles.title}>Add Answer</h1>

				<div className={styles.form}>
					<textarea
						value={answerText}
						onChange={(e) => setAnswerText(e.target.value)}
						placeholder="Answer text"
					/>

					<Button
						text="Answer"
						onClick={() => {
							onAnswerQuestion(questionId);
						}}
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

export default AnswerQuestion;
