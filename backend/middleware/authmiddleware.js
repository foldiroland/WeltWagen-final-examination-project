
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Nincs bejelentkezve!'
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({
                message: 'Érvénytelen vagy lejárt token!'
            });
        }

        req.user = user;
        next();
    });
};

// roles
export const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Nincs jogosultságod ehhez a művelethez!'
            });
        }

        next();
    };
};
