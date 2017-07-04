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
              
//    app.route('/tasks')
//        .get(list.list_all_tasks)
//        .post(list.create_a_task);
//
//    app.route('/tasks/:taskId')
//        .get(list.read_a_task)
//        .put(list.update_a_task)
//        .delete(list.delete_a_task);
    
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found'})
    });
};


module.exports = listTasks;