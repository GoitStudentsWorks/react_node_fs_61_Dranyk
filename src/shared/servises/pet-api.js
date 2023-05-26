import axios from 'axios';

// const baseURL = 'https://api.themoviedb.org/3';

export const ApiCategoryBySearchAndCategory = async (category,searchQuery) => {
const { data } =
await axios.get(`https://your-pet.onrender.com/api/notices?category=${category}&search=${searchQuery}`)
return data;
};



export const ApiFavoriteCategory = async (token) => {
const { data } =
    await axios.get(`https://your-pet.onrender.com/api/notices/userfavoritenotices`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
  return data;
};

export const ApiMynoticesCategory = async (token) => {
const { data } =
    await axios.get(`https://your-pet.onrender.com/api/notices/mynotices`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
  return data;
};

export const fetchDataUser = async (id) => {
    const { data } =
        await axios.get(`https://your-pet.onrender.com/api/auth/users/${id}`)
      return data;
    };