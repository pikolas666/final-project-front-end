import React from "react";
import { Helmet } from "react-helmet";

type HeadType = {
	title: String;
};

const Head: React.FC<HeadType> = ({ title }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content="Code Academy Final Project" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Helmet>
	);
};

export default Head;
