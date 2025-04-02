import { useState } from "react";
import { CreateConversation } from "./CreateConversation";
import styled from "styled-components";

export function UserBox({ user, currentUserId }) {
    const [showButton, setShowButton] = useState(false);

    const handleClick = () => {
        setShowButton(true);
    };

    return (
        <StyledUserBox className="user-box" onClick={handleClick}>
            <img src={user.profile_picture || "/default-avatar.png"} alt="Profile"/>
            <h2>{user.first_name} {user.last_name}</h2>
            <p><strong>Catégorie:</strong> {user.category || "Non renseignée"}</p>
            {showButton && (
                <CreateConversation userId={currentUserId} otherUserId={user.id} />
            )}
        </StyledUserBox>
    );
}

const StyledUserBox = styled.div`
display: flex;

img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
`;