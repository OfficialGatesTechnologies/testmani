const express = require('express');
const socketIO = require('socket.io');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path')
const http = require('http');
const compression = require('compression')
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

// https://trinitytuts.com/tips/deploying-a-nextjs-app-in-production-with-pm2/
// https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-up-node-on-ec2-instance.html

// >>> curl - o - https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

// >>> . ~/.nvm/nvm.sh

//     >>> nvm install 10.16.3

//         >>> node - e "console.log('Running Node.js ' + process.version)"


// https://www.npmjs.com/package/pm2

// >>> npm install pm2 - g


// cd /var/www/html / node - apis

// npm install

//     >>> cd /var/www/html / socket
//         >>> node server.js
//             >>> npm install pm2 - g
//                 >>> pm2 start server.js
//                     >>> pm2 restart server.js
//                         >>> pm2 stop server.js


// Security group AWS port enable
// Custom
// TCP
// 3000


// =======================REMOVE Port==================================

// <VirtualHost *:80>
//     ServerAdmin root@localhost
//     ServerName api.docdit.com
//     ProxyPreserveHost On

//     # setup the proxy
//     <Proxy *>
//         Order allow,deny
//         Allow from all
//     </Proxy>
//     ProxyPass / http://3.136.196.122:8080/
//     ProxyPassReverse / http://3.136.196.122:8080/
// </VirtualHost>

// <VirtualHost *:80>
// ServerName docdit.com
// DocumentRoot /var/www/html
// </VirtualHost>


app.prepare()
    .then(() => {
        const nextapp = express();
        var server = http.createServer(nextapp);
        var io = socketIO(server);
        nextapp.use(compression());
        nextapp.use(handler);
        nextapp.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
                const secureUrl = "https://" + req.headers['host'] + req.url;
                res.writeHead(301, { "Location": secureUrl });
                res.end();
            }
            next();
        });
        nextapp.use('/static', express.static(__dirname + '/static'));
        nextapp.get('*', (req, res) => {
            // const parsedUrl = parse(req.url, true)
            // const { pathname } = parsedUrl
            // if (pathname === '/robots.txt') {
            //     const filePath = join(__dirname, 'public', pathname)
            //     app.serveStatic(req, res, filePath)
            // } else {
            //     handle(req, res, parsedUrl)
            // }
           return  handle(req, res)
        })
        io.on('connection', (socket) => {
           
            console.log(' Connected');
            socket.on('connectUser', (params) => {
                console.log(' connectUser');
            });
            socket.on('connectProvider', (params) => {
                console.log(' params', params);
                io.emit('connectUserFront', { will: params.value });
            });
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Listening on port ${port}...`);
        });
    }).catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
