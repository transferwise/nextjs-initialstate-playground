import * as React from 'react';
import { mount } from 'enzyme';

jest.mock('../common/tracking-client');

import { track } from '../common/tracking-client';
import { MixpanelEvent } from '../common/tracking-client-events';
import { ArticleViewPage, ArticleViewRouteParams } from './article-view-page';
import { mockRouteComponentProps } from '../common/__mocks__/mock-route-props';
import Helmet from 'react-helmet';

describe('Article View Page', () => {
  let trackMock: any;

  beforeEach(() => {
    trackMock = track;
    trackMock.mockReset();
  });

  it('should track visits', () => {
    const articleTitle = 'The top 5 tests you should write before going to lunch';

    createComponent({ articleId: 56, title: articleTitle });
    expect(trackMock).toHaveBeenCalledWith(MixpanelEvent.ArticleViewed, { id: 56, title: articleTitle });
  });

  it('should set description meta tag using content from an article', () => {
    const content = 'This is a tiny article.';
    createComponent({ content });

    const helmetContent = Helmet.peek();
    const metaTag = (helmetContent as any).metaTags[0];

    expect(metaTag.content).toEqual(content);
  });
});

function createComponent({ articleId = 1956, topicId = 56, content = '', relatedArticles = [], title = '' } = {}) {
  const componentData = {
    articleViewPage: {
      article: {
        content,
        title,
        articleSlug: '',
        topicSlug: '',
      },
      relatedArticles,
    },
    mainView: { title },
    redirect: null,
  };

  const mockedRouteProps = mockRouteComponentProps<ArticleViewRouteParams>({ articleId, topicId });

  return mount(<ArticleViewPage {...mockedRouteProps} componentData={componentData} />);
}
