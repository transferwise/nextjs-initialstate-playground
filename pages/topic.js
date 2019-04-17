import React from 'react';
import Link from 'next/link'
import { getSidebarTopics, getTopicsById } from "../clients/clients";

export default class extends React.Component {
  static async getInitialProps({ query: { topicId: topicId } }) {
    const topicResult = await getTopicsById(topicId);
    const allTopics = await getSidebarTopics();

    return { id: topicId, topicResult, allTopics };
  }

  render() {
    const { topicId, topicResult, allTopics } = this.props;

    console.log(topicResult);

    return (
      <div>
        <h1>Topic ID: {topicId}</h1>
        <ul>
          {topicResult.articles.map(a => (
              <li key={a.id}>
                <Link key={a.id} href={`/topic/${a.parentSlug}/article/${a.id}/${a.slug}`} prefetch><a>{a.title}</a></Link>
              </li>
            )
          )}
        </ul>

        <ul>
          {allTopics.map(a => (
            <li key={a.id}>
              <Link key={a.id} href={`/topic/${a.slug}`} prefetch><a>{a.title}</a></Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
