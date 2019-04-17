import React from 'react';
import Link from 'next/link'
import { getSidebarTopics, getTopicsById } from "../clients/clients";
import { PageTemplate } from "../components/template";
import { SideBar } from "../components/all-topics-sidebar";

export default class extends React.Component {
  static async getInitialProps({ query: { topicId: topicId } }) {
    const [topicResult, allTopics] = await Promise.all([getTopicsById(topicId), getSidebarTopics()]);

    return { id: topicId, topicResult, allTopics };
  }

  render() {
    const { topicResult, allTopics } = this.props;

    return (
      <PageTemplate>
        <div className="col-lg-8 col-xs-12">
          <ul>
            {topicResult.articles.map(a => (
                <li key={a.id}>
                  <Link key={a.id} href={`/topic/${a.parentSlug}/article/${a.id}/${a.slug}`}
                        prefetch><a>{a.title}</a></Link>
                </li>
              )
            )}
          </ul>
        </div>

        <SideBar allTopics={allTopics} />
      </PageTemplate>
    )
  }
}
