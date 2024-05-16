import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data.map((user, index) => ({ ...user, id: index})));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetch();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'locat', headerName: 'Location', width: 150 },
    { field: 'language', headerName: 'Languages', width: 150 },
    { field: 'project', headerName: 'Project', width: 150 },
  ];
  return (
    <div className="container">
      <DataGrid rows={users} columns={columns} className="styl"
       />
      </div>
  );
}

export default Home;
