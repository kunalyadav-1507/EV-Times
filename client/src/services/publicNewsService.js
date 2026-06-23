import axios from "axios";

const API = "http://localhost:5000/api/news";


// FETCH APPROVED NEWS
export const getApprovedNews = async () => {

  return await axios.get(

    `${API}/approved`

  );

};