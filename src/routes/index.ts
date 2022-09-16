import { Router } from 'express';
import tourRouter from '@routes/tour.router';
const router: Router = Router();

router.use('/tour', tourRouter);

export default router;
