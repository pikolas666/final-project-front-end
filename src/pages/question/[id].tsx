import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Head from "@/components/Head/Head";
import styles from "./styles.module.css";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import NameAndDate from "@/components/NameAndDate/NameAndDate";
import Answer from "@/components/Answer/Answer";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

type QuestionType = {
	answers: Array<any> | null;
	id: string;
	question_text: string;
	date: string;
	user_id: string;
	user: string;
};

const Question = () => {
	const [question, setQuestion] = useState<QuestionType | null>(null);
	const [answers, setAnswers] = useState<Array<any> | null>(null);
	const [isShowModal, setIsShowModal] = useState(false);
	const [messageText, setMessage] = useState("");
	const [showMessage, setShowMessage] = useState(false);
	const [sortedAnswers, setSortedAnswers] = useState<Array<any> | null>(null);

	const router = useRouter();
	const questionId = router.query.id;

	const sortAnswers = () => {
		const sortedAnswers = answers
			? answers
					.slice()
					.sort(
						(a, b) =>
							b.upvotes.length -
							b.downvotes.length -
							(a.upvotes.length - a.downvotes.length)
					)
			: [];
		setSortedAnswers(sortedAnswers);
	};

	const fetchQuestion = async (id: string) => {
		try {
			const response = await axios.get(
				`${process.env.SERVER_URL}/question/${id}`
			);
			setQuestion(response.data.question);
		} catch (error) {
			console.error("Error fetching question:", error);
		}
	};

	const fetchAnswer = async (id: string) => {
		try {
			const response = await axios.get(
				`${process.env.SERVER_URL}/question/${id}/answers`
			);
			setAnswers(response.data.answers);
		} catch (error) {
			console.error("Error fetching answers:", error);
		}
	};

	const deleteQuestion = async (id: string) => {
		const jwtToken = cookie.get("jwt_token");

		if (!jwtToken) {
			setMessage("You must be logged in to delete a question.");
			setShowMessage(true);
			return;
		}

		const headers = {
			authorization: jwtToken,
		};

		try {
			await axios.delete(`${process.env.SERVER_URL}/question/${id}`, {
				headers,
			});
			router.push("/");
		} catch (error) {
			console.error("Error deleting question:", error);
			setMessage("Error deleting question:");
			setShowMessage(true);

			if (axios.isAxiosError(error)) {
				console.error("Response status:", error.response?.status);
			}
		}
	};

	const deleteAnswer = async (id: string) => {
		const jwtToken = cookie.get("jwt_token");

		if (!jwtToken) {
			setMessage("You must be logged in to delete an answer.");
			setShowMessage(true);
			return;
		}

		const headers = {
			Authorization: jwtToken,
		};

		try {
			await axios.delete(`${process.env.SERVER_URL}/answer/${id}`, { headers });
			router.query.id && fetchAnswer(router.query.id as string);
		} catch (error) {
			console.error("Error deleting answer:", error);
			setMessage("Error deleting answer:");
			setShowMessage(true);

			if (axios.isAxiosError(error)) {
				console.error("Response status:", error.response?.status);
			}
		}
	};

	useEffect(() => {
		router.query.id && fetchQuestion(router.query.id as string);
	}, [router.query.id]);

	useEffect(() => {
		router.query.id && fetchAnswer(router.query.id as string);
	}, [router.query.id]);

	useEffect(() => {
		sortAnswers();
	}, [answers]);

	return (
		<PageTemplate>
			<Head title="Question Page" />
			<div className={styles.wrapper}>
				{showMessage && (
					<ErrorMessage
						setShowMessage={() => {
							setShowMessage(false);
						}}
						messageText={messageText}
					/>
				)}
				{isShowModal && (
					<DeleteModal
						setIsShowModal={setIsShowModal}
						deleteAction={() => {
							deleteQuestion(question!.id);
						}}
					/>
				)}

				{question && (
					<>
						<div className={styles.questionTopWrapper}>
							<h3 className={styles.title}>{question.question_text}</h3>
						</div>
						<div className={styles.questionBottomwrapper}>
							<NameAndDate text="asked: " question={question} />
						</div>
					</>
				)}
				<DeleteButton
					className=""
					text="Delete question"
					setIsShowModal={setIsShowModal}
				/>
				<button
					className={styles.answerButton}
					onClick={() => {
						localStorage.setItem("id", questionId as string);
						router.push(`/answer`);
					}}
				>
					{" "}
					Answer
				</button>
				<h4>Answers:</h4>

				{sortedAnswers && sortedAnswers.length > 0 ? (
					sortedAnswers.map((answer) => (
						<Answer
							key={answer._id}
							answer={answer}
							deleteAnswer={() => deleteAnswer(answer._id)}
						/>
					))
				) : (
					<p>No answers to display.</p>
				)}
			</div>
		</PageTemplate>
	);
};

export default Question;
