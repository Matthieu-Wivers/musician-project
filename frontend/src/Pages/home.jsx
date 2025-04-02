import { useEffect, useState } from "react";
import UserBox from "../component/UserBox";
import styled from "styled-components";
import Footer from "../component/footer";

export function Home() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost/musician-api/get_users.php");
                const data = await response.json();

                if (data.success) {
                    setUsers(data.users);
                } else {
                    setError("Impossible de charger les utilisateurs.");
                }
            } catch (error) {
                setError("Erreur lors du chargement.");
            }
        };

        fetchUsers();
    }, []);

    if (error) return <p>{error}</p>;
    if (users.length === 0) return <p>Chargement des utilisateurs...</p>;

    return (
        <StyledContainer>
            <h1>Liste des musiciens</h1>
            {users.map(user => (
                <UserBox key={user.id} user={user} />
            ))}
            <Footer />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    max-width: 600px;
    margin: auto;
    padding: 20px;
`;

export default Home;
