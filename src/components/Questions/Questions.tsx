import React from "react";
import { useEffect, useState } from "react";
import Question from "../Question/Question";
import styles from "./Questions.module.css";
import Button from "../Button/Button";
import router from "next/router";

type QuestionsType = {
	questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
	const [questionsToShow, setQuestionsToShow] = useState(questions);
	const answered = questions
		?.filter((question) => question.answers.length > 0)
		.sort((a, b) => a.answers.length - b.answers.length);
	const unanswered = questions
		?.filter((question) => question.answers.length === 0)
		.sort((a, b) => a.date - b.date);
	return (
		<div className={styles.wrapper}>
			<div className={styles.menuWrapper}>
				<div className={styles.topWrapper}>
					<h2>All Questions</h2>
					<Button
						className={styles.signUpButton}
						onClick={() => {
							router.push("/question");
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
							className={`${styles.filterButton} ${styles.filterButtonLeft}`}
							onClick={() => {
								setQuestionsToShow(answered || null);
							}}
						>
							answered
						</button>
						<button
							className={styles.filterButton}
							onClick={() => {
								setQuestionsToShow(questions || null);
							}}
						>
							all
						</button>
						<button
							className={`${styles.filterButton} ${styles.filterButtonRight}`}
							onClick={() => {
								setQuestionsToShow(unanswered || null);
							}}
						>
							unanswered
						</button>
					</div>
				</div>
			</div>
			{questionsToShow &&
				questionsToShow.map((question) => (
					<Question key={question._id} question={question} />
				))}
		</div>
	);
};

export default Questions;
