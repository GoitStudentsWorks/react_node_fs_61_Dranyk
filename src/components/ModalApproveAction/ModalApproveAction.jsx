// import { useDispatch } from 'react-redux';
// // import { logOut } from 'redux/auth/operations';
// import { logout } from 'redux/auth/auth-operations';
// import scss from './modal-approve-action.module.scss'
// import PropTypes from 'prop-types';
// import useToggleModalWindow from '../../hooks/useToggleModalWindow';

// const { closeModal } = useToggleModalWindow();
// const ModalApproveAction = ({ closeModal }) => {

//   const dispatch = useDispatch();
 
//   const handleLogOut = () => {
//    closeModal();
//     dispatch(logout());
//   };

//   return (

// <div className={scss.modal_approve_action__box}>
// <h2 className={scss.modal_approve_action__text}>Delete adverstiment?</h2>
// <h3 className={scss.modal_approve_action__question}>Are you sure you want to delete “Cute dog looking for a home”? You can`t undo this action.</h3>
// <div>
// <button
//    onClick={closeModal} type="button" >
//    Cancel
// </button>
// <button
//    className={scss.modal_approve_action__button}
//    type="button"
//    onClick={handleLogOut}>
//    Yes
// </button>
// </div>
// </div>
// );
// };

// export default ModalApproveAction;

// ModalApproveAction.propsType = {
//    closeModal: PropTypes.func.isRequired,
// };
