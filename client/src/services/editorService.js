import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/news`;

// CREATE NEWS
export const createNews = async (newsData) => {

  const token = localStorage.getItem("token");

  return await axios.post(

    `${API}/create`,

    newsData,

    {
      headers: {

        Authorization: `Bearer ${token}`

      }
    }

  );

};