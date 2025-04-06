import express from 'express';
const ROUTER = express.Router();
import * as trailController from '../controllers/trails-controller.js';

ROUTER.get('', trailController.getTrailCDT);
ROUTER.get('/', trailController.getTrailCDT);

ROUTER.get('/arcGIS',trailController.getArcGISData);

export default ROUTER;