import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import type { clientResponse } from './utils/myTypes.ts';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import cookieParser from 'cookie-parser'

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

mongoose
  .connect('mongodb://localhost/thescreenshotcompany')
  .then(() => console.log('connected to db'))
  .catch(() => console.error('cannot connect to the db'));

app.get('/', (req: Request, res: Response) => {
  const clientRes: clientResponse = {
    message: 'hello world welcome to theScreenshotCompany',
    mission: 'success',
  };
  res.json(clientRes);
});

app.use(userRoute)

const port = process.env.PORT;

if (port) {
  app.listen(port, () => console.log(`server listing on port ${port}`));
} else {
  console.error('port not found');
}
