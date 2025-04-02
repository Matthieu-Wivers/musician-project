import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const Footer = () => {
    const userID = localStorage.getItem("userID");

    return (
        <StyledFooter>
            <Link to={`/profile/${userID}`}>Futur profile  </Link>
            <Link to="/">  Futur home</Link>
            <Link to={`/conversations`}>  Futur messages</Link>
        </StyledFooter>
    );
};

export default Footer;

const StyledFooter = styled.div`

`;