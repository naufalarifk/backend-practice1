'use strict'
import express from 'express'

const app = express();

var users = [
    { id: 0, name: 'tj', email: 'tj@vision-media.ca', role: 'member' }
    , { id: 1, name: 'ciaran', email: 'ciaranj@gmail.com', role: 'member' }
    , { id: 2, name: 'aaron', email: 'aaron.heckmann+github@gmail.com', role: 'admin' }
];


function loadUser(req, res, next) {
    const user = users[req.params.id];
    if (user) {
        req.user = user
        next()
    } else {
        next(new Error('Failed to load user ' + req.params.id))
    }
}


function andRestrictTo(role) {
    return function (req, res, next) {
        if (req.authenticatedUser.role === role) {
            next();
        } else {
            next(new Error('Unauthorized'));
        }
    }
}


app.use(function (req, res, next) {
    req.authenticatedUser = users[0];
    next();
});


app.get('/', function (req, res) {
    res.redirect('/user/0');
});

app.get('/user/:id', loadUser, function (req, res) {
    res.send('Viewing user ' + req.user.name);
});

app.get('/user/:id/edit', loadUser, andRestrictToSelf, function (req, res) {
    res.send('Editing user ' + req.user.name);
});

app.delete('/user/:id', loadUser, andRestrictTo('admin'), function (req, res) {
    res.send('Deleted user ' + req.user.name);
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express started on port 3000');
}