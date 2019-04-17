import React from 'react';
import { getSidebarTopics, retrieveArticle } from '../clients/clients';
import { PageTemplate } from '../components/template';

export default class extends React.Component {
  static async getInitialProps({ query: { articleId } }) {
    const [articleResult, allTopics] = await Promise.all([retrieveArticle(articleId), getSidebarTopics()]);
    return { articleResult, allTopics };
  }

  render() {
    const { articleResult, allTopics } = this.props;

    return (
      <PageTemplate allTopics={allTopics}>
        <h1>{articleResult.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: articleResult.content }}/>
      </PageTemplate>
    );
  }
}
