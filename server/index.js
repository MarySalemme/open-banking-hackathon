var express = require('express');
var fetch = require('node-fetch');
var FormData = require('form-data');
var cors = require('cors');
var config = require('../src/config');

var app = express();
app.use(cors())
app.use(express.static(__dirname + '/public'));

app.post('/token', function (req, tokenRes) {
    // req code
    const code = req.query.code;
    console.log('code is ', code)
    var form = new FormData();
    form.append('grant_type', "authorization_code");
    form.append('client_id', config.CLIENT_ID);
    form.append('client_secret', config.CLIENT_SECRET);
    form.append('redirect_uri', config.REDIRECT_URI);
    form.append('code', code);

    fetch('https://auth.truelayer.com/connect/token', { method: 'POST', body: form })
    .then(function(res) {
        return res.json()
    })
    .then(function(token){
        console.log('are we here with a token?', token)

        return tokenRes.status(200).json(token);

    }).catch(function(e){
        res.status(500)
        res.send(e)
        console.log('error', e)
    })


    // res send back the token
});

app.get('/accounts', function (req, accountsRes) {

    fetch("https://api.truelayer.com/data/v1/accounts", {method: 'GET', headers: {Authorization: req.header('Authorization')}})
    .then(function(res) {
        if(res.ok){
            return res.json();

        } else {
            throw new Error('there was an error')
        }
        
    })
    .then(function(accounts){
        return accountsRes.status(200).json(accounts);

    }).catch(function(e){
        accountsRes.sendStatus(500)
        console.log('error', e)
    })
});

app.get('/transactions/:account_id', function (req, transactionsRes) {

    fetch(`https://api.truelayer.com/data/v1/accounts/${req.params.account_id}/transactions?from=2017-01-01&to=2018-01-01`, {method: 'GET', headers: {Authorization: req.header('Authorization')}})
    .then(function(res) {
        if(res.ok){
            return res.json();

        } else {
            throw new Error('there was an error')
        }
        
    })
    .then(function(transactions){
        return transactionsRes.status(200).json(transactions);

    }).catch(function(e){
        transactionsRes.sendStatus(500)
        console.log('error', e)
    })
});

app.listen(3001, function () {
  console.log('social server running');
});
