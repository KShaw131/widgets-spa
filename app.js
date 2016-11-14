var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': 'false'}));
app.use(cookieParser());

// view engine setup
app.set('view engine', 'pug');

// set static files location to /public
app.use(express.static(__dirname + '/public'));

// application -------------------------------------------------------------
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// API Calls-----------------------------------------------------------------

// GET `/users`
app.get('/api/users', function(req, res) {
  request('http://spa.tglrw.com:4000/users', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      res.send(info);
    }
  });
});

// GET `/users/:id`
app.get('/api/users/:id', function(req, res) {
  var id = req.params.id;
  request('http://spa.tglrw.com:4000/users/'+ id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      res.send(info);
    }
  });
});

// GET `/widgets`
app.get('/api/widgets', function(req, res) {
  request('http://spa.tglrw.com:4000/widgets', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      res.send(info);
    }
  });
});

// GET `/widgets/:id`
app.get('/api/widgets/:id', function(req, res) {
  var id = req.params.id;
  request('http://spa.tglrw.com:4000/widgets/'+ id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body)
      res.send(info);
    }
  });
});

// POST `/widgets/`
app.post('/api/widgets', function(req, res) {
request({
    url: 'http://spa.tglrw.com:4000/widgets/',
    method: "POST",
    headers: {
        "content-type": "application/json"
    },
    json: {
        "name":req.body.name,
        "color":req.body.color,
        "price":req.body.price,
        "inventory":req.body.inventory,
        "melts":req.body.melts
      }
},
  function (error, response, body) {
    console.log('Body: '+body);
    if (!error && response.statusCode == 200 || response.statusCode == 201) {
      res.send(body);
    }
  });
  });

// PUT `/widgets/:id`
app.put('/api/widgets/:id', function(req, res) {
  request({
      url: 'http://spa.tglrw.com:4000/widgets/'+ req.params.id,
      method: "PUT",
      headers: {
          "content-type": "application/json"
      },
      json: {
          "name":req.body.name,
          "color":req.body.color,
          "price":req.body.price,
          "inventory":req.body.inventory,
          "melts":req.body.melts
        }
  },
   function (error, response, body) {
    if (!error && response.statusCode == 200 || response.statusCode == 204) {
      res.send(body);
    }
  });
});


// --------------------------------------------------------------------------

module.exports = app;
