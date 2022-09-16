import { Router } from 'express';
import tourController from '@controllers/tour.controller';

const router: Router = Router();

router.get('/', tourController.getTourInfo); // 여행지 정보 받아오기

export default router;
