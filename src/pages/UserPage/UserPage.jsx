import { useNavigate } from 'react-router-dom';

import UserPageTitle from './UserPageTitle/UserPageTitle';
import UserPageCard from './UserPageCard/UserPageCard';
import UserFormData from './UserFormData/UserFormData';
import Logout from './Logout/Logout';
import Container from 'components/Container/Container';
import PetsList from './PetsList/PetsList';

import css from './UserPage.module.css';
import TrashIcon from 'images/icons/TrashIcon';
import {
  AddPetIcon,
  CameraIcon,
  AddPhotoIcon,
} from 'images/icons/userPageIcons';

const UserPage = () => {
  const navigate = useNavigate();
  const handleAddPet = () => {
    navigate('/add-pet');
  };
  return (
    <Container>
      <div className={css.wrapper}>
        <section className={css.userSection}>
          <UserPageTitle text={'My information:'} />
          <UserPageCard>
            <div>
              <div className={css.photo}>
                <AddPhotoIcon color={'#54ADFF'} />
              </div>
              <div className={css.editPhotoWrapper}>
                <CameraIcon color={'#54ADFF'} />
                <span className={css.editPhotoTitle}>Edit photo</span>
              </div>
            </div>
            <div className={css.formWrapper}>
              <UserFormData />
              <Logout />
            </div>
          </UserPageCard>
        </section>

        <section className={css.userPetSection}>
          <div className={css.wrapperTitle}>
            <UserPageTitle text={'My pets:'} />

            <button className={css.button} onClick={handleAddPet}>
              Add Pet
              <AddPetIcon color={'#FFFFFF'} />
            </button>
          </div>
          <ul className={css.petList}>
            <li className={css.petItem}>

              {/* обгортаю в button для подальшого відкриття модального вікна при натисканні */}
            <button type="button" onClick={openModal}>
              <TrashIcon color={'#54ADFF'} className={css.deleteIcon} 
               />
              <img
                src="https://res.cloudinary.com/dwptjohyl/image/upload/v1684266179/iypomlbmaefrplomzkzn.jpg"
                alt="domestic pet"
                width="240"
                height="240"
                className={css.petImg}
               />
               </button>

              <div>
                <p className={css.text}>
                  <span className={css.attributeName}>Name: </span>Jack
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Date of birth: </span>
                  22.04.2018
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Breed: </span>Labrador
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Comments: </span>
                  Jack is a gray Persian dog with green eyes. He loves to be
                  pampered and groomed, and enjoys playing with toys. Although a
                  bitshy, he's a loyal and affectionate lap dog.
                </p>
              </div>
            </li>
            <li className={css.petItem}>
            <button type="button" onClick={openModal}>
              <TrashIcon color={'#54ADFF'} className={css.deleteIcon} 
               />
              <img
                src="https://res.cloudinary.com/dwptjohyl/image/upload/v1684266179/iypomlbmaefrplomzkzn.jpg"
                alt="domestic pet"
                width="240"
                height="240"
                className={css.petImg}
               />
               </button>
              <img
                src="https://res.cloudinary.com/dwptjohyl/image/upload/v1684266179/iypomlbmaefrplomzkzn.jpg"
                alt="domestic pet"
                width="240"
                height="240"
                className={css.petImg}
              
              />
              <div>
                <p className={css.text}>
                  <span className={css.attributeName}>Name: </span>Jack Junior
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Date of birth: </span>
                  23.08.2021
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Breed: </span>Labrador
                </p>
                <p className={css.text}>
                  <span className={css.attributeName}>Comments: </span>
                  Jack is a gray dog with green eyes. He loves to be pampered
                  and groomed, and enjoys playing with toys. Although a bitshy,
                  he's a loyal and affectionate lap dog.
                </p>
              </div>
            </li>
          </ul>
          <PetsList />
        </section>
      </div>
    </Container>
  );
};

export default UserPage;
