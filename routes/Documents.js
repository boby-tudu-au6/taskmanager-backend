// import { Router } from 'express';
// import multer from 'multer';
// import AWS from 'aws-sdk';
// import jwt from 'jsonwebtoken';
// import { User } from '../../modal';
// // AWS.config.update({region: 'us-west-2'});
// // import upload from '../fileUpload/multer/multer'

// const s3 = new AWS.S3();
// const upload = multer();
// const router = Router({ mergeParams: true });
// const uploadParams = {
//   Bucket: 'bobytest',
//   Key: '',
//   Body: '',
//   ACL: 'public-read',
//   ContentEncoding: '',
//   ContentType: '',
// };

// router.post('/uploadimg', upload.array('img'), async (req, res) => {
//   try {
//     const {
//       originalname, buffer, encoding, mimetype,
//     } = req.files[0];
//     const { token } = req.headers;
//     const { type } = req.body;
//     const decoded = jwt.verify(token, 'secret');
//     const user = await User.findOne({ _id: decoded.userid });
//     s3.upload({
//       ...uploadParams,
//       Key: `${user._id}_${type}`,
//       Body: buffer,
//       ContentEncoding: encoding,
//       ContentType: mimetype,
//     }, async (err, data) => {
//       if (err) return res.status(400).json({ error: err });
//       if (data) {
//         await User.updateOne({ _id: user._id }, { [type]: data.Location });
//         return res.status(200).json({ img: data.Location });
//       }
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// router.get('/get-my-docs', async (req, res) => {
//   try {
//     const { token } = req.headers;
//     const { _id } = req.query;
//     if (token) {
//       const decoded = jwt.verify(token, 'secret');
//       const user = await User.findOne({ _id: decoded.userid });
//       return res.status(200).json({
//         doc10: user.doc10,
//         doc12: user.doc12,
//         docGrad: user.docGrad,
//         adhaarF: user.adhaarF,
//         adhaarB: user.adhaarB,
//         profilePic: user.profilePic,
//       });
//     }
//     const user = await User.findOne({ _id });
//     return res.status(200).json({
//       doc10: user.doc10,
//       doc12: user.doc12,
//       docGrad: user.docGrad,
//       adhaarF: user.adhaarF,
//       adhaarB: user.adhaarB,
//     });
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });


// export default router;
