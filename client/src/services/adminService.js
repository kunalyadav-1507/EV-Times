import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/news`;

const EXTERNAL_API =
  `${import.meta.env.VITE_API_URL}/external-news`;
;


const token = localStorage.getItem("token");


const headers = {

  Authorization: `Bearer ${token}`

};


// GET PENDING NEWS
export const getPendingNews = async () => {

  return await axios.get(

    `${API}/pending/all`,

    { headers }

  );

};


// APPROVE NEWS
export const approveNews = async (id) => {

  return await axios.put(

    `${API}/approve/${id}`,

    {},

    { headers }

  );

};


// DELETE NEWS
export const deleteNews = async (id) => {

  return await axios.delete(

    `${API}/delete/${id}`,

    { headers }

  );

};

export const getAllExternalNews =
  async (
    page,
    limit,
    filter
    
  ) => {

    return await axios.get(

      `${EXTERNAL_API}/admin/all?page=${page}&limit=${limit}&filter=${filter}`

    );

};

export const markFeatured =
  async (id) => {

    return await axios.patch(

      `${EXTERNAL_API}/featured/${id}`

    );

};

export const markEditorPick =
  async (id) => {

    return await axios.patch(

      `${EXTERNAL_API}/editor-pick/${id}`

    );

};

export const deleteExternalNews =
  async (id) => {

    return await axios.delete(

      `${EXTERNAL_API}/delete/${id}`

    );

};