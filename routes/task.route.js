import { Router } from 'express';
import multer from 'multer';
import AWS from 'aws-sdk';
import { Task } from '../models';

const s3 = new AWS.S3();
const upload = multer();
const router = Router({ mergeParams: true });
const uploadParams = {
  Bucket: 'bobytest',
  Key: '',
  Body: '',
  ACL: 'public-read',
  ContentEncoding: '',
  ContentType: '',
};

router.get('/', async (req, res) => {
  try {
    const data = await Task.find().populate('user').populate('assignedUser');
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

router.post('/', upload.array('data'), async (req, res) => {
  try {
    const { type } = req.body;
    if (type !== 'Text') {
      const {
        buffer, encoding, mimetype,
      } = req.files[0];
      // s.deleteObject(params).promise();
      // for delete object from s3 bucket;
      const { Location } = await s3.upload({
        ...uploadParams,
        Key: `${Date.now()}`,
        Body: buffer,
        ContentEncoding: encoding,
        ContentType: mimetype,
      }).promise();
      await Task.create({ ...req.body, data: Location });
      return res.status(201).json({ data: 'Task created successfully' });
    }
    await Task.create({ ...req.body });
    return res.status(201).json({ data: 'Task created successfully' });
  } catch (error) {
    return res.status(400).json({ data: error.message });
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { _id, status, assignedUser } = req.body;
    await Task.findOneAndUpdate({ _id }, { status, assignedUser });
    return res.status(200).json({ data: 'Task updated successfully' });
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

router.post('/delete', async (req, res) => {
  try {
    await Task.findOneAndUpdate({ _id: req.body._id }, { deleted: true });

    // if (task.type !== 'Text') {
    //   const arr = task.data.split('/');
    //   const params = {
    //     Bucket: 'bobytest',
    //     Key: arr[arr.length - 1],
    //   };
    //   await s3.deleteObject(params).promise();
    // }
    // await Task.findOneAndDelete({ _id: req.body._id });
    // await Comment.deleteMany({ task: req.body._id });
    return res.status(200).json({ data: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;


// s3.upload({
//   ...uploadParams,
//   Key: `${Date.now()}`,
//   Body: buffer,
//   ContentEncoding: encoding,
//   ContentType: mimetype,
// }, async (err, data) => {
//   if (err) return res.status(400).json({ data: err });
//   if (data) {
//     await Task.create({ ...req.body, data: data.Location });
//     return res.status(201).json({ data: 'Task created successfully' });
//   }
// });
