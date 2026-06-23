import { useState } from "react";

import Navbar from "../components/Navbar";

import { registerUser } from "../services/authService";


function Register() {

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  });


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await registerUser(formData);

      alert("Registration Successful");

      console.log(response.data);

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };


  return (

    <>

      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4"
        }}
      >

        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "15px",
            width: "350px",
            boxShadow:
              "0 4px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h2
            style={{
              marginBottom: "20px",
              textAlign: "center"
            }}
          >
            Register
          </h2>


          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />


          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />


          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />


          <button
            type="submit"
            style={buttonStyle}
          >
            Register
          </button>

        </form>

      </div>

    </>

  );

}


const inputStyle = {

  width: "100%",

  padding: "12px",

  marginBottom: "15px",

  borderRadius: "8px",

  border: "1px solid #ccc"

};


const buttonStyle = {

  width: "100%",

  padding: "12px",

  border: "none",

  borderRadius: "8px",

  backgroundColor: "#111",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer"

};


export default Register;