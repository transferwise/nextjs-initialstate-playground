import fetch from "cross-fetch";

const defaultRequestConfiguration = {
  baseUrl: 'https://api.transferwise.com/v1/help-center/',
  headers: {
    'Accept-Language': 'en',
  },
};

const requestConfiguration = Object.assign({}, defaultRequestConfiguration);

export function isomorphicFetch(path): Promise<Response> {
  const url = `${requestConfiguration.baseUrl}${path}`;
  return fetch(url, { headers: requestConfiguration.headers });
}

export async function getTopicsById(id?: number) {
  const topicsResponse = await isomorphicFetch(id ? `topics/${id}` : 'topics');
  return await topicsResponse.json();
}

export async function getSidebarTopics() {
  return getTopicsById();
}
