import './Register.css'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import logo from '../assets/logo.jpg';

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
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

    // Regisztráció elküldése
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setLoading(true);

        try {
            const response = await fetch(
                'http://localhost:5000/api/auth/register',
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
                throw new Error(data.message || 'Sikertelen regisztráció!');
            }

            alert('Sikeres regisztráció! Most már bejelentkezhetsz.');
            navigate('/login');

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <img src={logo} alt="Logo" width="200px" />
            <h1>WeltWagen</h1>
            <h2>Regisztráció</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Teljes név"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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
                    minLength={8}
                    required
                />

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Regisztráció...' : 'Regisztráció'}
                </button>
            </form>

            <p>
                Már van fiókod? <Link to="/login">Bejelentkezés</Link>
            </p>
        </div>
    );
}

export default Register;
