import '../db';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import routes from '../routes';

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
app.use(routes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => { console.log(`Server started at ${PORT}`); });
export default app;
