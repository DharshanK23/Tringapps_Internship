import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState({ id: null });
  const [editRowsModel, setEditRowsModel] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleProcessRowUpdate = async (newRow) => {
    const updatedRow = {
      id: newRow.id,
      name: newRow.name,
      email: newRow.email,
      gender: newRow.gender,
      locat: newRow.locat,
      language: newRow.language,
      project: newRow.project,
    };
    
    try {
      await axios.put(`http://localhost:8081/userupdate/${newRow.id}`, updatedRow);
      setUsers(users.map((user) => (user.id === newRow.id ? updatedRow : user)));
      setEditMode({ id: null });
      return updatedRow;
    } catch (error) {
      console.error('Error updating user:', error);
      return newRow;
    }
  };

  const handleEditClick = (id) => {
    setEditMode({ id });
  };

  const handleCancelClick = () => {
    setEditMode({ id: null });
  };

  const handleSaveClick = async (id) => {
    const updatedRow = editRowsModel[id];
    if (updatedRow) {
      await handleProcessRowUpdate(updatedRow.data);
    }
  };

  const handleEditRowsModelChange = (model) => {
    setEditRowsModel(model);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/del/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 130, editable: true },
    { field: 'email', headerName: 'E-mail', width: 200, editable: true },
    { field: 'gender', headerName: 'Gender', width: 100, editable: true },
    { field: 'locat', headerName: 'Location', width: 150, editable: true },
    { field: 'language', headerName: 'Language', width: 150, editable: true },
    { field: 'project', headerName: 'Project', width: 150, editable: true },
    { field: 'actions',headerName: 'Actions', width: 150,
      renderCell: (params) => {
        const isInEditMode = editMode.id === params.row.id;
        return (
          <div>
            {isInEditMode ? (
              <>
                <IconButton onClick={() => handleSaveClick(params.row.id)} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancelClick} color="secondary">
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleEditClick(params.row.id)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(params.row.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </div>
        );
      },
    },
  ];
  return (   
      <div >
      <Button onClick={() => navigate('/')} variant="contained" color="primary"style={{marginRight:"10px",marginLeft:"10px",marginBottom:"10px",marginTop:"10px",}}>Registration Form</Button>
      <Button variant="contained" color="primary"style={{marginRight:"10px",marginLeft:"10px",marginBottom:"10px",marginTop:"10px",}}>Delete Selected</Button>
      <DataGrid rows={users} columns={columns}
          editRowsModel={editRowsModel}
          onEditRowsModelChange={handleEditRowsModelChange}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
          checkboxSelection
      />
      </div>
  );
}

export default Home;
