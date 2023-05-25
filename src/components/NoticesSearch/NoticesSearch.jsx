import styles from './notices-search.module.css';
import iconSearch from './../../images/icons/svg/search.svg';
import initialState from './initialState';

import { useState } from 'react';

const NoticesSearch = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });


  // const [state, setState] = useState('');

  // const handleChange = ({ target }) => {
  //   const value = target.value;
  //   setState(value);
  //   if (value.trim() === '') {
  //     onSubmit(value);
  //   }
  // };

  // const handleSubmit = e => {
  //   e.preventDefault();
  //   onSubmit(state);
  // };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (state.search.trim() === '') {
      return alert('Search field is empty');
    }
    const { search } = state;
    onSubmit({ search });
  };

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>Find your favorite pet</h1>
        <form onSubmit={handleSubmit} action="" className={styles.form}>
          <input
            onChange={handleChange}
            name="search"
            value={state.value}
            type="search"
            className={styles.input}
            placeholder="Search"
          />
          <button type="submit" className={styles.button}>
            <img src={iconSearch} alt="iconSearch" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NoticesSearch;
