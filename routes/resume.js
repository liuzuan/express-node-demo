import express from 'express';
import Msg from '../controller/resume/message';

const router = express.Router();

router.get('/message', Msg.getMessage);
router.post('/message', Msg.postMessage);
router.delete('/message', Msg.delMessage);

export default router;