import React from 'react';
import Link from 'next/link';
import { getSidebarTopics, retrieveArticle } from '../clients/clients';
import { PageTemplate } from '../components/template';
import { SideBar } from '../components/all-topics-sidebar';

export default class extends React.Component {
  static async getInitialProps({ query: { articleId } }) {
    const [articleResult, allTopics] = await Promise.all([retrieveArticle(articleId), getSidebarTopics()]);
    return { articleResult, allTopics };
  }

  render() {
    const { articleResult, allTopics } = this.props;

    return (
      <PageTemplate>
        <div className="col-lg-8 col-xs-12">
          <h1>{articleResult.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: articleResult.content }}/>
        </div>

        <SideBar allTopics={allTopics}/>
      </PageTemplate>
    );
  }
}
