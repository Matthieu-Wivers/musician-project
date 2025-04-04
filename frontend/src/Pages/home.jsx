// home.jsx
import React, { useState, useEffect } from "react";
import { UserBox } from "../component/UserBox";
import Footer from '../component/footer';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [users, setUsers] = useState([]);
    const currentUserId = 1; // ID de l'utilisateur connecté, tu peux le récupérer de manière dynamique

    const navigate = useNavigate();

    // Vérifier l'authentification uniquement une fois, pas dans les hooks
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken'); // Adjust this based on your auth logic
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetch("http://localhost/musician-api/get_users.php")
            .then(res => res.json())
            .then(data => {
                if (data.success) setUsers(data.users);
            })
            .catch(err => console.error("Erreur:", err));
    }, []);

    return (
        <StyledHomePage>
            <h1>NOTABENE</h1>
            <div className="boxUsers">
                {users.map(user => (
                    <UserBox key={user.id} user={user} currentUserId={currentUserId} />
                ))}
            </div>
            <Footer />
        </StyledHomePage>
    );
};

export default Home;  // Vérifie que tu exportes ton composant par défaut

const StyledHomePage = styled.div`
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    min-height: 100dvh;
    width: 100vw;
    overflow: scroll;

    h1 {
        text-align: center;
    }

    .boxUsers {
        margin-bottom: 70px;
    }
`;