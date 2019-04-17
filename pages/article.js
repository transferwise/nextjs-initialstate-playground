import React from 'react';
import { getSidebarTopics, retrieveArticle } from '../clients/clients';
import { PageTemplate } from '../components/template';
import { redirect } from '../common/redirect';

export default class extends React.Component {
  static async getInitialProps({ res, req: { url }, query: { articleId } }) {
    const [articleResult, allTopics] = await Promise.all([retrieveArticle(articleId), getSidebarTopics()]);

    const sanitizedPath = url.replace(/^\/article/, '');
    const slug = `/topic/${articleResult.parentSlug}/article/${articleResult.id}/${articleResult.slug}`;

    if (sanitizedPath !== slug) {
      redirect(res, slug)
    }

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
