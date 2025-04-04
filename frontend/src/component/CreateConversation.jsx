import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom'

export function CreateConversation({ otherUserId }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const navigate = useNavigate();

    const createConversation = async () => {
        // Récupère l'ID utilisateur depuis le localStorage
        const userId = localStorage.getItem('userID');

        if (!userId) {
            setError("Utilisateur non connecté.");
            return;
        }

        const response = await fetch("http://localhost/musician-api/create_conversation.php", {
            method: "POST",
            body: JSON.stringify({ user1_id: userId, user2_id: otherUserId }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (data.success) {
            setSuccess("Conversation créée avec succès !");
            setError(null);

            navigate(`/conversations`);
        } else {
            setError(data.message);
            setSuccess(null);
        }
    };

    return (
        <StyledCreateConv>
            <button onClick={createConversation}>Démarrer une conversation</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: '#50C878' }}>{success}</p>}
        </StyledCreateConv>
    );
}

const StyledCreateConv = styled.div`
    margin: auto;
    margin-bottom: 10px;

    button {
        background-color: #1c3d5a;
    }

    p {
        text-align: center;
    }
`;