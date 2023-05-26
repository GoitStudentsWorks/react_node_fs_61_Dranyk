import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

import {
  ApiCategoryBySearchAndCategory,
  ApiFavoriteCategory,
  ApiMynoticesCategory,
} from './../../shared/servises/pet-api';
import NoticesSearch from '../../components/NoticesSearch/NoticesSearch';
import NoticesCategoriesNav from './../../components/NoticesCategoriesNav/NoticesCategoriesNav';
import NoticesCategoriesList from '../../components/NoticesCategoriesList/NoticesCategoriesList.jsx';
import Loader from 'components/Loader/Loader';
import styles from './noticesPage.module.css';
import { useSelector } from 'react-redux';
import { selectAuth } from './../../redux/auth/auth-selectors';

const NoticePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { token } = useSelector(selectAuth);
  const { category } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchPetByTitle = ({ search } ) => {
    console.log("searchPetByTitle",search)
    // if (search === '') {
    //   setSearchParams('');
    //   return
    // }
    setSearchParams({ search } );
  };

  useEffect(() => {
    const currentSearch = searchParams.get('search');

    if (currentSearch) {
      setSearch(currentSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    if (
      category === 'sell' ||
      category === 'lost-found' ||
      category === 'for-free'
    ) {
      const fetchNoticesByCategory = async (category, search) => {
        try {
          setLoading(true);
          const data = await ApiCategoryBySearchAndCategory(category, search);
          setItems(data);
          setError(null);
          return data;
        } catch (error) {
          setError(error.message);
          setItems([]);
        } finally {
          setLoading(false);
        }
      };
      fetchNoticesByCategory(category, search);
    } else if (category === 'favorite') {
      const fetchFavoriteCategory = async () => {
        try {
          setLoading(true);
          const data = await ApiFavoriteCategory(token);
          setItems(data);
          return data;
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteCategory();
    } else if (category === 'own') {
      const fetchOwnCategory = async () => {
        try {
          setLoading(true);
          const data = await ApiMynoticesCategory(token);
          setItems(data);
          return data;
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchOwnCategory();
    }
  }, [category, search, token]);

  const changNavAndSearch = () => {
    setSearch("");
  };


  return (
    <div className={styles.container}>
      <NoticesSearch onSubmit={searchPetByTitle} />
      <NoticesCategoriesNav changNavAndSearch={changNavAndSearch} />
      {loading && <Loader />}
      {error && <p className={styles.error}>...error</p>}
      {items.length > 0 ? <NoticesCategoriesList items={items} /> : <p>There are no pets here...add please</p>}
    </div>
  );
};

export default NoticePage;