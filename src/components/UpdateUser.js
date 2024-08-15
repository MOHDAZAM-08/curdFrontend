import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle, IoMdPaper } from "react-icons/io";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import './CreateUser.css'
const UpdateUser = () => {

  const nevigate = useNavigate();
  const{id} = useParams()

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

 



  useEffect(() => {
    fetch('/getUser/'+id)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
        // console.log("data", data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
  
    fetch(`/updateUser/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your work has been Updated",
          showConfirmButton: false,
          timer: 1500
        });
        // Handle updated data
        // console.log("Updated data:", data);
        // Assuming setUserdata is a function to update the state with the updated data
        setFormData(data);
        nevigate('/')
      })
      .catch(error => {
        console.error("Error updating data:", error);
      });
  
      setFormData({ name: '', email: '', age: '' }); // Clear form after submission
  };
  

  return (
    <>
      <div className="HomePage">
        <div className="homecontent">
          <div className="headingCreateUser">
            <h1 style={{ margin: "0", padding: "0" }}>Update Users</h1>
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

              <button type="submit">Upadte User</button>
            </form>
          </div>

        </div>

      </div>
    </>
  )
}

export default UpdateUser
