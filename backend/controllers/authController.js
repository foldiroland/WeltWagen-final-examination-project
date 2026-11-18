import db from '../db/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// user registration
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: 'Minden mező kitöltése kötelező!'
            });
        }

        const [existingUsers] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: 'Ezzel az e-mail-címmel már regisztráltak!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const [result] = await db.query(
            `INSERT INTO users (name, email, password)
             VALUES (?, ?, ?)`,
            [name, email, hashedPassword]
        );
        return res.status(201).json({
            message: 'Sikeres regisztráció!',
            user: {
                id: result.insertId,
                name,
                email,
                role: 'customer'
            }
        });

    } catch (error) {
        console.error('Regisztrációs hiba:', error);

        return res.status(500).json({
            message: 'Szerverhiba történt a regisztráció során!'
        });
    }
};

// user login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Az e-mail-cím és a jelszó megadása kötelező!'
            });
        }

        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: 'Hibás e-mail-cím vagy jelszó!'
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Hibás e-mail-cím vagy jelszó!'
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '1d'
            }
        );

        return res.status(200).json({
            message: 'Sikeres bejelentkezés!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Bejelentkezési hiba:', error);

        return res.status(500).json({
            message: 'Szerverhiba történt a bejelentkezés során!'
        });
    }
};