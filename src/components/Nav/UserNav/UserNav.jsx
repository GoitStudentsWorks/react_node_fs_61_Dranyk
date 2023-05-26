import css from './UserNav.module.scss';
import { NavLink } from 'react-router-dom';
import userIcon from 'images/user-1.svg';
import { selectUser } from 'redux/auth/auth-selectors';
import { useSelector } from 'react-redux';

const UserNav = () => {
  const data = useSelector(selectUser);
  const userName = data.user.name;

  const checkName = () => {
    if (userName === '') {
      const result = 'User';
      return result;
    } else {
      const result = userName;
      return result;
    }
  };

  const usName = checkName();

  return (
    <div className={css.div}>
      <NavLink className={css.user} to="/user">
        <img className={css.icon} src={userIcon} alt="userIcon" />
        {/* {name} */}
        <p className={css.name}>{usName}</p>
      </NavLink>
    </div>
  );
};

export default UserNav;
