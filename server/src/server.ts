import express from 'express';
import type { Request, Response } from 'express';
import envSetup from 'dotenv';
import cors from 'cors';
import type { clientResponse } from './utils/myTypes.ts';
import mongoose from 'mongoose';
import userData from './routes/userRoute.js'
import cookieParser from 'cookie-parser'

envSetup.config();
const app = express();
app.use(express.json());
app.use(cors());
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

app.use(userData)

const port = process.env.PORT;

if (port) {
  app.listen(port, () => console.log(`server listing on port ${port}`));
} else {
  console.error('port not found');
}
