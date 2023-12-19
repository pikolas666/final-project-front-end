import React, { useEffect, useState } from "react";
import styles from "./Answer.module.css";
import NameAndDate from "../NameAndDate/NameAndDate";
import DeleteAnswerButton from "../DeleteAnswerButton/DeleteAnswerButton";
import DeleteAnswerModal from "../DeleteAnswerModal/DeleteAnswerModal";

type AnswerType = {
	answer_text: string;
	date: string;
	id: string;
	gained_likes_number: number;
	question_id: string;
	user_id: string;
	user: string;
};

type AnswerComponentType = {
	answer: AnswerType;

	deleteAnswer: (id: string) => void;
	setIsShowAnswerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Answer: React.FC<AnswerComponentType> = ({
	answer,

	deleteAnswer,
}) => {
	const [isShowAnswerModal, setIsShowAnswerModal] = useState(false);
	return (
		<div className={styles.wrapper}>
			{isShowAnswerModal && (
				<DeleteAnswerModal
					setIsShowAnswerModal={setIsShowAnswerModal}
					deleteAction={() => {
						deleteAnswer(answer.id);
					}}
				/>
			)}
			<div className={styles.answerTopWrapper}>
				<div className={styles.likesWrapper}>
					{answer.gained_likes_number} likes
				</div>
				<div className={styles.answerText}>{answer.answer_text}</div>
			</div>
			<div className={styles.bottomWrapper}>
				<NameAndDate text="answered: " answer={answer} />
			</div>
			<DeleteAnswerButton
				text="Delete answer"
				setIsShowModal={setIsShowAnswerModal}
			/>
		</div>
	);
};

export default Answer;
