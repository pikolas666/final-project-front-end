import React from "react";
import styles from "./Button.module.css";

type ButtonType = {
	text: string;
	className: string;
	onClick: () => void | null | Promise<void>;
};

const Button: React.FC<ButtonType> = ({ text, className, onClick }) => {
	return (
		<div className={`${styles.button} ${className}`} onClick={onClick}>
			{text}{" "}
		</div>
	);
};

export default Button;
