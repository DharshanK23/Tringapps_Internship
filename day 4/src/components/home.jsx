import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

function Home() {
    const location = useLocation();
    const [userData, setUserData] = useState([]);
    
    useEffect(() => {
        const existingUsers = JSON.parse(localStorage.getItem("user")) || [];
        const userDataWithIds = existingUsers.concat(location.state).map((user, index) => ({...user,id:index}));
        setUserData(userDataWithIds);
    });

    const columns = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'project', headerName: 'Project', width: 250 },
        { field: 'gender', headerName: 'Gender', width: 120 },
        { field: 'locat', headerName: 'Location', width: 150 },
        { field: 'language', headerName: 'Languages Known', width: 200 },
    ];

    return (
        <div >
            <DataGrid
                rows={userData}
                columns={columns}
            />
        </div>
    );
}
export default Home;
