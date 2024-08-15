import React, { useState } from 'react';
import './Login.css'
function Login() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
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

        const newData = {formData };
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error saving data:", error);
            });

        console.log("new data ",newData); // You can send this data to your backend server for processing
        // Example: sendFormDataToBackend(formData);
    };

    return (
        <div>
            <h2>Basic Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="message">Message:</label><br />
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    cols="50"
                    required
                ></textarea><br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;
