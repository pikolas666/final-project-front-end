import React from "react";
import styles from "./NameAndDate.module.css";

type QuestionType = {
	answers: Array<any> | null;
	id: string;
	question_text: string;
	date: string;
	user_id: string;
	user: string;
};

type AnswerType = {
	answer_text: string;
	date: string;
	id: string;
	gained_likes_number: number;
	question_id: string;
	user_id: string;
	user: string;
};

type NameAndDateComponentType = {
	question?: QuestionType;
	answer?: AnswerType;
	text: string;
};

const NameAndDate: React.FC<NameAndDateComponentType> = ({
	question,
	text,
	answer,
}) => {
	return (
		<div className={styles.bottomWrapper}>
			{question && (
				<>
					<div className={styles.user}>{question.user}</div>
					<p className={styles.date}>{`${text} ${question.date}`}</p>
				</>
			)}
			{answer && (
				<>
					<div className={styles.user}>{answer.user}</div>
					<p className={styles.date}>{`${text} ${answer.date}`}</p>
				</>
			)}
		</div>
	);
};

export default NameAndDate;
