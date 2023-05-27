import { getAllArticles, getArticlesByCategory } from '@/libs/service';
import { duplicateRemoveArray } from '@/util/tool';
import React from 'react';

function Index({ posts }: any) {
	return (
		<div>

		</div>
	);
}

export default Index;

export async function getStaticProps({ params }: any) {
	try {
		const articles = await getArticlesByCategory(params.category);

		articles
			.map((article: any) => article.data)
			.sort(
				(
					a: { data: { publishedAt: number } },
					b: { data: { publishedAt: number } }
				) => {
					if (a.data.publishedAt > b.data.publishedAt) return 1;
					if (a.data.publishedAt < b.data.publishedAt) return -1;

					return 0;
				}
			);

		return {
			props: {
				posts: articles.reverse(),
			},
		};
	} catch (error) {
		console.log(error);
	}
}

export const getStaticPaths = async () => {
	if (process.env.SKIP_BUILD_STATIC_GENERATION) {
		return {
			paths: [],
			fallback: "blocking",
		};
	}

	const articles = await getAllArticles();
	const categories = duplicateRemoveArray(articles);

	return {
		paths: categories.map((category: any) => ({
			params: {
				category
			}
		})),
		fallback: false
	}
}