import resumeModel from '../../models/resumeModel';

class Message {
  constructor() {}

  async getMessage(req, res, next) {
    let { page, pageSize } = req.query;
    const total = await resumeModel.find().count();
    let data = await resumeModel
      .find()
      .sort({ time: -1 })
      .limit(Number(pageSize))
      .skip(Number((page - 1) * pageSize))
      .exec((err, data) => {
        if (err) {
          res.send({
            status: 0,
            type: 'GET_DATA_ERROR',
            desc: '获取留言数据失败'
          });
          return console.log(err);
        }
        res.send({
          data: data,
          statistic: { count: total }
        });
      });
  }

  async postMessage(req, res, next) {
    let newMessage = new resumeModel({
      username: req.body.username,
      message: req.body.message,
      time: req.body.time
    });
    await newMessage.save((err, data) => {
      if (err) {
        return console.log(err);
      }
      res.send({
        desc: '添加留言成功！'
      });
    });
  }

  async delMessage(req, res, next) {
    await resumeModel.remove(
      {
        _id: req.query._id
      },
      (err, data) => {
        if (err) {
          return console.log(err);
        }
        res.send({
          desc: '删除留言成功！'
        });
      }
    );
  }
}
export default new Message();
