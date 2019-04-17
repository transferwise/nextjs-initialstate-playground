import React from 'react';
import Link from 'next/link'
import { getSidebarTopics, getTopicsById } from "../clients/clients";
import { PageTemplate } from "../components/template";

export default class extends React.Component {
  static async getInitialProps({ query: { topicId: topicId } }) {
    const [topicResult, allTopics] = await Promise.all([getTopicsById(topicId), getSidebarTopics()]);

    console.log(topicResult)

    return { id: topicId, topicResult, allTopics };
  }

  render() {
    const { topicResult, allTopics } = this.props;

    return (
      <PageTemplate allTopics={allTopics}>
          <ul>
            {topicResult.articles.map(a => (
                <li key={a.id}>
                  <Link key={a.id} href={`/topic/${a.parentSlug}/article/${a.id}/${a.slug}`}
                        prefetch><a>{a.title}</a></Link>
                </li>
              )
            )}
          </ul>
      </PageTemplate>
    )
  }
}
