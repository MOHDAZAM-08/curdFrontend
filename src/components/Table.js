import React, { useEffect, useState } from 'react';
import './Table.css';
import { Link } from 'react-router-dom';
import { MdEditNote, MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2'

function Table() {

    const [userdata, setUserdata] = useState([]);

    useEffect(() => {
        fetch('/get')
            .then(response => response.json())
            .then(data => {
                setUserdata(data);
                // console.log("data", data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    

    const onDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              fetch(`/deleteUser/${id}`, {
                method: 'DELETE'
              })
                .then(response => response.json())
                .then(data => {
                  // console.log("User deleted:", data);
                 window.location.reload();
                })
                .catch(error => {
                  console.error("Error deleting user:", error);
                });
            }
          });

      
      };
      

    if (!userdata || userdata.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className='table'>
            <div className='tableheading'>
                <div className='theading'>
                    <div className='cont'>Name</div>
                    <div className='contMail'>Email</div>
                    <div className='cont'>Age</div>
                    <div className='cont'>Actions</div>
                </div>
            </div>
            <div className='tablcontenteheading'>
                {userdata.map((user) => (
                    <div className='tbody' key={user._id}>
                        <div className='cont'>{user.name}</div>
                        <div className='contMail'>{user.email}</div>
                        <div className='cont'>{user.age}</div>
                        <div className='upadeteDeleteBtttn cont'>
                            <div className='buttonnnn'>
                                <Link to={`/Update/${user._id}`}>
                                    <MdEditNote className='icon' />
                                </Link>
                            </div>
                            <div className='buttonnnn' onClick={() => onDelete(user._id)}>
                                    <MdDeleteForever className='icon' />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Table;
