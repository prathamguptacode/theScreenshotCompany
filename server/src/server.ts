import express from 'express';
import type { Request, Response } from 'express';
import envSetup from 'dotenv';
import cors from 'cors';
import type { clientResponse } from './utils/myTypes.js';
import mongoose from 'mongoose';

envSetup.config();
const app = express();
app.use(express.json());
app.use(cors());

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

const port = process.env.PORT;

if (port) {
  app.listen(port, () => console.log(`server listing on port ${port}`));
} else {
  console.error('port not found');
}
