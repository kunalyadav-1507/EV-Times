import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { loginUser } from "../services/authService";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

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

      const response = await loginUser(formData);

      console.log(response.data);

      


      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );


      // SAVE ROLE
      localStorage.setItem(
        "role",
        response.data.role
      );


      // ROLE-BASED REDIRECT

      if (response.data.role === "admin") {

        navigate("/admin-dashboard");

      }

      else if (
        response.data.role === "editor"
      ) {

        navigate("/editor-dashboard");

      }

      else {

        navigate("/");

      }

    } catch (error) {

  console.log(error);

  alert("Invalid Email or Password");


  // CLEAR INPUTS
  setFormData({

    email: "",

    password: ""

  });

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
            Login
          </h2>


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
            Login
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


export default Login;