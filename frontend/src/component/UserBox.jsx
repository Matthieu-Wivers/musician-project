import styled from "styled-components";

const UserBox = ({ user }) => {
    return (
        <StyledBox>
            <img src={user.profile_picture || "/default-avatar.png"} alt="Profile" />
            <div>
                <h3>{user.first_name} {user.last_name}</h3>
                <p>{user.category || "Non renseigné"}</p>
            </div>
        </StyledBox>
    );
};

const StyledBox = styled.div`
    display: flex;
    align-items: center;
    background: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }

    img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 15px;
    }

    h3 {
        margin: 0;
        font-size: 18px;
        color: black;
    }

    p {
        margin: 0;
        color: gray;
    }
`;

export default UserBox;
