#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   A local preview server for docs/, using only Node's standard library.

   It resolves directory URLs to index.html and serves 404.html for misses,
   which is what a static host does — so what you see here is what the site
   does in production, clean URLs included.
   ══════════════════════════════════════════════════════════════════════════ */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'docs');
const PORT = Number(process.env.PORT) || 8000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  // Resolve inside ROOT and confirm it stayed there — a request for
  // /../../etc/passwd must not escape the served folder.
  let file = path.join(ROOT, pathname);
  if (!path.resolve(file).startsWith(path.resolve(ROOT))) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, 'index.html');
  }

  if (!fs.existsSync(file)) {
    const notFound = path.join(ROOT, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': TYPES['.html'] });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404).end('Not found');
    }
    return;
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
  });
  res.end(fs.readFileSync(file));
}).listen(PORT, () => {
  console.log(`Serving docs/ at http://localhost:${PORT}`);
});
