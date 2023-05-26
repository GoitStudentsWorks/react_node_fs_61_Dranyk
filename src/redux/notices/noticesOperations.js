import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


// import { selectAuth } from '../../redux/auth/auth-selectors';
// import { useSelector } from 'react-redux';


const instance = axios.create({
  baseURL: 'https://your-pet.onrender.com/api/',
});

// const setToken = token => {
//   if (token) {
//     console.log(token);
//     return (instance.defaults.headers.authorization = `Bearer ${token}`);
//   }
//   instance.defaults.headers.authorization = '';
// };


export const deleteNotice = async _id => {
  const { data } = await instance.delete(`/notices/${_id}`);
  return data;
};

export const addToFavoriteNotices = async _id => {
  const { data } = await instance.patch(`notices/addnoticetofavorite/${_id}`);
  return data;
};

export const removeFromFavoriteNotices = async _id => {
  const { data } = await instance.patch(`notices/removenoticefromfavorite/${_id}`);
  return data;
};

export const fetchAddToFavorite = createAsyncThunk(
  'notices/add-favorite',
  async (_id, { rejectWithValue }) => {
    try {
      const data = await addToFavoriteNotices(_id);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchRemoveFromFavorite = createAsyncThunk(
  'notices/remove-favorite',
  async (_id, { rejectWithValue }) => {
    try {
      const data = await removeFromFavoriteNotices(_id);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);
export const fetchDeleteNotice = createAsyncThunk(
  'notice/delete',
  async (_id, { rejectWithValue }) => {
    try {
      await deleteNotice(_id);
      return _id;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);