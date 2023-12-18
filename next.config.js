/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	env: {
		SERVER_URL: "http://127.0.0.1:3000",
	},
};

module.exports = nextConfig;
