import * as React from 'react';

import { retrieveArticle, retrieveRelatedArticles } from './client/article-client';
import { ArticleContent } from './article-content';
import { Article, ArticleLinkProps } from './article-models';
import { RelatedArticleList } from './article-list/related-article-list';
import { getPathForArticle } from './article-link';
// import { MetaDescription } from '../common/seo/meta-description';

import { getSidebarTopics } from '../../clients/clients';
import { redirectIfNeeded } from '../../common/permanentRedirect';
import { UnsuccessfulApiResponse } from '../../common/client-utils';
import { PageTemplate } from '../template';

export interface ArticleViewRouteParams {
  articleId: number;
  topicId: number;
}

export interface ArticleViewPageData {
  article: Article;
  relatedArticles: ArticleLinkProps[];
  sidebarTopics: any[];
}

export const defaultData: ArticleViewPageData = {
  article: {
    content: '',
    title: '',
    articleSlug: '',
    topicSlug: '',
  },
  relatedArticles: [],
  sidebarTopics: []
};

export class ArticleViewPage extends React.PureComponent<ArticleViewPageData> {
  public static async getInitialProps({ res, req: { url }, query: { articleId } }): Promise<ArticleViewPageData> {
    let articleNotOkError: UnsuccessfulApiResponse | undefined;
    let { article, relatedArticles, sidebarTopics } = defaultData;

    try {
      [article, relatedArticles, sidebarTopics] = await Promise.all([
          retrieveArticle(articleId),
          retrieveRelatedArticles(articleId),
          getSidebarTopics()
        ]
      );
    } catch (e) {
      console.error(e);
      articleNotOkError = e;
    } finally {
      redirectIfNeeded(res, url, getPathForArticle(article), articleNotOkError);
    }

    return {
        relatedArticles,
        article,
        sidebarTopics
    };
  }

  constructor(private props: ArticleViewPageData) {
    super(props);
  }

  // public componentDidMount() {
  //   const { articleId } = this.props.match.params;
  //   const { title } = this.props.componentData.articleViewPage.article;
  //   // track(MixpanelEvent.ArticleViewed, { title, id: articleId });
  // }

  public render() {
    const { article, relatedArticles, sidebarTopics } = this.props;
    // const { articleId } = this.props.match.params;
    const { title, content } = article;

    return (
      <PageTemplate allTopics={sidebarTopics}>
        {/*<MetaDescription description={content}/>*/}

        <ArticleContent content={content} articleId={articleId} articleTitle={title}/>
        {relatedArticles.length > 0 && (
          <RelatedArticleList sourceArticleId={articleId} sourceArticleSubject={title} articles={relatedArticles}/>
        )}
      </PageTemplate>
    );
  }
}
