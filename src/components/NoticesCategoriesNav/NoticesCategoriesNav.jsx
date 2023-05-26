import styles from './noticescategories-nav.module.css';
// import filters from "../../images/icons/svg/filters.svg";
import plus from "../../images/icons/svg/plus-small.svg";

import { NavLink, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import styled from "styled-components";

const StyledLink = styled(NavLink)`
    background-color: #cce4fb;
    color: #54adff;
&.active{
    background-color: #54adff;
    color: #fef9f9;
}
`;

const NoticesCategoriesNav = ({changNavAndSearch}) => {

  const location = useLocation();

  const { isLoggedIn } = useAuth();
  return (
    <>
          <div className={styles.inner}>
            <nav className={styles.navigation}>
          <StyledLink onClick={changNavAndSearch} to="/notices/sell" className={styles.navigationButton} >
            sell
          </StyledLink>
          <StyledLink onClick={changNavAndSearch} to="/notices/lost-found" className={styles.navigationButton} >
            lost/found
          </StyledLink>
             <StyledLink onClick={changNavAndSearch} to="/notices/for-free" className={styles.navigationButton } >
            in good hands
            </StyledLink>
          {isLoggedIn && <StyledLink  onClick={changNavAndSearch} to="/notices/favorite" className={styles.navigationButton} >
            favorite ads
          </StyledLink>}
          {isLoggedIn && <StyledLink onClick={changNavAndSearch} to="/notices/own" className={styles.navigationButton} >
            my ads
          </StyledLink>}
        </nav>
          
              <div className={styles.functional}>
          {/* <button type="button" className={styles.functionalButton}>
            <span>Filter</span>
            <img src={filters} alt="filters"/>

          </button> */}
         <Link
            to="/add-pet"
            state={{ from: location }}
            className={styles.functionalButton}
          >
            <span>Add Pet</span>
            <img src={plus} alt="arrow" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoticesCategoriesNav;