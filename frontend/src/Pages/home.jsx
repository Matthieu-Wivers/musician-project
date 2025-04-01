import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../component/footer';

export default function Home() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if the user is authenticated (example: check localStorage for a token)
        const isAuthenticated = localStorage.getItem('authToken'); // Adjust this based on your auth logic
        const storedUsername = localStorage.getItem('username');

        if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
            navigate('/login');
        } else {
            setUsername(storedUsername);
        }
    }, [navigate]); // Only rerun when the navigate function changes

    function logout() {
        localStorage.clear();
        location.reload();
    }

    return (
        <div>
            <h1>Welcome to the Home Page {username}</h1>
            <button onClick={logout}>Log out</button>
            <Footer />
        </div>
    );
}
