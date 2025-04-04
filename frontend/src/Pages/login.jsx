import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';

export function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Declare the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the fields are filled out
        if (!usernameOrEmail || !password) {
            setMessage('Please enter a username or email and a password');
            return;
        }

        const response = await fetch('http://localhost/musician-api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username_or_email: usernameOrEmail,
                password,
            }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (data.success) {
            localStorage.setItem('authToken', data.token); // Store the token
            localStorage.setItem('username', data.user.username);
            localStorage.setItem('userID', data.user.id);

            // If login is successful, redirect to the /home page
            navigate(`/`); // This will redirect to the "Home" page
        }
    };

    useEffect(() => {
        fetch("http://localhost/musician-api/get_users.php")
            .then(res => res.json())
            .then(data => {
                if (data.success) setUsers(data.users);
            })
            .catch(err => console.error("Erreur:", err));
    }, []);

    return (
        <StyledLoginBox>
            <h1>NOTABENE</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username or Email" 
                    value={usernameOrEmail} 
                    onChange={(e) => setUsernameOrEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <div className="separator">OR</div>
            <Link to="/Register">
                <button>Sign-Up</button>
            </Link>

            <div className="background-circles"></div>
            <div className="background-circles small"></div>
        </StyledLoginBox>
    );
}

const StyledLoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    width: 100vw;
    overflow: hidden;
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    font-family: Arial, sans-serif;
    position: relative;
    text-align: center;

    h1 {
        color: white;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 70%;
        max-width: 300px;
    }

    input {
        padding: 12px;
        margin: 8px 0;
        border-radius: 15px;
        width: 100%;
        font-size: 1rem;
        background: #FFFFFF21;
        border: 1px solid #FFF;
        color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }

    button {
        background-color: #FF6B81;
        color: white;
        border: none;
        padding: 12px;
        border-radius: 15px;
        font-size: 1rem;
        margin-top: 10px;
        cursor: pointer;
        transition: 0.3s;
        width: 100%;
    }

    a>button {
        width: 100%;
    }

    input::placeholder {
        color: #fff;
    }

    .separator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80%;
        margin: 15px 0;
        color: white;
    }

    .separator::before,
    .separator::after {
        content: "";
        flex: 1;
        height: 1px;
        background: white;
        margin: 0 10px;
    }

    /* Cercles décoratifs */
    .background-circles {
        position: absolute;
        bottom: -80px;
        right: -60px;
        width: 234px;
        height: 234px;
        background-color: #5DADEC;
        border-radius: 50%;
        z-index: 1;
    }

    .background-circles.small {
        width: 176px;
        height: 176px;
        right: -80px;
        bottom: 50px;
        background-color: #A0D8FF;
        z-index: 0;
    }
`;
