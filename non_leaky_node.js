var mongo = require("mongodb"),
    heapdump = require("heapdump");

var db = new mongo.Db('leak_demo', new mongo.Server('127.0.0.1', process.env.BOXEN_MONGODB_PORT || mongo.Connection.DEFAULT_PORT, {auto_reconnect: true, poolSize:25}), {safe:false, native_parser:true});

db.open(function(err, db){
    var header = {'Content-Type': 'text/plain'};
    var http = require('http');
    http.createServer(function (req, res) {
        db.collection("questions", function(err, collection){
            collection.find({},{limit: 1},function(err, cursor){
                cursor.toArray(function(err, objs){
                    res.end('');
                });
            });
        });
    }).listen(3478);
    console.log('Server running at http://127.0.0.1:3478/');
});

var interval = setInterval(function() {
    heapdump.writeSnapshot();
}, 300*1000);
