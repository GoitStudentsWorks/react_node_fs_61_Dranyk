import { useEffect, useState } from 'react';

import instance from 'redux/auth/auth';

import ModalDeletePet from './Modal/ModalDeletePet';

import TrashIcon from 'images/icons/TrashIcon';
import css from './PetsItem.module.css';

const PetsItem = () => {
  const [myPets, setMyPets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = id => {
    setSelectedPetId(id);
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    try {
      const { data } = await instance.get('/api/user/pets/getAllUserPets');
      setMyPets(data.userPets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteSuccess = () => {
    setIsModalOpen(false);
    fetchData();
  };

  if (!Object.keys(myPets).length) return <p>There are no pets here...</p>;

  const petCards = myPets.map(
    ({ _id, breed, comments, dateOfBirth, namePet, petAvatar }) => (
      <li key={_id} className={css.petItem}>
        <button onClick={() => handleDelete(_id)}>
          <TrashIcon color={'#54ADFF'} className={css.deleteIcon} />
        </button>
        <div className={css.petImg}>
          <img src={petAvatar} alt={namePet} width="240" height="240" />
        </div>
        <div>
          <p className={css.text}>
            <span className={css.attributeName}>Name: </span>
            {namePet}
          </p>
          <p className={css.text}>
            <span className={css.attributeName}>Date of birth: </span>
            {dateOfBirth}
          </p>
          <p className={css.text}>
            <span className={css.attributeName}>Breed: </span>
            {breed}
          </p>
          <p className={css.text}>
            <span className={css.attributeName}>Comments: </span>
            {comments}
          </p>
        </div>
      </li>
    )
  );

  return (
    <>
      {petCards}
      {isModalOpen && (
        <ModalDeletePet
          onCloseModal={handleCloseModal}
          selectedPetId={selectedPetId}
          onDeleteSuccess={handleDeleteSuccess}
        />
      )}
    </>
  );
};

export default PetsItem;
