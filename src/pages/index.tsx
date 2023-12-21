import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Questions from "@/components/Questions/Questions";

export default function Home() {
	const [questions, setQuestions] = useState<Array<any> | null>(null);
	useEffect(() => {
		const getQuestions = async () => {
			try {
				const response = await axios.get(`${process.env.SERVER_URL}/questions`);

				setQuestions(response.data);
			} catch (error) {
				console.error("Error fetching questions:", error);
			}
		};

		getQuestions();
	}, []);
	return (
		<PageTemplate>
			<Head>
				<title>Stackoverflow Home Page</title>
			</Head>
			<Questions questions={questions} />
		</PageTemplate>
	);
}
