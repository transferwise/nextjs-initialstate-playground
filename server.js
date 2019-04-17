const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const pathMatch = require('path-match');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const route = pathMatch();

const topicMatch = route('/topic/:topicId/:lol?');
const articleMatch = route('/topic/:topicId/:lol/article/:articleId?/:lol2?');

app.prepare().then(() => {
    createServer((req, res) => {
        const { pathname, query } = parse(req.url, true);

        const articleParams = articleMatch(pathname);

        if (articleParams) console.log('article', articleParams, pathname);

        if (articleParams !== false) {
            app.render(req, res, '/article', Object.assign(articleParams, query));
            return;
        }

        const topicParams = topicMatch(pathname);

        if (topicParams) console.log('topic', topicParams);

        if (topicParams !== false) {
            app.render(req, res, '/topic', Object.assign(topicParams, query));
            return;
        }

        handle(req, res);
    }).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`)
    })
});
