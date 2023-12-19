import React from "react";
import { useEffect } from "react";
import styles from "./Question.module.css";
import { useRouter } from "next/router";
import NameAndDate from "../NameAndDate/NameAndDate";

type QuestionType = {
	answers: Array<any> | null;
	id: string;
	question_text: string;
	date: string;
	user_id: string;
	user: string;
};

type QuestionComponentType = {
	question: QuestionType;
};

const Question: React.FC<QuestionComponentType> = ({ question }) => {
	const router = useRouter();
	return (
		<div className={styles.wrapper}>
			<div className={styles.topWrapper}>
				<div className={styles.answerCountWrapper}>
					{`${question.answers?.length} answers` || `0 answers`}
				</div>
				<h3
					onClick={() => {
						router.push(`/question/${question.id}`);
					}}
					className={styles.questionText}
				>
					{question.question_text}
				</h3>
			</div>
			<NameAndDate text="asked: " question={question} />
		</div>
	);
};

export default Question;
