import express from 'express';
const router = express.Router();
import * as trailController from '../controllers/trailsController.js';

router.get('/AT', trailController.getTrailAT);
router.get('/CDT', trailController.getTrailCDT);
router.get('/PCT', trailController.getTrailPCT);
router.get('/lighterPackData',trailController.getLighterPackData);
router.get('/fitbitData',trailController.getFitBitData);
router.get('/instagramData',trailController.getInstagramData);
router.get('/blogData',trailController.getBlogData);
 
export default router;
