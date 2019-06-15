var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var port = 3000;

var con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "",
    database: 'jsfe01'
})

con.connect(function(err){
    if(err) throw err;
    console.log('Imam bazu!');
})


app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(function(req, res, next) {
      	res.append("Access-Control-Allow-Origin", ["*"]);
      	res.append("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
      	res.append("Access-Control-Allow-Headers", "Content-Type");
      	next();
      });

      app.get("/hello", function(req, res){
          res.send('Hello!');
      })

      app.post("/login", function(req, res){
          var username = req.body.username;
          var password = req.body.password;
        
        con.query("SELECT * FROM korisnici WHERE kor_username=? AND kor_password=?",[username,
        password], function(err, result, fields){
            if(err) throw err;
            if(result.length == 0){
                var odg = {
                    result: 'ERR',
                    message: "Invalid credentials"
                }
                res.json(odg);
                return;
            }
            var user = result[0];
            delete user.kor_password;

            var odg = {
                result: 'OK',
                data: user
            }
            res.json(odg);
        })
      });

      app.listen(port, function(){
        console.log("Aplikacija radi na portu: "+port);
    });