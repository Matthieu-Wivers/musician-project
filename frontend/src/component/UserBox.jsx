import { useState } from "react";
import { CreateConversation } from "./CreateConversation";

export function UserBox({ user, currentUserId }) {
    const [showButton, setShowButton] = useState(false);

    const handleClick = () => {
        setShowButton(true);
    };

    return (
        <div className="user-box" onClick={handleClick}>
            <img src={user.profile_picture || "/default-avatar.png"} alt="Profile" width="100" />
            <h2>{user.first_name} {user.last_name}</h2>
            <p><strong>Catégorie:</strong> {user.category || "Non renseignée"}</p>
            {showButton && (
                <CreateConversation userId={currentUserId} otherUserId={user.id} />
            )}
        </div>
    );
}
