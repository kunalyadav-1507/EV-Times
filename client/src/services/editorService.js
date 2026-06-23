import axios from "axios";

const API = "http://localhost:5000/api/news";


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