import express from 'express';

import { addTimelog } from '../controllers/projects.js'; 

const router = express.Router();

router.post('/', addTimelog);
export default router;