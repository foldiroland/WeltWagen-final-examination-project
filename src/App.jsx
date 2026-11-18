
import './App.css';
import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            
            <Route element={<ProtectedRoute />}>
                
            </Route>
        </Routes>
    );
}

export default App;
