import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/auth`;

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

export const checkEmail = (email) => {

  return axios.post(

    `${API}/check-email`,

    { email }

  );

};