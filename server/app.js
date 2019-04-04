// @anggakawa

global.__basedir = __dirname;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const helmet = require('helmet');
const compression = require('compression');

const serveStatic = require('serve-static');
const path = require('path');

const http = require('http');
const https = require('https');

const routes = require('./route/route.js');

const app = express();
const port = 3000;

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer({ 
//     // key: fs.readFileSync('./credentials/server.key'), 
//     // cert: fs.readFileSync('./credentials/server.cert')
//   }, app);

// add new whitelist
const whitelist = ['http://localhost', 'http://10.140.15.100:3000', 'http://localhost:8080']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(morgan('combined'));
app.use(bodyParser.urlencoded( {extended: false} ));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());

app.use('/', serveStatic(path.join(__dirname, '/dist')));

const router = express.Router();

routes(router);
app.use('/api', router);

app.listen(port, () => console.log('running on ' + port));
// httpServer.listen(8433, () => console.log('running on port ' + 8433));
// httpsServer.listen(port, () => console.log('running on port ' + port));