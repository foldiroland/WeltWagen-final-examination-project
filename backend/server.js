
import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import {
    register,
    login
} from './controllers/authController.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5713;
const router = express.Router();

app.use(express.json());

// API routes
app.use('/api/auth', authRouter);
// register
router.post('/register', register);
// login
router.post('/login', login);

// default route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to WeltWagen API!'
    });
});

// server
app.listen(port, () => {
    console.log(`WeltWagen API running on http://localhost:${port}`);
});
