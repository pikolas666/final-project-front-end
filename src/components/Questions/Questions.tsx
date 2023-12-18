import React from "react";
import Question from "../Question/Question";
import styles from "./Questions.module.css";
import Button from "../Button/Button";
import router from "next/router";

type QuestionsType = {
	questions: Array<any> | null;
};

const Questions: React.FC<QuestionsType> = ({ questions }) => {
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
				<div className={styles.buttonWrapper}>
					<div className={styles.questionsCount}>
						{questions
							? `${questions.length} questions in total`
							: "0 questions in total"}
					</div>
				</div>
				{questions &&
					questions.map((question) => (
						<Question key={question._id} question={question} />
					))}
			</div>
		</div>
	);
};

export default Questions;
