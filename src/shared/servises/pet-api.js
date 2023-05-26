import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://your-pet.onrender.com/',
  });
  
  const setToken = token => {
    if (token) {
      return (instance.defaults.headers.authorization = `Bearer ${token}`);
    }
    instance.defaults.headers.authorization = '';
  };

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

export const addNoticeToFavorite = async (id, token) => {
    setToken(token);
    const { data } = await instance.patch(`api/notices/addnoticetofavorite/${id}`);
      return data;
};

export const removeNoticeFromFavorite = async (id, token) => {
    setToken(token);
    const { data } = await instance.delete(`api/notices/removenoticefromfavorite/${id}`);
      return data;
};

export const deleteNotice = async (id, token) => {
    setToken(token);
    const { data } = await instance.delete(`api/notices/${id}`);
      return data;
};