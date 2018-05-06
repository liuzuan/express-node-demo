import express from 'express';
import resumeModel from '../models/resumeModel.js';

const router = express.Router();

router.get('/message', (req, res, next) => {
    resumeModel.find((err, data) => {
        if (err) {
            return console.log(err)
        }
        res.send({
            'data': data,
            'statistic': {
                'count': data.length
            }
        })

    })
})
router.post('/message', (req, res, next) => {
    let newMessage = new resumeModel({
        username: req.body.username,
        message: req.body.message,
        time: req.body.time
    })
    newMessage.save((err, data) => {
        if (err) {
            return console.log(err)
        }
        res.send({
            'status': 200,
            'message': '添加留言成功！'
        });
    })
})

export default router;