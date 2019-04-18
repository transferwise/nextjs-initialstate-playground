import React, { FunctionComponent } from 'react';
import './article-view.scss';
import { ArticleFeedback } from './article-feedback';

interface ArticleViewProps {
  content: string;
  articleId: number;
  articleTitle: string;
}

export const ArticleContent: FunctionComponent<ArticleViewProps> = (props: ArticleViewProps) => {
    const { articleId, content, articleTitle } = props;

    return (
      <div className="article-view panel-body m-t-section-1">
        <h1>{articleTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <hr />
        <ArticleFeedback articleId={articleId} articleTitle={articleTitle} />
      </div>
    );
}
