import css from './UserNav.module.scss';
import { NavLink } from 'react-router-dom';
import userIcon from 'images/user-1.svg';
import { useAuth } from 'hooks/useAuth';

const UserNav = () => {
  const { user } = useAuth();
  return (
    <div className={css.div}>
      <NavLink className={css.user} to="/user">
        <img className={css.icon} src={userIcon} alt="userIcon" />
        {user? 
        (<p className={css.name}>{user.name}</p>)
        : 
        (<p className={css.name}>User</p>)
        }   
      </NavLink>
    </div>
  );
};

export default UserNav;
