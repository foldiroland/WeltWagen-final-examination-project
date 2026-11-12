import express from 'express';
import db from '../db/db.js';
const router = express.Router();

// login
router.post('/', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó!' });
        }
        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);    
           
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó!' });
        }
        res.status(200).json({
            message: 'Sikeres bejelentkezés!',
            user: { id: user.id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({error: "Internal server error."})
    }

});


export default router;