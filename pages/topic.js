import React from 'react';
import fetch from 'cross-fetch';
import Link from 'next/link'

const defaultRequestConfiguration = {
  baseUrl: 'https://api.transferwise.com/v1/help-center/',
  headers: {
    'Accept-Language': 'en',
  },
};

const requestConfiguration = Object.assign({}, defaultRequestConfiguration);

export function isomorphicFetch(path) {
  const url = `${requestConfiguration.baseUrl}${path}`;
  return fetch(url, { headers: requestConfiguration.headers });
}

async function getTopicsById(id) {
  const topicsResponse = await isomorphicFetch(`topics/${id}`);
  return await topicsResponse.json();
}

async function getSidebarTopics() {
  return getTopicsById('');
}


export default class extends React.Component {
  static async getInitialProps({ query: { id } }) {
    const topicResult = await getTopicsById(id);
    const allTopics = await getSidebarTopics();

    console.log(`ID: ${id}`);

    return { id, topicResult, allTopics };
  }

  render() {
    const { id, topicResult, allTopics } = this.props;

    return (
      <div>
        <h1>Topic ID: {id}</h1>
        <ul>
          {topicResult.articles.map(a => <li key={a.id}>{a.title}</li>)}
        </ul>

        <ul>
          {allTopics.map(a => <li key={a.id}>{a.title}</li>)}
        </ul>

        <Link href="/topic/12"><a>LOL</a></Link>
      </div>
    )
  }
}
