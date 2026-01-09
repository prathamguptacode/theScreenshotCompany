import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://172.20.10.7:5173', 'https://screenshotcompany.onrender.com'],
    credentials: true
}));
app.use(cookieParser());
if (process.env.DATABASE_URL) {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => console.log('connected to db'))
        .catch(() => console.error('cannot connect to the db'));
}
else {
    console.error('db url not found');
}
app.get('/', (req, res) => {
    const clientRes = {
        message: 'hello world welcome to Screenshot Company',
        mission: 'success',
    };
    res.json(clientRes);
});
app.use(userRoute);
const port = process.env.PORT;
if (port) {
    app.listen(port, () => console.log(`server listing on port ${port}`));
}
else {
    console.error('port not found');
}
//# sourceMappingURL=server.js.map