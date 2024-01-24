const http = require('http');
const members = require('./members');
const users = require('./users');

const server = http.createServer( (req, res) => {
    const path = req.url;
    if (path == '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is the homepage');
        res.end();
    }
    else if (path == '/about') {
        res.statusCode = 210;
        res.setHeader('Content-Type', 'application/json');
        const response = {
            status: 'success',
            massage: 'response success',
            description: 'Exercise #03',
            date: new Date().toISOString(),
            data: members
        };
        res.write(JSON.stringify(response));
        res.end();
    } else if (path == '/users') {
        res.statusCode = 220;
        res.setHeader('Content-Type', 'application/json');
        const response = {
            status: 'success',
            massage: 'response success',
            description: 'Exercise #03',
            date: new Date().toISOString(),
            data: users
        };
        res.write(JSON.stringify(response));
        res.end();
    }

});
server.listen(3000)