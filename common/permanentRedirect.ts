import queryString from 'query-string';
import { UnsuccessfulApiResponse } from './client-utils';

function handleArticleNotOk(res: any, response: Response, queryStrings: string){
  // TODO: Include the actual 500 page
  switch (response.status) {
    case 404:
      return notFoundRedirect(res, queryStrings);
    default:
      return homepageRedirect(res);
  }
}

export function permanentRedirect(res: any, to: string) {
  res.writeHead(301, { Location: to });
  res.end();
}

function notFoundRedirect(res: any, queryStrings: string) {
  res.writeHead(404, { Location: `/help/not-found?${queryStrings}` });
  res.end();
}

function homepageRedirect(res: any) {
  res.writeHead(500, { Location: '/help/' });
  res.end();
}

export function redirectIfNeeded(
  res: any,
  currentUrl: string,
  expectedUrl: string,
  requestNotOkError?: UnsuccessfulApiResponse
) {
  if (requestNotOkError) {
    const redirectQueryStrings = queryString.stringify({ url: currentUrl });
    handleArticleNotOk(res, requestNotOkError.response, redirectQueryStrings);
    return;
  }

  if (decodeURI(expectedUrl) !== decodeURI(currentUrl)) {
    permanentRedirect(res, expectedUrl);
  }
}
