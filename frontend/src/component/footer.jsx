import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const userID = localStorage.getItem("userID");
    const [profileImage, setProfileImage] = useState("user.webp"); // Image par défaut
    const [homeImage, setHomeImage] = useState("home.webp"); // Image par défaut
    const [messageImage, setMessageImage] = useState("message.webp"); // Image par défaut
    const location = useLocation();

    // Vérifier si l'utilisateur est sur la page de profil
    useEffect(() => {
        if (location.pathname === `/profile/${userID}`) {
            setProfileImage("user_clicked.webp"); // Image pour la page de profil
        } else {
            setProfileImage("user.webp"); // Image par défaut pour les autres pages
        }
        if (location.pathname === `/`) {
            setHomeImage("home_clicked.webp"); // Image pour la page de profil
        } else {
            setHomeImage("home.webp"); // Image par défaut pour les autres pages
        }
        if (location.pathname === `/conversations`) {
            setMessageImage("message_clicked.webp"); // Image pour la page de profil
        } else {
            setMessageImage("message.webp"); // Image par défaut pour les autres pages
        }
    }, [location.pathname, userID]);

    return (
        <StyledFooter>
            <Link to={`/profile/${userID}`}>
                <img src={`../../public/${profileImage}`} alt="Profile" height="34" width="34" />
            </Link>
            <div className="homeCenter">
                <Link to="/">
                    <img src={`../../public/${homeImage}`} alt="Home" height="45" width="45" className="homeButton" />
                </Link>
            </div>
            <Link to={`/conversations`}>
                <img src={`../../public/${messageImage}`} alt="Message" height="34" width="34" />
            </Link>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.div`
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 0;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    z-index: 10;
    background-color: #1C3D5A;
    border-radius: 40px 40px 0 0;

    .homeCenter {
        width: 1px;
        height: 0;
        position: absolute;
        right: 50%;
        left: 50%;
    }

    a {
        text-decoration: none;
        color: #fff;
        font-size: 14px;
    }

    img:not(.homeButton) {
        object-fit: cover;
        margin: 0 40px;
    }

    .homeButton {
        position: relative;
        bottom: 40px;
        left: -37px;
        background-color: #50C878;
        padding: 15px;
        border-radius: 50%;
    }
`;
