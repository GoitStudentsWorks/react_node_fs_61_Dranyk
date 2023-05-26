import React from 'react';
import styles from './homePage.module.scss';
import Container from 'components/Container/Container';
import { useSelector } from 'react-redux';

import Loader from '../../components/Loader/Loader';

const HomePage = () => {
  const loading = useSelector(({ auth: { loading } }) => loading);
  return loading ? (
    <Loader />
  ) : (
    <Container>
      <h1 className={styles.title}>Take good care of your small pets</h1>
      <div className={styles.imgPets}></div>
    </Container>
  );
};

export default HomePage;
