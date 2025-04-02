import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../component/footer";

export function ConversationsList() {
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

    return (
        <div>
            <h2>Conversations</h2>
            {conversations.length === 0 ? (
                <p>Aucune conversation disponible.</p>
            ) : (
                conversations.map(conv => (
                    <Link key={conv.id} to={`/chat/${conv.id}`}>
                        <div className="conversation-box">
                            <img src={conv.profile_picture || "/default.jpg"} alt="Profile" width="50" />
                            <p>{conv.username}</p>
                        </div>
                    </Link>
                ))
            )}
            <Footer />
        </div>
    );
}
