import React from "react";
import styles from "./DeleteQuestionModal.module.css";
import { useRouter } from "next/router";

type DeleteQuestionModalType = {
	deleteAction: () => void;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteQuestionModal: React.FC<DeleteQuestionModalType> = ({
	deleteAction,
	setIsShowModal,
}) => {
	return (
		<div className={styles.wrapper}>
			<div
				className={styles.x}
				onClick={() => {
					setIsShowModal(false);
				}}
			>
				X
			</div>
			<h2>Delete Question?</h2>
			<button
				className={styles.button}
				onClick={() => {
					deleteAction();
					setIsShowModal(false);
				}}
			>
				Yes
			</button>
			<button
				className={styles.button}
				onClick={() => {
					setIsShowModal(false);
				}}
			>
				No
			</button>
		</div>
	);
};

export default DeleteQuestionModal;
