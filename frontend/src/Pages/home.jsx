// home.jsx
import React, { useState, useEffect } from "react";
import { UserBox } from "../component/UserBox";
import Footer from '../component/footer';

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
        <div>
            {users.map(user => (
                <UserBox key={user.id} user={user} currentUserId={currentUserId} />
            ))}
            <Footer />
        </div>
    );
};

export default Home;  // Vérifie que tu exportes ton composant par défaut
