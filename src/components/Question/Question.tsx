import React from "react";
import { useEffect } from "react";

import styles from "./Question.module.css";
import Link from "next/link";
import Button from "../Button/Button";

type QuestionType = {
	answers: Array<any> | null;
	id: string;
	question_text: string;
	date: string;
	user_id: number;
};

type QuestionComponentType = {
	question: QuestionType;
};

const Question: React.FC<QuestionComponentType> = ({ question }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.topWrapper}>
				<div className={styles.asnwerCount}>
					{`${question.answers?.length} answers` || `0 answers`}
				</div>
				<h3>{question.question_text}</h3>
			</div>
		</div>
	);
};

export default Question;
