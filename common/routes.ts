let linkBaseRoute = '';

// export function getDefaultRoute(): string {
//   // - this is the main route with wild cards, i.e. `/:locale?/help`
//   // - under normal circumstances we shouldn't have pointed to the first element of routes array
//   // but as FES reads the index file of the project through abstract syntax tree (AST) manipulation
//   // you can't define and export a constant (e.g. FrontendEntry.defaultRoute)
//   return FrontendEntry.routes[0];
// }

export function getRootRoute(): string {
  return linkBaseRoute;
}

export function setRootRoute(newBaseRoute: string) {
  linkBaseRoute = removeTrailingSlash(newBaseRoute);
}

export function get404PageRoute(): string {
  return `${getRootRoute()}/not-found`;
}

function removeTrailingSlash(url: string): string {
  const matchTrailingSlash = /\/$/;
  return url.replace(matchTrailingSlash, '');
}
