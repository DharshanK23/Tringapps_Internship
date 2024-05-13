import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    locat: '',
    language: [],
    project: ''
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({...prevState,[name]: type === 'checkbox' ?checked ? [...prevState[name], value] : prevState[name].filter(language => language !== value): value
    }));// checked means add value ,uncheck means remove the value and non checkboxes means update value
  };

  const validate = (event) => {
    event.preventDefault();
    const { name, email, project,gender,locat } = formData;
    const val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name === "") {
      alert("Please enter your name");
      return;
    }
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    if (!val.test(email)) {
      alert("Invalid email");
      return;
    }
    if (gender === ""){
      alert("Enter your gender");
      return;
    } 
    if (locat === ""){
      alert("Select your location");
      return;
    }
    if (project === "") {
      alert("Enter project details");
      return;
    }
    // const olduser =JSON.parse(localStorage.getItem("user"))||[];
    // olduser.push({
    //     name:formData.name,
    //     email:formData.email,
    //     gender:formData.gender,
    //     locat:formData.locat,
    //     language:formData.language,
    //     project:formData.project
    // });
    // localStorage.setItem("user",JSON.stringify(olduser))
    // navigate('/home', { state: formData });
    axios.post('http://localhost:8081/formdb',values)
    .then(res => console.log(res))
    .catch(err=>console.log(err));
  };

  return (
    <div>
      <form name="frm" className="box" onSubmit={validate}>
        <h1 className="text-center">Job Registration Form</h1>
        <br />
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
        <br/>
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
        <select className="form-select" name="locat" value={formData.locat} onChange={handleChange} >
          <option >Select Location</option>
          <option >Chennai</option>
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
