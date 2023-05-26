import { Formik, Field, Form } from 'formik';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import PawIcon from 'images/icons/AddPetPageIcons/PawIcon';

import css from '../AddPetPage.module.scss';

const FirstStep = ({ data, next, setStatus, currentStep }) => {
  const location = useLocation();

  const handleSubmit = values => {
    setStatus(prev => ({
      ...prev,
      firstIndicator: 'completed',
      secondIndicator: 'current',
    }));
    next(values);
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form
          className={
            currentStep === 0 ? `${css.form} ${css.formStepOne}` : css.form
          }
        >
          <label
            htmlFor="your pet"
            className={
              values.category === 'your pet'
                ? css.activeCategoryLabel
                : css.categoryLabel
            }
          >
            your pet
          </label>
          <Field
            type="radio"
            name="category"
            value="your pet"
            className={css.category}
            id="your pet"
          />

          <label
            htmlFor="sell"
            className={
              values.category === 'sell'
                ? css.activeCategoryLabel
                : css.categoryLabel
            }
          >
            sell
          </label>
          <Field
            type="radio"
            name="category"
            value="sell"
            className={css.category}
            id="sell"
          />

          <label
            htmlFor="lost-found"
            className={
              values.category === 'lost-found'
                ? css.activeCategoryLabel
                : css.categoryLabel
            }
          >
            lost/found
          </label>
          <Field
            type="radio"
            name="category"
            value="lost-found"
            className={css.category}
            id="lost-found"
          />

          <label
            htmlFor="for-free"
            className={
              values.category === 'for-free'
                ? css.activeCategoryLabel
                : css.categoryLabel
            }
          >
            in good hands
          </label>
          <Field
            type="radio"
            name="category"
            value="for-free"
            className={css.category}
            id="for-free"
          />

          <div className={css.btnsFirstStepWrap}>
            <button className={css.nextBtn} type="submit">
              Next
              <PawIcon />
            </button>
            <Link className={css.cancelBtn} to={location.state?.from || '/'}>
              <BiArrowBack color="#54ADFF" size={24} />
              Cancel
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FirstStep;
