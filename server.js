var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    jwt = require('jsonwebtoken'),
    model = require('./api/models/model'),
    config = require('./api/utils/config'),
    builder = require('./api/utils/builder'),
    bodyParser = require('body-parser');
  
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.set('secret', config.secret);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));


var routes = require('./api/routes/routes');
routes(app);

app.listen(port);

builder.build();

console.log('API server started on:', port);