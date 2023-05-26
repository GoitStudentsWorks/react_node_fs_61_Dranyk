import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom/dist';

import UserPage from '../UserPage/UserPage';
import Modal from './RegisterForm/RegisterModal/Modal';

import { signup } from '../../redux/auth/auth-operations';

import RegisterForm from './RegisterForm/RegisterForm';
import Container from 'components/Container/Container';
import css from './register-page.module.css';
import styles from './RegisterForm/RegisterModal/modal.module.scss';
import pawprint from 'images/pawprint.svg';
import { selectLoading, selectError } from 'redux/auth/auth-selectors';
import Loader from 'components/Loader/Loader';

const RegisterPage = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [modalActive, setModalActive] = useState(false);
  // const [passInUse, setPassInUse] = useState(false);

  const dispatch = useDispatch();

  const handleSignup = data => {
    const { email, password, confirmPassword } = data;
    const dataSent = { email, password };

    if (password.length < 6)
      return alert('"Password" length must be at least 6 characters long ');

    // setModalActive(true);

    // Check password and confirmPassword (boolean)
    // console.log(password, confirmPassword);
    if (password !== confirmPassword)
      return alert('confirmPassword must match the password');

    const sendData = async () => {
      try {
        const result = await dispatch(signup(dataSent));
        // console.log(result);
        const { payload } = result;
        if (payload.email || payload.token) {
          setModalActive(true);
          localStorage.setItem('user', JSON.stringify(payload));
        }
        if (payload.status === 409) {
          // setPassInUse(true);
          return alert('Email in use')
        };
      } catch ({ response }) {
        // console.log(response.error.message);
      }
    };
    sendData();

    // if (loading && error) {
    //   return <Loader />;
    // }
  };

  return (
    <Container>
      {loading && !error && <Loader />}
      {modalActive && <UserPage />}
      <Modal active={modalActive} setActive={setModalActive}>
        <h2 className={styles.modal__header}>Congrats!</h2>
        <h3 className={styles.modal_title}> Youre registration is success</h3>
        <button className={styles.modal_button}>
          <div className={styles.modal_button_items}>
            <NavLink to="/user" className={styles.modal__button_text}>
              Go to profile
            </NavLink>
            <img src={pawprint} alt="pawprint" />
          </div>
        </button>
      </Modal>
      <div className={css.div}>
        {/* {passInUse && <Navigate to="/login" />} */}
        {!modalActive && <RegisterForm onSubmit={handleSignup} />}
      </div>
    </Container>
  );
};

export default RegisterPage;
