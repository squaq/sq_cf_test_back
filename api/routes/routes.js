'use strict';
let mainUri = '/api';

function listTasks(app) {
    var list = require('../controllers/controller');
    
    //getting currency rates
    app.route(mainUri+'/rate').get(list.list_currency);
    app.route(mainUri+'/rate/:base').get(list.list_currency);
    
    //sending message
    app.route(mainUri+'/message').get(list.list_msg_all);
    app.route(mainUri+'/msgdata').get(list.list_msg_data);
    app.route(mainUri+'/message/:msgId').get(list.list_msg_one);
    app.route(mainUri+'/message').post(list.list_msg);
    
    app.route(mainUri+'/users').get(list.list_users);
    app.route(mainUri+'/auth').post(list.auth);
              
    
    app.use(['/api'], function(req, res) {
        res.send('<h1>API IS WORKING</h1>');
    });
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
};


module.exports = listTasks;