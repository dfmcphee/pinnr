require('dotenv').config();

const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const Twitter = require('./twitter');
const db = require('./models/db');
const passport = require('./passport');
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

if (!isProduction) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');

  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(__dirname + '/../dist/'));
}

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(cookieParser());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));

app.use(session({ secret: process.env.SESSION_SECRET }));

passport(app);

app.use('/', routes);

db.sequelize.sync({
  force: false
})
.then(function() {
  app.listen(port, '0.0.0.0', function(err) {
    if (err) {
      console.log(err);
    }
    Twitter.init();
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
}).catch(function (e) {
  throw new Error(e);
});