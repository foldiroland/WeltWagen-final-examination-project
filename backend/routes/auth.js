
import express from 'express';
import { register } from '../controllers/authController.js';
import {
    authenticateToken,
    authorizeRoles
} from '../middleware/authmiddleware.js';

const router = express.Router();

// register
router.post('/register', register);
// for logged in users
router.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Sikeres hozzáférés!',
        user: req.user
    });
});

// for admins and dealers
router.get(
    '/dealer',
    authenticateToken,
    authorizeRoles('dealer', 'admin'),
    (req, res) => {
        res.json({
            message: 'Üdvözlünk a kereskedői felületen!'
        });
    }
);

// for admins
router.get(
    '/admin',
    authenticateToken,
    authorizeRoles('admin'),
    (req, res) => {
        res.json({
            message: 'Üdvözlünk az adminisztrációs felületen!'
        });
    }
);

export default router;
