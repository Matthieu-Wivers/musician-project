// Import necessary libraries and components
import { useEffect, useState } from "react";  // React hooks for managing state and side effects
import { useParams } from "react-router-dom";  // Hook to access route parameters
import { Link } from "react-router-dom";  // Component for navigation between pages
import styled from "styled-components";  // Styled-components for CSS-in-JS

// The main Chat component
export function Chat() {
    // Get the conversation ID from the URL parameters
    const { conversationId } = useParams();
    // State for storing the list of messages
    const [messages, setMessages] = useState([]);
    // State for managing the new message being typed
    const [newMessage, setNewMessage] = useState("");

    // Retrieve the user ID from the local storage
    const userId = localStorage.getItem("userID");

    // Fetch the messages when the component is mounted or the conversation ID changes
    useEffect(() => {
        fetch(`http://localhost/musician-api/get_messages.php?conversation_id=${conversationId}`)
            .then(res => res.json())  // Parse the response as JSON
            .then(data => {
                if (data.success) setMessages(data.messages);  // If successful, update messages state
            });
    }, [conversationId]);  // Dependency array: re-run when conversationId changes

    // Function to send a message
    const sendMessage = () => {
        // Send a POST request to send the new message
        fetch("http://localhost/musician-api/send_message.php", {
            method: "POST",
            body: JSON.stringify({
                conversation_id: conversationId,
                sender_id: userId,
                content: newMessage,
            }),
            headers: { "Content-Type": "application/json" },
        })
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {
            if (data.success) {
                // If successful, update the messages state and reset the input field
                setMessages([...messages, { sender_id: userId, content: newMessage }]);
                setNewMessage("");  // Reset the message input field
            }
        });
    };

    return (
        <StyledChat className="chat-container">
            {/* Link to go back to conversations */}
            <Link to="/conversations">⬅</Link>
            <h2>Chat</h2>
            {/* Display the list of messages */}
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
            {/* Input field and button to send a message */}
            <div className="input-container">
                <input 
                    value={newMessage} 
                    onChange={e => setNewMessage(e.target.value)} 
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </StyledChat>
    );
}

// Styled-component for the chat container and its elements
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
