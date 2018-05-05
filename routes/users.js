import express from 'express';
let router = express.Router();
import userModel from '../models/userModel.js';

router.get('/', (req, res, next) => {
    userModel.find((err, data) => {
        if (err) {
            return console.log(err)
        }
        res.render('userList', {
            user: data,
            title: 'list'
        })
    })
});

router.get('/add', (req, res, next) => {
    res.render('userAdd');
});

router.post('/add', (req, res, next) => {
    var newUser = new userModel({
        username: req.body.username,
        email: req.body.email
    })
    newUser.save((err, data) => {
        if (err) {
            return console.log(err)
        }
        res.redirect('/users/');
    })
});

router.get('/edit/:id', function (req, res, next) {
    var id = req.params.id;
    userModel.findOne({
        _id: id
    }, function (err, data) {
        res.render('userEdit', {
            user: data
        })
    })
});

router.post('/update', function (req, res, next) {
    var id = req.body.id;
    userModel.findById(id, function (err, data) {
        if (err) {
            return console.log(err);
        }
        data.username = req.body.username;
        data.email = req.body.email;
        data.save(function (err) {
            res.redirect('/users/');
        })
    })
});

router.delete('/del', (req, res) => {
    var id = req.query.id;
    userModel.remove({
        _id: id
    }, (err, data) => {
        if (err) {
            return console.log(err);
        }
        res.json({
            code: 200,
            msg: '删除成功'
        });
    })
})
module.exports = router;