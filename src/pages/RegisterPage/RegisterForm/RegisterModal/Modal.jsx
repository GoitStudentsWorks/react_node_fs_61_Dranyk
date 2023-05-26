import { useNavigate } from 'react-router-dom';
import React from 'react';

import './modal.scss';
// import { Navigate } from 'react-router';

const Modal = ({ active, setActive, children }) => {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      setActive(false);
      // console.log('elrfghecorvno');
      navigate('/user');
       // setTimeout(() => {
      //   document.location.replace('/YourPet/user');
      // }, 50);
    }
  });
  const navigate = useNavigate();

  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        setActive(false);
        document.location.replace('/YourPet/user');
      }}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
