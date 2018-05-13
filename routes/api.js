import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

router.get('/users', (req, res, next) => {
    userModel.find((err, data) => {
        if (err) {
            return console.log(err);
        }
        res.send({
            data: data,
            status: 200,
            statistic: {
                count: data.length
            }
        });
    });
});

export default router;
