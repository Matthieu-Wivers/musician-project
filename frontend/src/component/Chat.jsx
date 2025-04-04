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
                    <div
                    key={i} 
                    className={msg.sender_id == userId ? "message sent" : "message received"}
                    >
                    <p>
                        {msg.content}
                    </p>
                    </div>
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

    a {
        color: white;
        font-size: 40px;
    }

    .input-container {
        position: fixed;
        bottom: 40px;
        display: flex;
        width: 100%;

        &>input {
            width: 90%;
            background: #A0D8FF;
            outline: none;
            border: none;
            padding: 10px 0;
            border-radius: 20px;
            margin: auto;
        }
    }

    .received {
        display: flex;
        margin-bottom: 5px;

        &>p {
            background-color: #5DADEC;
            border-radius: 0 20px 20px 0;
        }
    }

    .sent {
        display: flex;
        margin-bottom: 5px;

        &>p {
            margin-left: auto;
            background-color: #2179B5;
            border-radius: 20px 0 0 20px;
        }
    }

    p {
        margin: 0;
        padding: 5px 10px;
        max-width: 80%;
        font-size: 15px;
        font-weight: bolder;
    }
`;