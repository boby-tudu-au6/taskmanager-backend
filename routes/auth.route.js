import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';

const router = Router();


router.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      return res.status(400).json({ data: 'username already in use' });
    }
    await User.create(req.body);
    return res.status(201).json({ message: 'user registration complete' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne(req.body);
    if (user) {
      const token = jwt.sign({ user }, 'secret');
      return res.status(200).json({ token, user });
    }
    return res.status(401).json({ error: 'unauthorized' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.post('/check', async (req, res) => {
  try {
    const { token } = req.headers;
    const decoded = jwt.verify(token, 'secret');
    return res.status(200).json({ token, user: decoded.user });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


export default router;
