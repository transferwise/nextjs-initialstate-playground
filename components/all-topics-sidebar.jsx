import React from 'react';
import Link from 'next/link';

export function SideBar(props) {
  const { allTopics } = props;

  return <div className="col-lg-3 col-xs-12">
    <ul>
      {allTopics.map(a => (
        <li key={a.id}>
          <Link key={a.id} href={`/topic/${a.slug}`} prefetch><a>{a.title}</a></Link>
        </li>
      ))}
    </ul>
  </div>;
}