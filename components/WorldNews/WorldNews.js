import styles from "./WorldNews.module.scss";
import useTranslation from "next-translate/useTranslation";
import { useState, useEffect } from "react";
import Button from "components/Button/Button";
import Article from "components/Article/Article";

import moment from "moment";
import { useRouter } from "next/router";

const WorldNews = ({ perPage = 5, display = 5 }) => {
	const { locale } = useRouter();
	const [data, setData] = useState();
	const [showing, setShowing] = useState(display);
	const { t } = useTranslation();

	useEffect(() => {
		fetch(`/api/rss?locale=${locale}`)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
			});
	}, [locale]);

	const loadMore = () => {
		setShowing(showing + perPage);
	};

	const posts = data || new Array(display).fill({});

	return (
		<section className={`container ${styles.section}`}>
			<div className={`loop loop--sm ${styles.articles}`}>
				{posts &&
					posts
						.sort((a, b) => (a.date > b.date ? -1 : 1))
						.slice(0, Math.min(showing, posts.length))
						.map((post, index) => (
							<Article
								key={`post-${index}`}
								title={post.title}
								size={index === 0 ? 2 : 1}
								lead={`${t("common:from")} ${post.source}`}
								href={post.link}
								target="_blank"
								// thumbnail={post.thumbnail}
								source={moment(post.date).format("lll")}
							/>
						))}
			</div>
			{posts.length > showing && (
				<div className={styles.loadMore}>
					<Button type="secondary" onClick={loadMore}>
						{t("common:loadMore")}
					</Button>
				</div>
			)}
		</section>
	);
};

export default WorldNews;
