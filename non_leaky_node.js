var mongo = require("mongodb");

var db = new mongo.Db('leak_demo', new mongo.Server('127.0.0.1', process.env.BOXEN_MONGODB_PORT || mongo.Connection.DEFAULT_PORT, {auto_reconnect: true, poolSize:25}), {safe:false, native_parser:true});

db.open(function(err, db){
    var header = {'Content-Type': 'text/plain'};
    var http = require('http');
    http.createServer(function (req, res) {
        db.collection("questions", function(err, collection){
            res.writeHead(200, header);
            collection.find({},{limit: 1},function(err, cursor){
                cursor.toArray(function(err, objs){
                        res.end(JSON.stringify(objs));  
                });
            });
        });
    }).listen(3478);
    console.log('Server running at http://127.0.0.1:3478/');    
});
