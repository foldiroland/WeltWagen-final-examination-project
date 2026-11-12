import express from 'express';
import dotenv from 'dotenv';
import db from './db/db.js';
import loginRouter from './routes/login.js'


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// utvonalak
app.use('/api/login', loginRouter)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})