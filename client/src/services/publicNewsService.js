import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/news`;

// FETCH APPROVED NEWS
export const getApprovedNews = async () => {

  return await axios.get(

    `${API}/approved`

  );

};