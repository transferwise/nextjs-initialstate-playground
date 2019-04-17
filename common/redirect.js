export function redirect(res, to) {
  res.writeHead(302, { Location: to });
  res.end();
}