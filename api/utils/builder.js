'use strict';

var mongoose = require('mongoose'),
    model = require('../../api/models/model'),
    request = require('request');



function build(){
    createCurr();
    createHexs();
    createUser();
}

function createUser(){
//    model.User.collection.drop();
    new model.User({
        userId:134256,
        name:"potato",
        pass:"cuscuzcomcharque"
    }).save();
}

function createCurr(base=null, callback=null){
    let url = (base) ? 'http://api.fixer.io/latest?base='+base : 'http://api.fixer.io/latest';
    request.get({url:url, json:true}, function(err, res, json){
       if(err) throw err;
        buildCurrencyInfo(json);
        if(callback) callback();
    });
}

function buildCurrencyInfo(dic){
    model.Currency.collection.drop();
     new model.Currency({
            currency:dic.base,
            abreviation:(dic.base).toString().substr(0, 2).toLocaleLowerCase(),
            rate:dic.rate,
        }).save();
        
    
    for(let i in dic.rates){
        new model.Currency({
            currency:i,
            abreviation:(i).toString().substr(0, 2).toLocaleLowerCase(),
            rate:parseFloat(dic.rates[i])
        }).save();
    }
}

function updateCurr(base=null, callback=null){
    let url = (base) ? 'http://api.fixer.io/latest?base='+base : 'http://api.fixer.io/latest';
    request.get({url:url, json:true}, function(err, res, json){
       if(err) throw err;
        updateCurrencyInfo(json);
        if(callback) callback();
    });
}

function updateCurrencyInfo(dic){
    model.Currency.findOneAndUpdate({currency:dic.base}, {
        currency:dic.base,
        abreviation:(dic.base).toString().substr(0, 2).toLocaleLowerCase(),
        rate: dic.rate ? dic.rate : null
    }, function(err, curr){
        if(err) throw err;
//        console.log(curr);
    })
    
    for(let i in dic.rates){
        model.Currency.findOneAndUpdate({currency:i}, {
            currency:i,
            abreviation:(i).toString().substr(0, 2).toLocaleLowerCase(),
            rate:dic.rates[i] ? parseFloat(dic.rates[i]) : null
        }, function(err, curr){
            if(err) throw err;
//            console.log(curr);
        })
    }

}


function createHexs(){
    model.Symbols.collection.drop();

    new model.Symbols({currency:'EUR', hex:'20ac'}).save();
    new model.Symbols({currency:'AUD', hex:'24'}).save();
    new model.Symbols({currency:'BGN', hex:'43b, 432'}).save();
    new model.Symbols({currency:'BRL', hex:'52, 24'}).save();
    new model.Symbols({currency:'CAD', hex:'24'}).save();
    new model.Symbols({currency:'CHF', hex:'43, 48, 46'}).save();
    new model.Symbols({currency:'CNY', hex:'a5'}).save();
    new model.Symbols({currency:'CZK', hex:'4b, 10d'}).save();
    new model.Symbols({currency:'DKK', hex:'6b, 72'}).save();
    new model.Symbols({currency:'GBP', hex:'a3'}).save();
    new model.Symbols({currency:'HKD', hex:'24'}).save();
    new model.Symbols({currency:'HRK', hex:'6b, 6e'}).save();
    new model.Symbols({currency:'HUF', hex:'46, 74'}).save();
    new model.Symbols({currency:'IDR', hex:'52, 70'}).save();
    new model.Symbols({currency:'ILS', hex:'20aa'}).save();
    new model.Symbols({currency:'INR', hex:'20B9'}).save();
    new model.Symbols({currency:'JPY', hex:'a5'}).save();
    new model.Symbols({currency:'KRW', hex:'20a9'}).save();
    new model.Symbols({currency:'MXN', hex:'24'}).save();
    new model.Symbols({currency:'MYR', hex:'52, 4d'}).save();
    new model.Symbols({currency:'NOK', hex:'6b, 72'}).save();
    new model.Symbols({currency:'NZD', hex:'24'}).save();
    new model.Symbols({currency:'PHP', hex:'20b1'}).save();
    new model.Symbols({currency:'PLN', hex:'7a, 142'}).save();
    new model.Symbols({currency:'RON', hex:'6c, 65, 69'}).save();
    new model.Symbols({currency:'RUB', hex:'20bd'}).save();
    new model.Symbols({currency:'SEK', hex:'6b, 72'}).save();
    new model.Symbols({currency:'SGD', hex:'24'}).save();
    new model.Symbols({currency:'THB', hex:'e3f'}).save();
    new model.Symbols({currency:'TRY', hex:'20ba'}).save();
    new model.Symbols({currency:'USD', hex:'24'}).save();
    new model.Symbols({currency:'ZAR', hex:'52'}).save();    
}


module.exports = {build, createCurr, updateCurr};
