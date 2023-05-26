// import { object, string, number, date, InferType } from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FirstStep from './FirstStep/FirstStep';
import SecondStep from './SecondStep/SecondStep';
import ThirdStep from './ThirdStep/ThirdStep';

import * as API from 'shared/servises/add-pet-page-api';

// import { fetchAddPet } from 'redux/pets/pets-operations';

import css from './AddPetPage.module.scss';

const initialData = {
  category: 'your pet',
  namePet: '',
  dateOfBirth: '',
  breed: '',
  location: '',
  comments: '',
  title: '',
  sex: '',
  price: '',
  image: '',
};

const initialStatus = {
  firstIndicator: 'current',
  secondIndicator: 'coming',
  thirdIndicator: 'coming',
};

const AddPetPage = () => {
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState(initialStatus);

  const navigate = useNavigate();

  console.log(data);

  const makeRequest = async (resetForm, newData) => {
    console.log(data);
    const values = Object.entries({ ...data, ...newData });
    let formData = new FormData();

    // console.log(values);

    values.forEach(el => {
      // console.log(el[0], el[1]);
      if (el[1] === '') return;

      formData.append(el[0], el[1]);
    });

    formData.forEach(el => console.log(el));

    try {
      console.log('Пошел запрос...');
      if (data.category === 'your pet') {
        await API.postUserPet(formData);

        navigate('/user');
      } else {
        await API.postNotice(formData);

        navigate('/notices/sell');
      }

      resetForm();
      setData(initialData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextStep = (newData, final = false, { resetForm } = {}) => {
    setData(prev => ({ ...prev, ...newData }));

    console.log('final', final);

    if (final) {
      makeRequest(resetForm, newData);

      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = newData => {
    setData(prev => ({ ...prev, ...newData }));
    setCurrentStep(prev => prev - 1);
  };

  const steps = [
    <FirstStep
      next={handleNextStep}
      data={data}
      setStatus={setStatus}
      currentStep={currentStep}
    />,
    <SecondStep
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      setStatus={setStatus}
    />,
    <ThirdStep
      next={handleNextStep}
      prev={handlePrevStep}
      data={data}
      setStatus={setStatus}
      currentStep={currentStep}
    />,
  ];

  const getCurrentTitle = () => {
    if (currentStep === 0) {
      return 'Add pet';
    }

    if (currentStep === 1 || 2) {
      switch (data.category) {
        case 'your pet':
          return 'Add my pet';
        case 'sell':
          return 'Add pet for sell';
        case 'lost-found':
          return 'Add lost pet';
        default:
          return 'Add pet without an owner';
      }
    }
  };

  return (
    <div className={css.container}>
      <div
        className={
          currentStep === 2 && data.category !== 'your pet'
            ? css.formWrapperThirdStep
            : css.formWrapper
        }
      >
        <h1
          className={
            currentStep === 2 && data.category !== 'your pet'
              ? css.titleThirdStep
              : css.title
          }
        >
          {getCurrentTitle()}
        </h1>
        <div className={css.categoryTitleWrapper}>
          <h2 className={`${css.categoryTitle} ${css[status.firstIndicator]}`}>
            Choose option
          </h2>
          <h2 className={`${css.categoryTitle} ${css[status.secondIndicator]}`}>
            Personal details
          </h2>
          <h2 className={`${css.categoryTitle} ${css[status.thirdIndicator]}`}>
            More info
          </h2>
        </div>

        {steps[currentStep]}
      </div>
    </div>
  );
};
export default AddPetPage;
