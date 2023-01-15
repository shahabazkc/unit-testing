import * as express from 'express'
import controller from './controller';

const router = express.Router();

router.post('/create-user', controller.createUser);

export default router