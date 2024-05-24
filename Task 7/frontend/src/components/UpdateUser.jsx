import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';

function UpdateUser() {
  const [formData,setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    locat: '',
    language: '',
    project: '',
  });
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData=async()=> {
      try {
        const response = await axios.get(`http://localhost:8081/userget/${id}`);
        setFormData(response.data[0]);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchData();},[id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Updating user:',id,formData);
    try {
      await axios.put(`http://localhost:8081/userupdate/${id}`,formData);
      navigate('/home');
    } catch (error) {
      console.error('Error updating user:',error);
    }
  };
  return (
    <div className='form-container'>
    <form onSubmit={handleSubmit}>
      <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="gender" label="Gender" value={formData.gender} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="locat" label="Location" value={formData.locat} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="language" label="Languages" value={formData.language} onChange={handleChange} fullWidth margin="normal" />
      <TextField name="project" label="Project" value={formData.project} onChange={handleChange} fullWidth margin="normal" />
      <div className='button' ><Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>Update</Button></div>
    </form>
    </div>
  );
} 
export default UpdateUser;