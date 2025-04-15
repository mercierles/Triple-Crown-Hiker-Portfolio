import express from 'express';
const ROUTER = express.Router();
import * as trailController from '../controllers/trails-controller.js';

ROUTER.get('/AT', trailController.getTrailAT);
ROUTER.get('/CDT', trailController.getTrailCDT);
ROUTER.get('/PCT', trailController.getTrailPCT);
ROUTER.get('/lighterPackData',trailController.getLighterPackData);
ROUTER.get('/fitbitData',trailController.getFitBitData);
ROUTER.get('/instagramData',trailController.getInstagramData);
ROUTER.get('/blogData',trailController.getBlogData);
ROUTER.get('/testData', trailController.getTestData);
 
export default ROUTER;
