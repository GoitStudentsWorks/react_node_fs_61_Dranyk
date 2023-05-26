import scss from './modal-notice.module.scss';
import Loader from 'components/Loader/Loader';
// import { CloseIcon } from 'images/icons/userPageIcons';
import SvgH from 'images/icons/HeartIcon';
import { selectLoading } from 'redux/auth/auth-selectors';
import { useSelector } from 'react-redux';
// import useToggleModalWindow from '../../hooks/useToggleModalWindow';
// import Modal from 'components/Modal/Modal';
import { useEffect, useState } from 'react';
import { fetchDataUser } from '../../shared/servises/pet-api';
import axios from 'axios';
// import { createAsyncThunk } from '@reduxjs/toolkit';

const ModalNotice = (data, favorite) => {
  const loading = useSelector(selectLoading);
  const [state, setState] = useState('');

  useEffect(() => {
    const owner = data.ownerNotice;
    const fetchData = async owner => {
      try {
        const data = await fetchDataUser(owner);
        setState(data);
        return data;
      } catch (error) {
        return error;
      }
    };
    fetchData(owner);
  }, [data.ownerNotice]);

  // const { isModalOpen, closeModal } = useToggleModalWindow();

  // const handleDown = e => {
  //   if (e.currentTarget === e.target) {
  //     closeModal();
  //   }
  // };

  const getCategoryNotice = category => {
    if (category === 'for-free') {
      category = 'in good hands';
    }
    if (category === 'lost-found') {
      category = 'lost/found';
    }
    return category;
  };

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

  const addToFavoriteNotices = async _id => {
    const { data } = await instance.patch(`notices/addnoticetofavorite/${_id}`);
    return data;
  };
  
  const removeFromFavoriteNotices = async _id => {
    const { data } = await instance.patch(`notices/removenoticefromfavorite/${_id}`);
    return data;
  };
  
  // const fetchAddToFavorite = createAsyncThunk(
  //   'notices/add-favorite',
  //   async (_id, { rejectWithValue }) => {
  //     try {
  //       const data = await addToFavoriteNotices(_id);
  //       return data;
  //     } catch ({ response }) {
  //       return rejectWithValue(response.data);
  //     }
  //   }
  // );
  
  // const fetchRemoveFromFavorite = createAsyncThunk(
  //   'notices/remove-favorite',
  //   async (_id, { rejectWithValue }) => {
  //     try {
  //       const data = await removeFromFavoriteNotices(_id);
  //       return data;
  //     } catch ({ response }) {
  //       return rejectWithValue(response.data);
  //     }
  //   }
  // );


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <li key={data._id} className={scss.listItems}>
            <div className={scss.modal_notice__content}>
              <div className={scss.modal_notice__content_info}>
                {/* <div onClick={handleDown}>
                  <button onClick={closeModal} type="button">
                    <CloseIcon
                      color={'#54ADFF'}
                      className={scss.modal_notice__close}
                      width="24"
                      height="24"
                    />
                  </button>
                  {isModalOpen && <Modal closeModal={closeModal}></Modal>}
                </div> */}
                <div>
                  <img
                    className={scss.modal_notice__image}
                    src={data.noticeAvatar}
                    alt="123"
                  />
                  <div className={scss.modal_notice__category}>
                    <span className={scss.modal_notice__category_info}>
                      {getCategoryNotice(data.category)}
                    </span>
                  </div>
                </div>
                <div className={scss.modal_notice__full}>
                  <h3 className={scss.modal_notice__full_title}>
                    {data.title}
                  </h3>
                  <ul className={scss.modal_notice__list}>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>Name:</h4>
                      <p className={scss.modal_notice__item_description}>
                        {data.namePet}
                      </p>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>
                        Birthday:
                      </h4>
                      <p className={scss.modal_notice__item_description}>
                        {data.dateOfBirth}
                      </p>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>Breed:</h4>
                      <p className={scss.modal_notice__item_description}>
                        {data.breed}
                      </p>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>Place:</h4>
                      <p className={scss.modal_notice__item_description}>
                        {data.location}
                      </p>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>
                        The sex:
                      </h4>
                      <p className={scss.modal_notice__item_description}>
                        {data.sex}
                      </p>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>Email:</h4>
                      <a
                        href={`mailto:${state.email}`}
                        className={scss.modal_notice__item_continfo}
                        type="button"
                      >
                        {state.email}
                      </a>
                    </li>
                    <li className={scss.modal_notice__item}>
                      <h4 className={scss.modal_notice__item_title}>Phone:</h4>
                      <a
                        href={`tel:+${state.phone}`}
                        className={`${scss.modal_notice__item_continfo}`}
                        type="button"
                      >
                        {`+${state.phone}`}
                      </a>
                    </li>
                    {data.category === 'sell' && (
                      <li className={scss.modal_notice__item}>
                        <h4 className={scss.modal_notice__item_title}>
                          Price:
                        </h4>
                        <p className={scss.modal_notice__item_description}>
                          {data.price}$
                        </p>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <article className={scss.modal_notice__item_comment}>
                <span className={scss.modal_notice__item_title}>Comments:</span>
                {data.comments}
              </article>
              <div>
                <a
                    href={`tel:+${state.phone}`}
                    className={`${scss.modal_notice__button_contact}`}
                    type="button"
                  >
                    Contact
                  </a>
                {favorite && (
                  <button
                    onClick={() => {
                      addToFavoriteNotices(data._id);
                    }}
                    className={`${scss.modal_notice__button_favorite}`}
                    type="button"
                  >
                    Add to
                    <SvgH
                      color={'#ffffff'}
                      className={scss.modal_notice__icon_favorite}
                    />
                  </button>
                )}
                {!favorite && (
                  <button
                    onClick={
                      removeFromFavoriteNotices(data._id)}
                    className={`${scss.modal_notice__button_favorite}`}
                    type="button"
                  >
                    Remove
                    <SvgH
                      color={'#ffffff'}
                      className={scss.modal_notice__icon_favorite}
                    />
                  </button>
                )}
              </div>
            </div>
          </li>
        </>
      )}
    </>
  );
};

export default ModalNotice;
