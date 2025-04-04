import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/footer";
import styled from "styled-components";

export function ConversationsList({user}) {
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userID');
        const username = localStorage.getItem('username'); // Récupère le nom d'utilisateur depuis le localStorage

        if (!userId || !username) {
            console.error("ID utilisateur ou nom d'utilisateur non défini !");
            return;
        }

        // Appel à l'API pour récupérer les conversations
        fetch(`http://localhost/musician-api/get_conversations.php?user_id=${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Filtrer les conversations pour ne pas afficher celles avec soi-même
                    const filteredConversations = data.conversations.filter(conv => 
                        conv.user1_id !== userId && conv.user2_id !== userId &&
                        // Ne pas afficher une conversation si le nom d'utilisateur correspond
                        conv.username !== username
                    );
                    setConversations(filteredConversations);
                }
            })
            .catch(err => console.error("Erreur:", err));
    }, []);

    const navigate = useNavigate();

    // Vérifier l'authentification uniquement une fois, pas dans les hooks
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken'); // Adjust this based on your auth logic
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <StyledConv>
            <h2>Conversations</h2>
            {conversations.length === 0 ? (
                <p>Aucune conversation disponible.</p>
            ) : (
                conversations.map(conv => (
                    <Link key={conv.id} to={`/chat/${conv.id}`}>
                        <div className="conversation-box">
                            <img src={`http://localhost/musician-api/default.jpg`} className="profilePicture" alt="Profile" width="50" height="50" />
                            <p>{conv.username}</p>
                        </div>
                    </Link>
                ))
            )}
            <Footer />
        </StyledConv>
    );
}

const StyledConv = styled.div`
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    min-height: 100dvh;
    width: 100vw;
    overflow: hidden;

    .profilePicture {
        border-radius: 50%;
    }

    .conversation-box {
        display: flex;
        gap: 10px;
    }

    p {
        color: white;
    }
`;