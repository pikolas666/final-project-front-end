import React, { useState, useEffect } from "react";
import axios from "axios";
import cookie from "js-cookie";
import styles from "./Answer.module.css";
import NameAndDate from "../NameAndDate/NameAndDate";
import DeleteButton from "../DeleteButton/DeleteButton";
import DeleteModal from "../DeleteModal/DeleteModal";

type AnswerType = {
	answer_text: string;
	date: string;
	id: string;
	upvotes: string[];
	downvotes: string[];
	question_id: string;
	user_id: string;
	user: string;
};

type AnswerComponentType = {
	answer: AnswerType;
	deleteAnswer: (id: string) => void;
};

const Answer: React.FC<AnswerComponentType> = ({ answer, deleteAnswer }) => {
	const [isShowModal, setIsShowModal] = useState(false);
	const [totalLikes, setTotalLikes] = useState(
		answer.upvotes.length - answer.downvotes.length
	);

	useEffect(() => {
		setTotalLikes(answer.upvotes.length - answer.downvotes.length);
	}, [answer]);

	const hasUpvoted = () => {
		const userId = cookie.get("user_id");
		return answer.upvotes.includes(userId as string);
	};

	const hasDownvoted = () => {
		const userId = cookie.get("user_id");
		return answer.downvotes.includes(userId as string);
	};

	const handleUpvote = async () => {
		const headers = {
			authorization: cookie.get("jwt_token"),
		};

		if (!hasUpvoted()) {
			try {
				await axios.post(
					`${process.env.SERVER_URL}/answer/${answer.id}/upvote`,
					{},
					{ headers }
				);

				setTotalLikes((previous) => previous + 1);

				const userId = cookie.get("user_id");
				answer.upvotes.push(userId as string);

				// If user has previously downvoted, remove the downvote
				if (hasDownvoted()) {
					setTotalLikes((previous) => previous - 1);
					answer.downvotes = answer.downvotes.filter((id) => id !== userId);
				}
			} catch (error) {
				console.error("Error upvoting answer:", error);
			}
		} else {
			console.log("User has already upvoted for this answer.");
		}
	};

	const handleDownvote = async () => {
		const headers = {
			authorization: cookie.get("jwt_token"),
		};

		if (!hasDownvoted()) {
			try {
				await axios.post(
					`${process.env.SERVER_URL}/answer/${answer.id}/downvote`,
					{},
					{ headers }
				);

				setTotalLikes((previous) => previous - 1); // Decrement totalLikes for downvote

				const userId = cookie.get("user_id");
				answer.downvotes.push(userId as string);

				// If user has previously upvoted, remove the upvote
				if (hasUpvoted()) {
					setTotalLikes((previous) => previous - 1);
					answer.upvotes = answer.upvotes.filter((id) => id !== userId);
				}
			} catch (error) {
				console.error("Error downvoting answer:", error);
			}
		} else {
			console.log("User has already downvoted for this answer.");
		}
	};

	return (
		<div className={styles.wrapper}>
			{isShowModal && (
				<DeleteModal
					setIsShowModal={setIsShowModal}
					deleteAction={() => {
						deleteAnswer(answer.id);
					}}
				/>
			)}
			<div className={styles.answerTopWrapper}>
				<div className={styles.likesWrapper}>
					<div className={styles.svgWrapper} onClick={handleUpvote}>
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<title>chevron-up-circle</title>
							<desc>Created with Sketch Beta.</desc>
							<defs></defs>
							<g
								id="Page-1"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
							>
								<g
									id="Icon-Set"
									transform="translate(-152.000000, -1087.000000)"
									fill="#4d4f4d"
								>
									<path
										d="M168,1117 C160.268,1117 154,1110.73 154,1103 C154,1095.27 160.268,1089 168,1089 C175.732,1089 182,1095.27 182,1103 C182,1110.73 175.732,1117 168,1117 L168,1117 Z M168,1087 C159.164,1087 152,1094.16 152,1103 C152,1111.84 159.164,1119 168,1119 C176.836,1119 184,1111.84 184,1103 C184,1094.16 176.836,1087 168,1087 L168,1087 Z M168.879,1098.46 C168.639,1098.22 168.311,1098.15 168,1098.21 C167.689,1098.15 167.361,1098.22 167.121,1098.46 L159.464,1106.12 C159.074,1106.51 159.074,1107.15 159.464,1107.54 C159.855,1107.93 160.488,1107.93 160.879,1107.54 L168,1100.41 L175.121,1107.54 C175.512,1107.93 176.145,1107.93 176.536,1107.54 C176.926,1107.15 176.926,1106.51 176.536,1106.12 L168.879,1098.46 L168.879,1098.46 Z"
										id="chevron-up-circle"
									></path>
								</g>
							</g>
						</svg>
					</div>

					{totalLikes}

					<div className={styles.svgWrapper} onClick={handleDownvote}>
						<svg
							width="800px"
							height="800px"
							viewBox="0 0 32 32"
							version="1.1"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<title>chevron-down-circle</title>
							<desc>Created with Sketch Beta.</desc>
							<defs></defs>
							<g
								id="Page-1"
								stroke="none"
								strokeWidth="1"
								fill="none"
								fillRule="evenodd"
							>
								<g
									id="Icon-Set"
									transform="translate(-204.000000, -1087.000000)"
									fill="#4d4f4d"
								>
									<path
										d="M227.121,1098.46 L220,1105.59 L212.879,1098.46 C212.488,1098.07 211.855,1098.07 211.464,1098.46 C211.074,1098.86 211.074,1099.49 211.464,1099.88 L219.122,1107.54 C219.361,1107.78 219.689,1107.85 220,1107.79 C220.311,1107.85 220.639,1107.78 220.879,1107.54 L228.536,1099.88 C228.926,1099.49 228.926,1098.86 228.536,1098.46 C228.145,1098.07 227.512,1098.07 227.121,1098.46 L227.121,1098.46 Z M220,1117 C212.268,1117 206,1110.73 206,1103 C206,1095.27 212.268,1089 220,1089 C227.732,1089 234,1095.27 234,1103 C234,1110.73 227.732,1117 220,1117 L220,1117 Z M220,1087 C211.164,1087 204,1094.16 204,1103 C204,1111.84 211.164,1119 220,1119 C228.837,1119 236,1111.84 236,1103 C236,1094.16 228.837,1087 220,1087 L220,1087 Z"
										id="chevron-down-circle"
									></path>
								</g>
							</g>
						</svg>
					</div>
				</div>
				<div className={styles.answerText}>{answer.answer_text}</div>
			</div>
			<div className={styles.bottomWrapper}>
				<NameAndDate text="answered: " answer={answer} />
			</div>
			<DeleteButton
				className={styles.deleteAnswerButton}
				text="Delete answer"
				setIsShowModal={setIsShowModal}
			/>
		</div>
	);
};

export default Answer;
