var express = require('express'),
    app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'kinevotedb.cjvcoatcfeke.us-west-2.rds.amazonaws.com',
    user: 'admin',
    password: 'kinevote2016',
    database: 'KineVote'
});

connection.connect();

app.use(express.static('.'))

app.get('/', function(req, res) {
    io.on('connection', function(socket) {
        console.log("Connected");
        socket.on('coachella', function(message) {
            console.log("YOU'VE GOT MAIL: ", message);
            connection.query('SELECT * from hashtagsLog LIMIT 500', function(err, rows, fields) {
            	io.emit('coachella', err ? err: rows);
            });
        });
    });
});
http.listen(3000, function() {
    console.log('listening on *:3000');
});