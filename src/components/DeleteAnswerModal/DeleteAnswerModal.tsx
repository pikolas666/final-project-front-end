import React from "react";
import styles from "./DeleteAnswerModal.module.css";

type DeleteAnswerModalType = {
	deleteAction: () => void;
	setIsShowAnswerModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAnswerModal: React.FC<DeleteAnswerModalType> = ({
	deleteAction,
	setIsShowAnswerModal,
}) => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.x}
				onClick={() => {
					setIsShowAnswerModal(false);
				}}
			>
				X
			</div>
			<h2>Delete Answer?</h2>
			<button
				className={styles.button}
				onClick={() => {
					deleteAction();
					setIsShowAnswerModal(false);
				}}
			>
				Yes
			</button>
			<button
				className={styles.button}
				onClick={() => {
					setIsShowAnswerModal(false);
				}}
			>
				No
			</button>
		</div>
	);
};

export default DeleteAnswerModal;
