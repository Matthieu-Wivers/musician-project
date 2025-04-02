import { useState } from "react";

export function CreateConversation({ otherUserId }) {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

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
        } else {
            setError(data.message);
            setSuccess(null);
        }
    };

    return (
        <div>
            <button onClick={createConversation}>Démarrer une conversation</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
}
