import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import Head from "@/components/Head/Head";
import PageTemplate from "@/components/PageTemplate/PageTemplate";

export default function Home() {
	const [questions, setQuestions] = useState<Array<any> | null>(null);
	const router = useRouter();

	useEffect(() => {
		const getQuestions = async () => {
			try {
				const response = await axios.get(`${process.env.SERVER_URL}/questions`);
				console.log(response);

				setQuestions(response.data.questions);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		getQuestions();
	}, []);
	return (
		<PageTemplate>
			<Head title="Stackoverflow Home Page" />
			<main>{questions}</main>
		</PageTemplate>
	);
}
