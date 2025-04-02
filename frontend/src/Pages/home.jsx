// home.jsx
import React, { useState, useEffect } from "react";
import { UserBox } from "../component/UserBox";
import Footer from '../component/footer';
import styled from "styled-components";

const Home = () => {
    const [users, setUsers] = useState([]);
    const currentUserId = 1; // ID de l'utilisateur connecté, tu peux le récupérer de manière dynamique

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
            {users.map(user => (
                <UserBox key={user.id} user={user} currentUserId={currentUserId} />
            ))}
            <Footer />
        </StyledHomePage>
    );
};

export default Home;  // Vérifie que tu exportes ton composant par défaut

const StyledHomePage = styled.div`
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    min-height: 100dvh;
    width: 100vw;
    overflow: hidden;
`;