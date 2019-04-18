import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { UnregisterCallback, Href, Action } from 'history';

export function mockRouteProps(search: string = ''): RouteProps {
  return {
    location: {
      pathname: '',
      state: {},
      hash: '',
      search,
    },
  };
}

export function mockRouteComponentProps<T>(params?: T): RouteComponentProps<T> {
  const location = {
    hash: '',
    key: '',
    pathname: '',
    search: '',
    state: {},
  };

  const props = {
    match: {
      isExact: true,
      params: params || ({} as T),
      path: '',
      url: '',
    },
    location,
    history: {
      length: 2,
      action: 'POP' as Action,
      location,
      push: jest.fn(),
      replace: jest.fn(),
      go: jest.fn(),
      goBack: jest.fn(),
      goForward: jest.fn(),
      block: () => {
        const temp: UnregisterCallback = jest.fn();
        return temp;
      },
      createHref: () => {
        const temp: Href = '';
        return temp;
      },
      listen: () => {
        const temp: UnregisterCallback = jest.fn();
        return temp;
      },
    },
    staticContext: {},
  };

  return props;
}
