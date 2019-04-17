import React from 'react';
import Link from 'next/link';
import { getSidebarTopics, getTopicsById } from '../clients/clients';
import { PageTemplate } from '../components/template';
import { redirect } from '../common/redirect';

export default class TopicPage extends React.Component {
  static async getInitialProps({ res, req: { url }, query: { topicId: topicId } }) {
    const [topicResult, allTopics] = await Promise.all([getTopicsById(topicId), getSidebarTopics()]);

    const sanitizedPath = url.replace('/topic/', '');

    if (sanitizedPath !== topicResult.slug) {
      redirect(res, `/topic/${topicResult.slug}`)
    }

    return { id: topicId, topicResult, allTopics };
  }

  render() {
    const { topicResult, allTopics } = this.props;
    const { title, articles } = topicResult;

    return (
      <PageTemplate allTopics={allTopics}>
        <h1>{title}</h1>
        <ul>
          {articles.map(a => (
              <li key={a.id}>
                <Link key={a.id} href={`/topic/${a.parentSlug}/article/${a.id}/${a.slug}`}
                      prefetch><a>{a.title}</a></Link>
              </li>
            )
          )}
        </ul>
      </PageTemplate>
    );
  }
}
