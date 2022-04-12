import express from 'express';
import { cleanOU, postCleanOU } from './cleanOuCode';

const router = express.Router();
router.get('/cleaning', cleanOU, postCleanOU);

export default { router };
