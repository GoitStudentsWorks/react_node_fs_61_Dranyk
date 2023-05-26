import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: 'https://your-pet.onrender.com/api/',
});

const setToken = token => {
  if (token) {
    console.log(token);
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = '';
};


export const deleteNotice = async id => {
  const { data } = await instance.delete(`/notices/${id}`);
  return data;
};


export const addToFavoriteNotices = async (_id, token) => {
  setToken(token);
  const { data} = await instance.patch(`notices/addnoticetofavorite/${_id}`, token);
     console.log(data);
  return data;
};

export const removeFromFavoriteNotices = async _id => {
  const { data } = await instance.patch(`notices/removenoticefromfavorite/${_id}`);
  return data;
};

export const fetchDeleteNotice = createAsyncThunk(
  'notice/delete',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const result = await deleteNotice(_id, token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);


export const fetchAddToFavorite = createAsyncThunk(
  'notices/addnoticetofavorite',
  async ({ _id, token }, { rejectWithValue }) => {
    try {
      const data = await addToFavoriteNotices(_id, token);
    console.log(data);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchRemoveFromFavorite = createAsyncThunk(
  'notices/removenoticefromfavorite',
  async (_id, { rejectWithValue }) => {
    try {
      const data = await removeFromFavoriteNotices(_id);
      console.log(data);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);