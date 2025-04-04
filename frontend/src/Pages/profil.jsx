import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../component/footer";
import styled from "styled-components";

export function Profile() {
    const { id } = useParams(); // Récupère l'ID de l'URL
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        category: "",
        email: "",
        password: "",
        bio: "",
        profile_picture: null, 
    });

    const navigate = useNavigate(); // Déclare `navigate` ici pour éviter de l'utiliser après des hooks

    // Vérifier l'authentification uniquement une fois, pas dans les hooks
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('authToken'); // Adjust this based on your auth logic
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate]);

    // Charger les informations du profil
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost/musician-api/profile.php?id=${id}`);
                const text = await response.text();
                console.log("Réponse brute:", text);

                const data = JSON.parse(text);
                console.log("Données reçues:", data);

                if (data.success) {
                    setProfile(data.profile);
                    setFormData({
                        first_name: data.profile.first_name || "",
                        last_name: data.profile.last_name || "",
                        category: data.profile.category || "",
                        email: data.profile.email || "",
                        password: data.profile.password || "",
                        bio: data.profile.bio || "",
                        profile_picture: null,
                    });
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du profil :", error);
                setError("Impossible de charger le profil.");
            }
        };

        fetchProfile();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profile_picture: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("id", id);  // L'ID de l'utilisateur
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("bio", formData.bio);
    
        // Si une image de profil est sélectionnée, l'ajouter
        if (formData.profile_picture) {
            formDataToSend.append("profile_picture", formData.profile_picture);
        }
    
try {
    const response = await fetch("http://localhost/musician-api/update_profile.php", {
        method: "POST",
        body: formDataToSend,
    });

    const text = await response.text(); // Lire la réponse brute
    console.log("Réponse serveur brute :", text);

    try {
        const data = JSON.parse(text); // Essayer de parser en JSON
        if (data.success) {
            setEditMode(false);
            setProfile({ ...profile, ...formData, profile_picture: data.profile_picture || profile.profile_picture });
        } else {
            setError(data.message);
        }
    } catch (jsonError) {
        console.error("Erreur JSON :", jsonError);
        setError("Réponse serveur invalide : " + text);
    }
} catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    setError("Impossible de mettre à jour le profil.");
}

    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!profile) {
        return <p>Chargement...</p>;
    }

    function logout() {
        localStorage.clear();
        location.reload();
    }

    return (
        <StyledProfile>
            <img src={`http://localhost/musician-api/${profile.profile_picture}`} alt="Profile" className="profilePicture" />
            <h1>{profile.first_name || profile.username} {profile.last_name}</h1>

            {!editMode ? (
                <>
                    <p><strong>Catégorie:</strong> {profile.category || "Non renseignée"}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Password:</strong> 🔒</p>
                    <p><strong>Bio:</strong> {profile.bio || "Aucune bio disponible"}</p>
                    <button onClick={() => setEditMode(true)}>Modifier</button>
                </>
            ) : (
                // Formulaire de modification (mode édition)
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="first_name" 
                        value={formData.first_name} 
                        onChange={handleChange} 
                        placeholder="Prénom" 
                    />
                    <input 
                        type="text" 
                        name="last_name" 
                        value={formData.last_name} 
                        onChange={handleChange} 
                        placeholder="Nom" 
                    />
                    <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleChange} 
                        placeholder="Catégorie" 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                    />
                    <input 
                        type="text" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                    />
                    <textarea 
                        name="bio" 
                        value={formData.bio} 
                        onChange={handleChange} 
                        placeholder="Bio"
                    />
                    <input 
                        type="file" 
                        name="profile_picture" 
                        onChange={handleFileChange} 
                    />
                    <button type="submit">Enregistrer</button>
                    <button type="button" onClick={() => setEditMode(false)}>Annuler</button>
                </form>
            )}

            <button onClick={logout}>Log out</button>
            <Footer />
        </StyledProfile>
    );
}

const StyledProfile = styled.div`
    background: linear-gradient(140deg, #5DADEC, #2179B5);
    min-height: 100dvh;
    width: 100vw;
    overflow: hidden;

    .profilePicture {
        border-radius: 50%;
        width: 150px;
        height: 150px;
    }
    button {
        margin: 5px;
        padding: 10px;
        cursor: pointer;
    }

    p {
        overflow: hidden;
    }

    h1 {
        font-size: 40px;
    }
`;
