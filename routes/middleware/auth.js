import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.use(async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
