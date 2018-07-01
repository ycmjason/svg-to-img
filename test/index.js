const app = require('express')();
const opn = require('opn');
const args = process.argv.slice(2);

const $timeout = (fn, ms) => {
  const id = setTimeout(fn, ms);
  return () => clearTimeout(id);
};

console.log('Preparing server...');
(async () => {
  let cancelLastTimeout = () => {};

  app.use((req, res, next) => {
    console.log(req.url);
    next();
  });

  app.use((req, res, next) => {
    cancelLastTimeout();
    next();
    cancelLastTimeout = $timeout(() => {
      console.log('No request received in 3 seconds.');
      console.log('Shutting down server...');
      process.exit(0);
    }, 3000);
  });

  if (args.length <= 0 || args.includes('node')) {
    app.get('/node-one-off-api', await require('./node-one-off-api')());
    app.get('/node-persistent-api', await require('./node-persistent-api')());
  }

  if (args.length <= 0 || args.includes('script-tag')) {
    app.get('/script-tag', await require('./script-tag')());
  }

  if (args.length <= 0 || args.includes('bundler')) {
    app.get('/bundler', await require('./bundler')());
  }

  app.listen(5000, () => {
    console.log('Server started, opening browser...');

    if (args.length <= 0 || args.includes('node')) {
      opn('http://localhost:5000/node-one-off-api');
      opn('http://localhost:5000/node-persistent-api');
    }

    if (args.length <= 0 || args.includes('script-tag')) {
      opn('http://localhost:5000/script-tag');
    }

    if (args.length <= 0 || args.includes('bundler')) {
      opn('http://localhost:5000/bundler');
    }
  });
})().catch(console.error);
