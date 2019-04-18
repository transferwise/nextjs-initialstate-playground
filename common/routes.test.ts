import { getRootRoute, setRootRoute } from './routes';

describe('Global routes', () => {
  it('removes trailing slack from route', () => {
    const urlWithTrailingSlash = '/help/';
    setRootRoute(urlWithTrailingSlash);
    expect(getRootRoute()).toEqual('/help');
  });
});
