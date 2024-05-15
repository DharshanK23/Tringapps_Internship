import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Style.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    locat: '',
    language: [],
    project: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox'
        ? checked
          ? [...prevState[name], value]
          : prevState[name].filter((language) => language !== value)
        : value,
    }));
  };

  const validate = (event) => {
    event.preventDefault();
    const { name, email, project, gender, locat } = formData;
    const val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === '' || email === '' || project === '' || gender === '' || locat === '') {
      alert('Please fill all fields');
      return;
    }
    if (!val.test(email)) {
      alert('Invalid email');
      return;
    }

    axios.post('http://localhost:8081/user', formData)
      .then(() => {
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  };

  return (
    <div>
      <form name="frm" className="box" onSubmit={validate} action="post">
        <h1 className="text-center">Job Registration Form</h1>
        <br />
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        <br />
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} className="form-control" />
        <br />
        <p>Gender:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
          <label className="form-check-label">Female</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" value="prefer not to say" checked={formData.gender === 'prefer not to say'} onChange={handleChange} />
          <label className="form-check-label">Prefer not to say</label>
        </div>
        <br />
        <label>Preferred Location:</label>
        <select className="form-select" name="locat" value={formData.locat} onChange={handleChange}>
          <option>Select Location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
        </select>
        <br /><br />
        <p>Known Programming Language:</p>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" value="Java" checked={formData.language.includes('Java')} onChange={handleChange} />
          <label className="form-check-label">Java</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" value="Python" checked={formData.language.includes('Python')} onChange={handleChange} />
          <label className="form-check-label">Python</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" value="C programming" checked={formData.language.includes('C programming')} onChange={handleChange} />
          <label className="form-check-label">C Programming</label>
        </div>
        <br />
        <label>Project Explanation:</label>
        <textarea name="project" value={formData.project} onChange={handleChange} className="form-control" rows="6" placeholder="Explain 100 words about your final year project"></textarea>
        <br />
        <div className="text-center">
          <button type="submit" className="btn btn-dark">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
