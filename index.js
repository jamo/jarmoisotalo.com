const path = require('path');
const {parse, format} = require('url');
const stream = require('send');

const contenttypes = {
  html: 'text/html',
  webm: 'video/webm',
  mp4: 'video/mp4',
  js: 'text/javascript',
  css: 'text/css',
  woff2: 'font/woff2',
  png: 'image/png',
  jpg: 'image/jpeg'

}

module.exports = async function server(req, res) {
  const {pathname} = parse(req.url);
  const current = process.cwd();
  let related = path.parse(path.join(current, pathname));

  related = decodeURIComponent(path.format(related));


  if (related === current) {
    related = related + '/index.html'
  }

  debugger

  console.log(`sending file ${related}, ${path.extname(related)}`)
  res.setHeader('Content-Type', contenttypes[path.extname(related).slice(1)]);

  res.setHeader('cache-control', 's-maxage=10000000,max-age=0');
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  return stream(
    req,
    related,
    {
      dotfiles: 'allow',
      cacheControl: false
    }
  ).pipe(res);
}
