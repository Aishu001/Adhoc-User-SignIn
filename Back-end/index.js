import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import bodyParser  from 'body-parser';
import { dataBaseConnection } from './dataBase.js';
import { userRouter } from './routes/user.js';

const PORT = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user',userRouter)
dataBaseConnection()



app.listen(PORT , () => {
    console.log(`Server is running in ${PORT}`);
})
