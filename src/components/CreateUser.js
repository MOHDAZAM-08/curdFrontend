import React, { useState } from 'react'
import { IoMdCloseCircle, IoMdPaper } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import './CreateUser.css'
const CreateUser = () => {

  const nevigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch('/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData) // Use formData directly
    })
      .then(response => response.json())
      .then(savedData => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "User Created successfully",
          showConfirmButton: false,
          timer: 1500
        });
        nevigate('/');
      })
      .catch(error => {
        console.error("Error saving data:", error);
      });
  
    setFormData({ name: '', email: '', age: '' }); // Clear form after submission
  };
  

  return (
    <>
      <div className="HomePage">
        <div className="homecontent">
          <div className="headingCreateUser">
            <h1 style={{ margin: "0", padding: "0" }}>Add New user</h1>
            <Link to='/'>
              <IoMdCloseCircle style={{ height: "50px", width: "50px", color: "red", cursor: "pointer" }} />
            </Link>

          </div>
          <div className="formsection">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder='Enter your Name'
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder='Enter your E-mail'
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder='Enter your Age'
                value={formData.age}
                onChange={handleChange}
                required
              />

              <button type="submit">Create User</button>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default CreateUser
