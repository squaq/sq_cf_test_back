'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema;

let SymbolsSchema = new schema({
    currency:{ref:'Symbols', type:String},
    hex:{type:String}
});
exports.Symbols = mongoose.model('Symbols', SymbolsSchema);

let CurrencySchema = new schema({
    currency:{type:String},
    abreviation:{type:String},
    rate:{type:Number}
});
exports.Currency = mongoose.model('Currency', CurrencySchema);

let MessageSchema = new schema({
    userId:String,
    currencyFrom:String,
    currencyTo:String,
    amountSell:Number,
    amountBuy: Number,
    rate:Number,
    timePlaced:String,
    originatingCountry:String
});
exports.Message = mongoose.model('Message', MessageSchema);

let UserSchema = new schema({
    userId: Number,
    name:String,
    pass:String,
});
exports.User = mongoose.model('User', UserSchema);


