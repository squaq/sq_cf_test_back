'use strict';



let mongoose = require('mongoose'),
    symbols = mongoose.model('Symbols'),
    currency = mongoose.model('Currency'),
    message = mongoose.model('Message'),
    user = mongoose.model('User'),
    request = require('request'),
    util = require('../../api/utils/builder'),
    jwt = require('jsonwebtoken');

//listing currency rates 
exports.list_currency = function(req, res){
    asyncCreateCurr(req.params.base, res);
};

function asyncCreateCurr(base, res){
    util.updateCurr(base, function(){
        Promise.all([currency.find(), symbols.find()])
            .then(function(v){
                let nobj = v[0].map(function(n){
                    let h = v[1].filter(function(s){if(n.currency == s.currency) return s})
                    let obj = {
                        currency:n.currency,
                        abreviation:n.abreviation,
                        rate:n.rate,
                        hex:h[0].hex
                    }
                    return obj;
                })
                res.json({data:{currencies:nobj}});
            })
    })
}

exports.list_msg = function(req, res){
    message.create({
        userId:req.body.userId,
        currencyFrom:req.body.currencyFrom,
        currencyTo:req.body.currencyTo,
        amountSell:req.body.amountSell,
        amountBuy: req.body.amountBuy,
        rate:req.body.rate,
        timePlaced:req.body.timePlaced,
        originatingCountry:req.body.originatingCountry
        
    }, function(err, s){
        if(err) res.json(err);
        res.json({
            data:{
                    msg:'message created',
                }
            }
        );    
    })
    
}

exports.list_msg_all = function(req, res){
    message.find().exec(function(err, msg){
        if(err) res.json(err)
        res.json({msg:msg});    
    });
}

exports.list_msg_one = function(req, res){
    message.findOne({_id:req.params.msgId}).exec(function(err, msg){
        if(err) res.json(err)
        res.json({msg:msg});    
    });
}

exports.list_msg_data = function(req, res){
    Promise.all([message.find(), symbols.find()]).then(function(v){
        let msg = v[0], sym = v[1];
        let currenries = msg.map((ob)=>{return ob.currencyTo}).filter((e, i, s)=>{ return i == s.indexOf(e)});
        let boughtCurrencies = currenries.map((b)=>{
            let sum  = msg.reduce((pre, e)=>{
                return (e.currencyTo == b) ? pre + e.amountBuy : pre;
            }, 0);
            let hex = sym.filter(function(s){if(b == s.currency) return s});
            
            return {currency:b, amount:sum, hex:hex[0].hex, abreviation: b.substr(0, 2).toLowerCase()}
        });
        
        res.json({
            boughtCurrencies
        });
    });
};

exports.list_users = function(req, res){
    user.find().exec(function(err, u){
        if(err) res.json(err)
        res.json({users:u})
    });
}
exports.auth = function(req, res){
    user.findOne({name:req.body.name}).exec(function(err, user){
        if (err) throw err;
        
        if(!user) res.json({success:false, msg:"Authentication failed. User not found."})
        else if(user.pass !== req.body.pass) res.json({success:false, msg:"Authentication failed. Wrong pass."});

        let tk = jwt.sign(user, 'lol');
        res.json({
          success: true,
          message: 'Authentication Succeed',
          token: tk
        });
    });
}
