import React from 'react';

import { Message } from 'retranslate';
import './article-feedback.scss';
import { MixpanelEvent } from '../../common/tracking-client-events';
import { track } from '../../common/tracking-client';

interface ArticleFeedbackState {
  feedbackSent: boolean;
}

interface ArticleFeedbackProps {
  articleId: number;
  articleTitle: string;
}

const FeedbackSent: React.FunctionComponent = () => {
  return (
    <span className="article-feedback-thanks">
      <strong>
        <Message>feedback.title.submitted</Message>
      </strong>
    </span>
  );
};

export class ArticleFeedback extends React.Component<ArticleFeedbackProps, ArticleFeedbackState> {
  public state: ArticleFeedbackState = {
    feedbackSent: false,
  };

  constructor(props: ArticleFeedbackProps) {
    super(props);
    this.sendUnhelpfulEvent = this.sendUnhelpfulEvent.bind(this);
    this.sendHelpfulEvent = this.sendHelpfulEvent.bind(this);
  }

  public sendHelpfulEvent() {
    this.setState({ feedbackSent: true });
    this.trackHelpfulness(MixpanelEvent.ArticleFeedbackPositive);
  }

  public sendUnhelpfulEvent() {
    this.setState({ feedbackSent: true });
    this.trackHelpfulness(MixpanelEvent.ArticleFeedbackNegative);
  }

  public render() {
    const { feedbackSent } = this.state;

    return <React.Fragment>{feedbackSent ? <FeedbackSent/> : this.renderWasItHelpful()}</React.Fragment>;
  }

  private renderWasItHelpful() {
    return (
      <h4 className="article-was-it-helpful">
        <span className="m-r-panel">
          <Message>feedback.title.default</Message>
        </span>
        <div className="spacer visible-xs m-t-1"/>
        <span>
          <button className="btn btn-sm btn-info" onClick={this.sendHelpfulEvent}>
            <Message>feedback.cta.positive</Message>
          </button>
          <button className="btn btn-sm btn-danger m-l-2" onClick={this.sendUnhelpfulEvent}>
            <Message>feedback.cta.negative</Message>
          </button>
        </span>
      </h4>
    );
  }

  private trackHelpfulness(message: MixpanelEvent) {
    const { articleId, articleTitle } = this.props;
    track(message, { 'article ID': articleId, 'article subject': articleTitle });
  }
}
