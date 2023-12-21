import React, { useEffect, useState } from "react";
import Question from "../Question/Question";
import styles from "./Questions.module.css";
import Button from "../Button/Button";
import router from "next/router";
import Spinner from "../Spinner/Spinner";

type QuestionsType = {
	questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
	const [questionsToShow, setQuestionsToShow] = useState<Array<any>>([]);
	const answered = questions
		?.filter((question) => question.answers.length > 0)
		.sort((a, b) => b.answers.length - a.answers.length);

	const unanswered = questions
		?.filter((question) => question.answers.length === 0)
		.sort((a, b) => b.date - a.date);

	const [isLoading, setIsLoading] = useState(false);

	const [activeFilter, setActiveFilter] = useState("all");

	const handleClick = (filterType: string) => {
		switch (filterType) {
			case "answered":
				setQuestionsToShow(answered || []);
				break;
			case "all":
				setQuestionsToShow(questions || []);
				break;
			case "unanswered":
				setQuestionsToShow(unanswered || []);
				break;
			default:
				break;
		}

		setActiveFilter(filterType);
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);

			try {
				await new Promise((resolve) => setTimeout(resolve, 1000));

				setQuestionsToShow(questions || []);
			} catch (error) {
				console.error("Error fetching questions:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, [questions]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.menuWrapper}>
				<div className={styles.topWrapper}>
					<h2>All Questions</h2>
					<Button
						className={styles.signUpButton}
						onClick={() => {
							router.push("/askQuestion");
						}}
						text="Ask Question"
					/>
				</div>
				<div className={styles.bottomWrapper}>
					<div className={styles.questionsCount}>
						{questionsToShow
							? `${questionsToShow.length} questions in total`
							: "0 questions in total"}
					</div>
					<div className={styles.filterWrapper}>
						<button
							className={`${styles.filterButton} ${styles.filterButtonLeft} ${
								activeFilter === "answered" ? styles.filterButtonclicked : ""
							}`}
							onClick={() => handleClick("answered")}
						>
							answered
						</button>
						<button
							className={`${styles.filterButton} ${
								activeFilter === "all" ? styles.filterButtonclicked : ""
							}`}
							onClick={() => handleClick("all")}
						>
							all
						</button>
						<button
							className={`${styles.filterButton} ${styles.filterButtonRight} ${
								activeFilter === "unanswered" ? styles.filterButtonclicked : ""
							}`}
							onClick={() => handleClick("unanswered")}
						>
							unanswered
						</button>
					</div>
				</div>
			</div>
			{isLoading ? (
				<Spinner />
			) : (
				<>
					{questionsToShow && questionsToShow.length > 0 ? (
						questionsToShow.map((question) => (
							<Question key={question._id} question={question} />
						))
					) : (
						<p>No questions to display.</p>
					)}
				</>
			)}
		</div>
	);
};

export default Questions;
