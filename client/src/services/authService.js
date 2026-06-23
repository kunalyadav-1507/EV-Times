import axios from "axios";

const API = "http://localhost:5000/api/auth";


// REGISTER USER
export const registerUser = async (userData) => {

  return await axios.post(

    `${API}/register`,
    userData

  );

};


// LOGIN USER
export const loginUser = async (userData) => {

  return await axios.post(

    `${API}/login`,
    userData

  );

};