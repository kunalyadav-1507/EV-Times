import axios from "axios";


const API =
  "http://localhost:5000/api/saved-news";


// SAVE ARTICLE
export const saveArticle =
  async (article) => {

    const token =
      localStorage.getItem("token");


    return await axios.post(

      `${API}/save`,

      article,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

};

// GET SAVED ARTICLES
export const getSavedArticles =
  async () => {

    const token =
      localStorage.getItem("token");


    return await axios.get(

      API,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

};

// REMOVE SAVED ARTICLE

export const removeSavedArticle =
  async (id) => {

    const token =
      localStorage.getItem("token");


    return await axios.delete(

      `${API}/${id}`,

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

};