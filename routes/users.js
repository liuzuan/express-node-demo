import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

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
    let newUser = new userModel({
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

router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;
    userModel.findOne({
        _id: id
    }, (err, data) => {
        res.render('userEdit', {
            user: data
        })
    })
});

router.post('/update', (req, res, next) => {
    var id = req.body.id;
    userModel.findById(id, (err, data) => {
        if (err) {
            return console.log(err);
        }
        data.username = req.body.username;
        data.email = req.body.email;
        data.save((err) => {
            res.redirect('/users/');
        })
    })
});

router.delete('/del', (req, res) => {
    let id = req.query.id;
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

export default router;