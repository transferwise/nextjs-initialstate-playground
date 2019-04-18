import * as React from 'react';
import { ArticleLink } from '../article-link';
import { ArticleLinkProps } from '../article-models';
import { listHeaderMargins } from '../../../common/bootstrap-variables';
import { AdditionalLinkTrackingParameters } from '../../../common/tracking-client';

interface ArticleListProps {
  title: string | React.ReactNode;
  articles: ArticleLinkProps[];
  additionalLinkTrackingParams: AdditionalLinkTrackingParameters;
}

export class ArticleList extends React.PureComponent<ArticleListProps> {
  public render() {
    const { articles, title, additionalLinkTrackingParams } = this.props;

    if (articles.length === 0) {
      return '';
    }

    return (
      <div className="help-center-media-list">
        <h6 className={listHeaderMargins}>{title}</h6>
        {articles.map((article, index) => {
          const copiedLinkTrackingParams = {
            eventName: additionalLinkTrackingParams.eventName,
            eventParams: Object.assign({}, additionalLinkTrackingParams.eventParams),
          };

          (copiedLinkTrackingParams.eventParams as any).positionInList = index;

          return (
            <ArticleLink
              key={article.articleSlug}
              articleSlug={article.articleSlug}
              topicSlug={article.topicSlug}
              title={article.title}
              additionalLinkTrackingParams={copiedLinkTrackingParams}
            />
          );
        })}
      </div>
    );
  }
}
