import * as React from 'react';
import { mount } from 'enzyme';
import { ArticleFeedback } from './article-feedback';

jest.mock('../common/tracking-client');

import { track } from '../common/tracking-client';
import { MixpanelEvent } from '../common/tracking-client-events';

describe('Article Feedback', () => {
  let component: any;
  let trackMock: any;

  beforeEach(() => {
    component = null;

    trackMock = track;
    trackMock.mockReset();
  });

  it('matches snapshot', () => {
    component = createComponent();

    expect(component.getElement()).toMatchSnapshot();
  });

  it('should change "Was it helpful?" to "Thanks!" when you click either "Yes" or "No"', () => {
    component = createComponent();

    expect(component.find('.article-was-it-helpful').exists()).toBeTruthy();
    expect(component.find('FeedbackSent').exists()).toBeFalsy();

    clickYesButton();

    expect(component.find('.article-was-it-helpful').exists()).toBeFalsy();
    expect(component.find('FeedbackSent').exists()).toBeTruthy();

    component = createComponent();

    clickNoButton();

    expect(component.find('.article-was-it-helpful').exists()).toBeFalsy();
    expect(component.find('FeedbackSent').exists()).toBeTruthy();
  });

  it('should call "track" function with articleId, articleTitle and the type of feedback', () => {
    const articleId = 13;
    const articleTitle = '5 reasons why Help Experience is the best team';

    component = createComponent({ articleId, articleTitle });
    clickYesButton();
    expect(trackMock).toHaveBeenCalledWith(MixpanelEvent.ArticleFeedbackPositive, {
      'article ID': articleId,
      'article subject': articleTitle,
    });

    component = createComponent({ articleId, articleTitle });
    clickNoButton();
    expect(trackMock).toHaveBeenCalledWith(MixpanelEvent.ArticleFeedbackNegative, {
      'article ID': articleId,
      'article subject': articleTitle,
    });
  });

  function clickYesButton() {
    component.find('.btn-info').simulate('click');
  }

  function clickNoButton() {
    component.find('.btn-danger').simulate('click');
  }
});

function createComponent({ articleId = 123, articleTitle = 'Some article title' } = {}) {
  return mount(<ArticleFeedback articleId={articleId} articleTitle={articleTitle} />);
}
