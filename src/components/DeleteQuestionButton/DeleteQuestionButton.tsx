import React from "react";
import styles from "./DeleteQuestionButton.module.css";

type DeleteQuestionButtonType = {
	text: string;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteQuestionButton: React.FC<DeleteQuestionButtonType> = ({
	text,
	setIsShowModal,
}) => {
	return (
		<button
			className={styles.deleteButton}
			onClick={() => {
				setIsShowModal(true);
			}}
		>
			{text}
		</button>
	);
};

export default DeleteQuestionButton;
