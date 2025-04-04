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
            <div className="insideCard">
                <img src={`http://localhost/musician-api/${user.profile_picture}`} alt="Profile"/>
                <div>
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p><strong>Catégories</strong></p>
                </div>
            </div>
            <p className="categories">{user.category || "Non renseignée"}</p>
            {showButton && (
                <CreateConversation userId={currentUserId} otherUserId={user.id} />
            )}
        </StyledUserBox>
    );
}

const StyledUserBox = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #2179B5;
    margin: 10px;
    border-radius: 15px;

    .insideCard {
        display: flex;
        flex-direction: row;
    }

    img {
        width: 57px;
        height: 57px;
        padding: 10px;
        border-radius: 50%;
    }

    h2 {
        font-size: 20px;
        margin: 0;
        margin-top: 10px;
    }

    p {
        margin: 0;
    }

    .categories {
        padding: 0 10px 10px 10px;
    }
`;