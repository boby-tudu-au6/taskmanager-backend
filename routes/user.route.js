import { Router } from 'express';
import { User } from '../models';

const router = Router();

router.get('/all', async (req, res) => {
  try {
    const data = await User.find();
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


export default router;
