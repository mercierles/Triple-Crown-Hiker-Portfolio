import express from 'express';
const router = express.Router();
import * as trailController from '../controllers/trailsController.js';

router.get('', trailController.getTrailCDT);
router.get('/', trailController.getTrailCDT);

router.get('/arcGIS',trailController.getArcGISData);

export default router;