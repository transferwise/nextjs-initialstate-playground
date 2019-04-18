import fetch from 'cross-fetch';

interface Headers {
  [key: string]: string;
}

interface BaseRequestConfiguration {
  baseUrl: string;
  headers: Headers;
}

const defaultRequestConfiguration: BaseRequestConfiguration = {
  baseUrl: 'https://api.transferwise.com/v1/help-center/',
  headers: {
    'Accept-Language': 'en',
  },
};

const requestConfiguration = Object.assign({}, defaultRequestConfiguration);

export function setLocaleHeaderForAllRequests(locale: string) {
  requestConfiguration.headers['Accept-Language'] = locale;
}

export function setBaseUrlForAllRequests(baseUrl: string) {
  requestConfiguration.baseUrl = baseUrl;
}

export function isomorphicFetch(path: string): Promise<Response> {
  const url = `${requestConfiguration.baseUrl}${path}`;
  return fetch(url, { headers: requestConfiguration.headers });
}
