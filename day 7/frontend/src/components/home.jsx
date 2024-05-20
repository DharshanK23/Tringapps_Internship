import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box,IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:',error);
      }
    };
    fetchData();
  }, []);

  const Delete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/del/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:',error);
    }
  };

  const Update = (id) => {
    navigate(`/update-user/${id}`);
  };

  const columns = [
    { field:'name',headerName:'Name',width: 130,editable: true},
    { field:'email',headerName:'Email',width: 200,editable: true },
    { field:'gender',headerName:'Gender',width: 100,editable: true},
    { field:'locat',headerName:'Location',width: 150,editable: true },
    { field:'language',headerName:'Languages',width: 150,editable: true},
    { field:'project',headerName:'Project',width: 150,editable: true},
    { field: 'actions',headerName: 'Actions',width: 300,editable: true,renderCell: (params) => (
      <div>
          <IconButton onClick={() =>Update(params.row.id)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() =>Delete(params.row.id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  return (
    <div className='styl'>
      <Button onClick={() => navigate('/')} variant='contained' color="primary"style={{padding:"5px",marginTop:"10px",marginRight:"10px",marginBottom:"10px",marginLeft:"10px"}}>Registration Form</Button>
      <Button onClick={() => navigate('/add-user')} variant='contained' color="primary"style={{padding:"5px",marginTop:"10px",marginRight:"10px",marginBottom:"10px",marginLeft:"10px"}}>Delete Selected</Button>
      <div className='container'>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid className='styl' rows={users} columns={columns} 
        checkboxSelection
        disableRowSelectionOnClick
        />
      </Box>
      </div>
    </div>
  );
}
export default Home;