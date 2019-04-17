import React from 'react';
import Link from 'next/link'
import { getSidebarTopics, retrieveArticle } from "../clients/clients";

export default class extends React.Component {
  static async getInitialProps({ query: { articleId } }) {
    const all = Promise.all([retrieveArticle(articleId), getSidebarTopics()]);

    const [articleResult, allTopics] = await all;

    return { articleResult, allTopics };
  }

  render() {
    const { articleResult, allTopics } = this.props;

    return (
      <div>
        <h1>{articleResult.title}</h1>
        <div dangerouslySetInnerHTML={{__html: articleResult.content}} />

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
