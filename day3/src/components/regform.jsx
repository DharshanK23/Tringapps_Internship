import React,{useState}from 'react';
import { useNavigate } from 'react-router-dom';
function Registration() {
  const navigate = useNavigate();
  const [sname,setName]  = useState('');
  const validate = (event) => {
    event.preventDefault();
    var fname = event.target.elements.name.value;
    var email = event.target.elements.email.value;
    var project = event.target.elements.project.value;
    var val = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (fname === "") {
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
    if (project === "") {
      alert("Enter project details");
      return;
    }  
    setName(sname);
    navigate('/home',{state : {fname}});
    // window.location.href = "/home";
  };  
  return (
    <div className="container">
      <form name="frm" className="box" onSubmit={validate}>
        <h1 className="text-center">Job Registration Form</h1>
        <br />
        <label>Name:</label>
        <input type="text" name="name" className="form-control" />
        <br />
        <label>Email:</label>
        <input type="text" name="email" className="form-control" />
        <br />
        <p>Gender:</p>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender"  />
          <label className="form-check-label">Male</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" />
          <label className="form-check-label">Female</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="gender" />
          <label className="form-check-label">Prefer not to say</label>
        </div>
        <br />
        <label>Preferred Location:</label>
        <select className="form-select" name="location">
          <option>Select location</option>
          <option>Chennai</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
        </select>
        <br /><br />
        <p>Known Programming Language:</p>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" />
          <label className="form-check-label" htmlFor="java">Java</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" />
          <label className="form-check-label" htmlFor="python">Python</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" name="language" />
          <label className="form-check-label" htmlFor="c">C Programming</label>
        </div>
        <br />
        <label>Project Explanation:</label>
        <textarea name="project" className="form-control" rows="6" placeholder="Explain 100 words about your final year project"></textarea>
        <br />
        <div className="text-center">
          <button type="submit" className="btn btn-dark">Submit</button>
        </div>

      </form>
    </div>
  );
}
export default Registration;
