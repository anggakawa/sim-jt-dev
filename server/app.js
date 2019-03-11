// @anggakawa

global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const helmet = require('helmet');

const serveStatic = require('serve-static');
const path = require('path');

const routes = require('./route/route.js');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.use('/', serveStatic(path.join(__dirname, '/dist')));

const router = express.Router();

routes(router);
app.use('/api', router);

app.listen(port, () => console.log('running on ' + port));
