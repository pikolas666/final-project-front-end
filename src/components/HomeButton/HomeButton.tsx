import React from "react";
import styles from "./HomeButton.module.css";
import router from "next/router";

const HomeButton = () => {
	return (
		<div
			className={styles.wrapper}
			onClick={() => {
				router.push("/");
			}}
		>
			<svg
				fill="#403e3e"
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				width="800px"
				height="800px"
				viewBox="0 0 547.596 547.596"
				xmlSpace="preserve"
			>
				<g>
					<path
						d="M540.76,254.788L294.506,38.216c-11.475-10.098-30.064-10.098-41.386,0L6.943,254.788
       c-11.475,10.098-8.415,18.284,6.885,18.284h75.964v221.773c0,12.087,9.945,22.108,22.108,22.108h92.947V371.067
       c0-12.087,9.945-22.108,22.109-22.108h93.865c12.239,0,22.108,9.792,22.108,22.108v145.886h92.947
       c12.24,0,22.108-9.945,22.108-22.108v-221.85h75.965C549.021,272.995,552.081,264.886,540.76,254.788z"
					/>
				</g>
			</svg>
		</div>
	);
};

export default HomeButton;
