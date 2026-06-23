import axios from "axios";

const API = "http://localhost:5000/api";


// FETCH NEWS BY TOPIC
export const fetchNewsByTopic = async (topic) => {
   return await axios.get(

    `${API}/external-news/topic/${topic}`

  );

};

// FETCH NEWS BY CATEGORY

export const fetchNewsByCategory =
  async (category) => {

    return await axios.get(
      `${API}/external-news/category/${category}`
    );

};



export const fetchHomeNews =
  async () => {

    return await axios.get(
      `${API}/external-news/home-news`
    );

};

export const fetchStateNews =
  async (stateName) => {

    return await axios.get(
      `${API}/external-news/state/${stateName.toLowerCase()}`
    );

};

export const searchNews =
  async (query) => {

    return await axios.get(

      `${API}/external-news/search/${query}`

    );

};

export const fetchTrendingNews =
  async () => {

    return await axios.get(

      `${API}/external-news/trending`

    );

};

export const fetchFeaturedNews =
  async () => {

    return await axios.get(

      `${API}/external-news/featured`

    );

};

export const fetchEditorPicks =
  async () => {

    return await axios.get(

      `${API}/external-news/editor-picks`

    );

};