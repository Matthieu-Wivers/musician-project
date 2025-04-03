import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

export function Chat() {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // Récupérer l'ID utilisateur depuis le localStorage
    const userId = localStorage.getItem("userID");

    useEffect(() => {
        fetch(`http://localhost/musician-api/get_messages.php?conversation_id=${conversationId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMessages(data.messages);
            });
    }, [conversationId]);

    const sendMessage = () => {
        fetch("http://localhost/musician-api/send_message.php", {
            method: "POST",
            body: JSON.stringify({
                conversation_id: conversationId,
                sender_id: userId,
                content: newMessage,
            }),
            headers: { "Content-Type": "application/json" },
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                setMessages([...messages, { sender_id: userId, content: newMessage }]);
                setNewMessage("");
            }
        });
    };

    return (
        <StyledChat className="chat-container">
            <Link to="/conversations">⬅</Link>
            <h2>Chat</h2>
            <div className="messages-container">
                {messages.map((msg, i) => (
                    <p 
                        key={i} 
                        className={msg.sender_id == userId ? "message sent" : "message received"}
                    >
                        {msg.content}
                    </p>
                ))}
            </div>
            <div className="input-container">
                <input 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Tapez votre message..."
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </StyledChat>
    );
}

const StyledChat = styled.div`
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    min-height: 100dvh;
    width: 100vw;
    overflow: hidden;

    .sent {
        text-align: right;
    }
`;