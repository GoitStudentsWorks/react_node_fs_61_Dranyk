// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import UserPageTitle from './UserPageTitle/UserPageTitle';
import UserPageCard from './UserPageCard/UserPageCard';
import Container from 'components/Container/Container';
import PetsList from './PetsList/PetsList';
import { AddPetIcon } from 'images/icons/userPageIcons';
// import Loader from 'components/Loader/Loader';

import css from './UserPage.module.css';

const UserPage = () => {
  const location = useLocation();
  // const loading = useSelector(({ auth: { loading } }) => loading);

  return (
    <Container>
      <div className={css.wrapper}>
        <section className={css.userSection}>
          <UserPageTitle text={'My information:'} />
          <UserPageCard />
        </section>

        <section className={css.userPetSection}>
          <div className={css.wrapperTitle}>
            <UserPageTitle text={'My pets:'} />

            <Link
              to="/add-pet"
              state={{ from: location }}
              className={css.button}
            >
              Add Pet
              <AddPetIcon color={'#FFFFFF'} />
            </Link>
          </div>

          <PetsList />
        </section>
      </div>
    </Container>
  );
};

export default UserPage;
