import React from "react";
import styles from "./DeleteModal.module.css";

type DeleteModalType = {
	deleteAction: () => void;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: React.FC<DeleteModalType> = ({
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
			<h2>Are you sure you want to delete?</h2>
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

export default DeleteModal;
