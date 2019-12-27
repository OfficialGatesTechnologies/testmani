const express = require('express');
const socketIO = require('socket.io');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3002;
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path')
const http = require('http');
const compression = require('compression')
const routes = require('./routes');
const handler = routes.getRequestHandler(app);

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
        nextapp.get('*', (req, res) => {
            return handle(req, res)
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
