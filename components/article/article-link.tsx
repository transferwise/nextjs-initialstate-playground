import * as React from 'react';
import { ArticleLinkProps } from './article-models';
import StarIcon from '@transferwise/icons/react/star';

import './article-link.scss';
import { IconSize } from '../../common/styles/icons';
import { getRootRoute } from '../../common/routes';
import { MixpanelEvent } from '../../common/tracking-client-events';
import { AdditionalLinkTrackingParameters, onclickTracking } from '../../common/tracking-client';

interface ArticleLinkComponentProps extends ArticleLinkProps {
  showStarIcon?: boolean;
  additionalLinkTrackingParams?: AdditionalLinkTrackingParameters;
}

export function getPathForArticle({ topicSlug, articleSlug }: ArticleLinkProps) {
  const articleHasParentTopic = !!topicSlug;

  const path = articleHasParentTopic
    ? `${getRootRoute()}/${topicSlug}/${articleSlug}`
    : `${getRootRoute()}/article/${articleSlug}`;

  return encodeURI(path);
}

export class ArticleLink extends React.PureComponent<ArticleLinkComponentProps> {
  constructor(props: ArticleLinkComponentProps) {
    super(props);

    this.trackClick = this.trackClick.bind(this);
  }

  public render() {
    const { showStarIcon, title } = this.props;

    return (
      <a className="article-link no-underline-and-hover" href={getPathForArticle(this.props)} onClick={this.trackClick}>
        <label className="media decision bg-focus p-y-3 p-l-5">
          {showStarIcon && (
            <div className="media-left">
              <StarIcon size={IconSize.Small} />
            </div>
          )}

          <div className="media-body">
            <h5>{title}</h5>
          </div>
          <div className="media-right">
            <span className="glyphicon glyphicon-menu-right" />
          </div>
        </label>
      </a>
    );
  }

  private trackClick() {
    const {
      articleSlug,
      title,
      additionalLinkTrackingParams = {
        // this default value magic will go away probably
        eventName: MixpanelEvent.ArticleLinkClicked,
        eventParams: {},
      },
    } = this.props;

    const id = articleSlug.split('/')[0];

    const linkParams = { 'Target article ID': id, 'Target article subject': title };
    const params = Object.assign({}, additionalLinkTrackingParams.eventParams, linkParams);

    onclickTracking(additionalLinkTrackingParams.eventName as MixpanelEvent, params);
  }
}
