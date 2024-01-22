/**
 * @openapi
 * /:
 *   get:
 *     summary: Home page
 *     description: Home page, check health
 *     response:
 *       200:
 *         description: Success
 */
import { Router, Request, Response } from 'express';
const router: Router = Router(); //express.Router();

router.get('/', (req: Request, res: Response): void => {
  res.send('Hello Mercure API')
});

export default router;
