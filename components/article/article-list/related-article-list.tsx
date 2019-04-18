import * as React from 'react';
import { ArticleLinkProps } from '../article-models';
import { ArticleList } from './article-list';
import { Message } from 'retranslate';
import { MixpanelEvent } from '../../../common/tracking-client-events';

interface RelatedArticleListProps {
  articles: ArticleLinkProps[];
  sourceArticleId: number;
  sourceArticleSubject: string;
}

export class RelatedArticleList extends React.PureComponent<RelatedArticleListProps> {
  public render() {
    const { articles, sourceArticleId, sourceArticleSubject } = this.props;

    const onLinkClickBaseParams = {
      eventName: MixpanelEvent.RelatedArticleClicked,
      eventParams: {
        'Source article ID': sourceArticleId,
        'Source article subject': sourceArticleSubject,
      },
    };

    return (
      <ArticleList
        title={<Message>article.list.title.related</Message>}
        articles={articles}
        additionalLinkTrackingParams={onLinkClickBaseParams}
      />
    );
  }
}
