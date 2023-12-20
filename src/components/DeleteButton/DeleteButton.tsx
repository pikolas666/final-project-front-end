import React from "react";
import styles from "./DeleteButton.module.css";

type DeleteButtonType = {
	text: string;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	className: string;
};

const DeleteButton: React.FC<DeleteButtonType> = ({
	text,
	setIsShowModal,
	className,
}) => {
	return (
		<button
			className={`${styles.deleteButton} ${className}`}
			onClick={() => {
				setIsShowModal(true);
			}}
		>
			{text}
		</button>
	);
};

export default DeleteButton;
