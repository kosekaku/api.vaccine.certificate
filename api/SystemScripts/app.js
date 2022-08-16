import express from 'express';
import { cleanOU, postCleanOU } from './cleanOuCode';
import { getUsers } from './getUsers';

const router = express.Router();
router.get('/cleaning', cleanOU, postCleanOU);
router.get('/users', getUsers);

export default { router };
