import React from 'react';
import { Provider as TranslationProvider } from 'retranslate';
import { translations } from '../translations/';
import { getSidebarTopics } from '../clients/clients';
import { PageTemplate } from '../components/template';
import { permanentRedirect } from '../common/permanentRedirect';
import { Article, ArticleLinkProps } from '../components/article/article-models';
import { retrieveArticle, retrieveRelatedArticles } from '../components/article/client/article-client';
import { ArticleContent } from '../components/article/article-content';
import { RelatedArticleList } from '../components/article/article-list/related-article-list';

interface ArticlePageProps {
  articleId: number;
  articleResult: Article;
  relatedArticles: ArticleLinkProps[],
  allTopics: any[];
}

export default class extends React.PureComponent<ArticlePageProps> {
  static async getInitialProps({ res, req: { url }, query: { articleId } }): Promise<ArticlePageProps> {
    const [articleResult, relatedArticles, allTopics] = await Promise.all([
      retrieveArticle(articleId),
      retrieveRelatedArticles(articleId),
      getSidebarTopics()
    ]);

    const sanitizedPath = url;
    const slug = `/help/${articleResult.topicSlug}/${articleResult.articleSlug}`;

    if (sanitizedPath !== slug) {
      console.log(sanitizedPath, slug, res.constructor);
      permanentRedirect(res, slug);
    }

    return { articleId, articleResult, relatedArticles, allTopics };
  }

  render() {
    const { articleId, articleResult, relatedArticles, allTopics } = this.props;

    return (
      <TranslationProvider language={'hu'} messages={translations}>
        <PageTemplate allTopics={allTopics}>
          <ArticleContent articleId={articleId} content={articleResult.content} articleTitle={articleResult.title}/>
          {relatedArticles.length > 0 && (
            <RelatedArticleList sourceArticleId={articleId}
                                sourceArticleSubject={articleResult.title}
                                articles={relatedArticles}/>
          )}
        </PageTemplate>
      </TranslationProvider>
    );
  }
}
