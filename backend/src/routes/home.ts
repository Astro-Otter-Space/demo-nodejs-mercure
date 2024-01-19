import { Router, Request, Response } from 'express';
const router: Router = Router(); //express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('Hello Mercure API')
});

export default router;
