import React from "react";
import styles from "./ErrorMessage.module.css";

type ErrorMessageType = {
	messageText: string;
	setShowMessage: () => void;
};

const ErrorMessage: React.FC<ErrorMessageType> = ({
	messageText,
	setShowMessage,
}) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.message}>{messageText}</div>
			<button className={styles.closeButton} onClick={() => setShowMessage()}>
				x
			</button>
		</div>
	);
};

export default ErrorMessage;
