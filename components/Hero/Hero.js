import styles from "./Hero.module.scss";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import { RichText } from "prismic-reactjs";

const Hero = ({ heading, about, cta }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		<section className={`grid grid--full ${styles.section}`}>
			<div
				className={`${styles.canvas} ${isLoaded ? styles.loaded : ""}`}
			></div>
			<h1 className={`h-1 ${styles.heading}`}>{RichText.asText(heading)}</h1>
			<div className={`body body--sans ${styles.box}`}>
				<RichText render={about} />
				<Button href="/company" type="arrow">
					{cta}
				</Button>
			</div>
		</section>
	);
};

export default Hero;
