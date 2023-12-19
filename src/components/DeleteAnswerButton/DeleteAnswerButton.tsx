import React from "react";
import styles from "./DeleteAnswerButton.module.css";

type DeleteAnswerButtonType = {
	text: string;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAnswerButton: React.FC<DeleteAnswerButtonType> = ({
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

export default DeleteAnswerButton;
