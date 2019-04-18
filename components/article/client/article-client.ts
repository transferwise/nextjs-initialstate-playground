import { Article, ArticleLinkProps } from '../article-models';
import { is2xxResponse, UnsuccessfulApiResponse } from '../../../common/client-utils';
import { isomorphicFetch } from '../../../common/isomorphic-fetch';

export interface ApiArticleResult {
  id: string;
  slug: string;
  parentSlug: string;
  title: string;
  content: string;
}

export async function retrieveArticle(articleId: number): Promise<Article> {
  const response = await isomorphicFetch(`articles/${articleId}`);

  if (!is2xxResponse(response.status)) {
    throw new UnsuccessfulApiResponse(`Status ${response.status} retrieving article: ${articleId}`, response);
  }

  const result: ApiArticleResult = await response.json();

  return {
    title: result.title,
    content: result.content,
    topicSlug: result.parentSlug,
    articleSlug: buildArticleSlug(result.id, result.slug),
  };
}

export async function retrieveRelatedArticles(articleId: number): Promise<ArticleLinkProps[]> {
  const response = await isomorphicFetch(`articles/${articleId}/related`);
  return transformArticleResponse(response);
}

export async function retrieveHomePagePopularArticles(): Promise<ArticleLinkProps[]> {
  const response = await isomorphicFetch(`articles/popular`);

  return await transformArticleResponse(response);
}

export async function retrievePopularArticles(topicId: number): Promise<ArticleLinkProps[]> {
  const response = await isomorphicFetch(`topics/${topicId}/articles/popular`);

  return transformArticleResponse(response);
}

async function transformArticleResponse(response: Response) {
  const articlesResult: ApiArticleResult[] = await response.json();

  return articlesResult.map(({ id, slug, title, parentSlug }) => ({
    articleSlug: buildArticleSlug(id, slug),
    topicSlug: parentSlug,
    title,
  }));
}

export function buildArticleSlug(id: string, slug: string) {
  return slug.match(/^[0-9]+\/.+/) ? slug : `${id}/${slug}`;
}
