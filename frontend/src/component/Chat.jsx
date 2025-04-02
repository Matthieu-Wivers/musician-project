import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Chat({ userId }) {
    const { conversationId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        fetch(`http://localhost/musician-api/get_messages.php?conversation_id=${conversationId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) setMessages(data.messages);
            })
            .catch(err => console.error("Erreur:", err));
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
        }).then(() => {
            setMessages([...messages, { sender_id: userId, content: newMessage }]);
            setNewMessage("");
        });
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, i) => <p key={i}>{msg.content}</p>)}
            </div>
            <input value={newMessage} onChange={e => setNewMessage(e.target.value)} />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
}
