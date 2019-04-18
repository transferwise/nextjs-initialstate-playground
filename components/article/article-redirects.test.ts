import { redirectIfNeeded } from './article-redirects';
import { RedirectCommand } from '../home-page/routing/redirects';
import { getPathForArticle } from './article-link';
import { UnsuccessfulApiResponse } from '../common/client-utils';
import { setRootRoute, get404PageRoute, getRootRoute } from '../common/routes';
import { Response } from 'cross-fetch';
import queryString from 'query-string';

describe('Article redirects', () => {
  setRootRoute('/help-beta');

  describe('does not happen when', () => {
    it('no article error or outdated url provided', () => {
      const articleNotOkError = undefined;
      const article = {
        content: 'content',
        articleSlug: '123/article-slug',
        topicSlug: '1/getting-started',
        title: 'Title',
      };
      const path = `${getRootRoute()}/1/getting-started/123/article-slug`;
      const redirect = redirectIfNeeded(path, article, articleNotOkError);
      expect(redirect).toBeNull();
    });

    it('url is correct but not encoded', () => {
      const articleNotOkError = undefined;
      const article = {
        content: 'content',
        articleSlug: '2559761/銀行振込ての入金について',
        topicSlug: '15/送金手続きに対する入金について',
        title: '銀行振込ての入金について',
      };
      const path = `${getRootRoute()}/15/送金手続きに対する入金について/2559761/銀行振込ての入金について`;
      const redirect = redirectIfNeeded(path, article, articleNotOkError);
      expect(redirect).toBeNull();
    });

    it('url is correct and encoded', () => {
      const articleNotOkError = undefined;
      const article = {
        content: 'content',
        articleSlug: '2559761/銀行振込ての入金について',
        topicSlug: '15/送金手続きに対する入金について',
        title: '銀行振込ての入金について',
      };
      const path = `${getRootRoute()}/15/%E9%80%81%E9%87%91%E6%89%8B%E7%B6%9A%E3%81%8D%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8B%E5%85%A5%E9%87%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/2559761/%E9%8A%80%E8%A1%8C%E6%8C%AF%E8%BE%BC%E3%81%A6%E3%81%AE%E5%85%A5%E9%87%91%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6`;
      const redirect = redirectIfNeeded(path, article, articleNotOkError);
      expect(redirect).toBeNull();
    });
  });

  describe('when article is not ok', () => {
    const article = {
      content: 'content',
      articleSlug: '123/article-slug',
      topicSlug: '',
      title: 'Title',
    };

    it('redirects to the not found page with the appropriate quesry string params when the status is 404', () => {
      const response: Response = new Response(null, { status: 404 });
      const articleNotOkError = new UnsuccessfulApiResponse('meh', response);
      const wrongPath = 'wrong-path-for-article';
      const queryStringProps = queryString.stringify({ url: wrongPath });
      const redirect = redirectIfNeeded(wrongPath, article, articleNotOkError);
      expect(redirect!.to).toEqual(`${get404PageRoute()}?${queryStringProps}`);
    });

    it('redirects to the homepage when the on any other status', () => {
      const response = new Response(null, { status: 501 });
      const articleNotOkError = new UnsuccessfulApiResponse('meh', response);
      const redirect = redirectIfNeeded('', article, articleNotOkError);
      expect(redirect!.to).toEqual(`${getRootRoute()}/`);
    });
  });

  describe('[SEO] when article path is outdated', () => {
    it('does not need permanentRedirect if the current path is valid for orphan article', () => {
      const article = {
        content: 'content',
        articleSlug: '123/article-slug',
        topicSlug: '',
        title: 'Title',
      };
      const path = `${getRootRoute()}/article/123/article-slug`;
      const redirect = redirectIfNeeded(path, article);
      expect(redirect).toBeNull();
    });

    it('does not need permanentRedirect if the current path is valid for normal article', () => {
      const article = {
        content: 'content',
        articleSlug: '123/article-slug',
        topicSlug: '1/getting-started',
        title: 'Title',
      };
      const path = `${getRootRoute()}/1/getting-started/123/article-slug`;
      const redirect = getRedirect(params({ article, path }));
      expect(redirect).toBeNull();
    });

    it('redirects if the current path is NOT valid for orphan article', () => {
      const article = {
        content: 'content',
        articleSlug: '123/article-slug',
        topicSlug: '',
        title: 'Title',
      };

      const paths = [
        `${getRootRoute()}/article/1/article-slug`,
        `${getRootRoute()}/article/123/article-sluuug`,
        `${getRootRoute()}/1/topic-slug/123/article-sluuu`,
      ];
      paths
        .map(path => getRedirect(params({ article, path })))
        .forEach(redirect => {
          expect(redirect).not.toBeNull();
          expect(redirect!.to).toBe(getPathForArticle(article));
          expect(isPermanentRedirect(redirect!)).toBeTruthy();
        });
    });

    it('redirects if the current path is NOT valid for normal article', () => {
      const article = {
        content: 'content',
        articleSlug: '123/article-slug',
        topicSlug: '1/getting-started',
        title: 'Title',
      };

      const paths = [
        `${getRootRoute()}/2/getting-started/123/article-slug`,
        `${getRootRoute()}/1/getting-starteeed/123/article-slug`,
        `${getRootRoute()}/1/getting-started/123/article-sluuug`,
      ];
      paths
        .map(path => getRedirect(params({ article, path })))
        .forEach(redirect => {
          expect(redirect).not.toBeNull();
          expect(redirect!.to).toBe(getPathForArticle(article));
          expect(isPermanentRedirect(redirect!)).toBeTruthy();
        });
    });
  });

  // tslint:disable-next-line
  function params({ articleNotOkError = undefined, path = '', article = {} } = {}) {
    return {
      articleNotOkError,
      currentArticlePath: path,
      article,
    };
  }

  function getRedirect({ articleNotOkError, currentArticlePath, article }: any): RedirectCommand | null {
    return redirectIfNeeded(currentArticlePath, article, articleNotOkError);
  }

  function isPermanentRedirect(redirect: RedirectCommand) {
    return redirect.status === 301;
  }
});
