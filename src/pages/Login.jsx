
import { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.png';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Űrlapmezők kezelése
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Bejelentkezés
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Sikertelen bejelentkezés!');
            }

            // Token és felhasználói adatok mentése
            login(data.token, data.user);

            navigate('/');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Logo" width="200px" />
            <h1>WeltWagen</h1>
            <h2>Bejelentkezés</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail-cím"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Jelszó"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Bejelentkezés...' : 'Bejelentkezés'}
                </button>
            </form>

            <p>
                Még nincs fiókod? <Link to="/register">Regisztráció</Link>
            </p>
        </div>
    );
}

export default Login;
