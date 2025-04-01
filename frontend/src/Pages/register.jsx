import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the passwords match before sending the request
        if (password !== passwordConfirm) {
            setMessage('Passwords do not match');
            return;
        }

        const response = await fetch('http://localhost/musician-api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                password_confirm: passwordConfirm
            }),
        });

        const data = await response.json();
        setMessage(data.message);

        if (data.success) {
            // If the registration is successful, you can redirect the user or do something else
            navigate('/login');
        }
    };

    return (
        <StyledRegisterBox>
            <div id="header">
                <Link to="/login">⬅</Link>
                <h1>NOTABENE</h1>
                <p></p>
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={passwordConfirm} 
                    onChange={(e) => setPasswordConfirm(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <div className="background-circles"></div>
            <div className="background-circles small"></div>
        </StyledRegisterBox>
    );
}  

const StyledRegisterBox = styled.div `
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
        width: 80%;
        max-width: 300px;
    }

    input {
        padding: 12px;
        margin: 8px 0;
        border-radius: 15px;
        width: 100%;
        font-size: 1rem;
        text-align: center;
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

    #header {
        display: flex;
        align-items: center;

        &>a {
            padding-bottom: 15px;
        }
    }

    a {
        color: white;
        font-size: 30px;
    }

    input::placeholder {
        color: #fff;
    }

    .separator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
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