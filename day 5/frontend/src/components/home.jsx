import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Home() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                return response.json();
            })
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'project', headerName: 'Project', width: 250 },
        { field: 'gender', headerName: 'Gender', width: 120 },
        { field: 'locat', headerName: 'Location', width: 150 },
        { field: 'language', headerName: 'Languages Known', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={userData}
                columns={columns}
            />
        </div>
    );
}

export default Home;
