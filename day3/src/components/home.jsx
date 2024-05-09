import React from 'react';
import { useLocation } from 'react-router-dom';
function Home() {
    const location = useLocation();
    const { fname } = location.state;
    return (
        <p>Welcome {fname}</p> 
    );
};
export default Home;
