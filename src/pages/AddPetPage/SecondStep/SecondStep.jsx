import { object, string } from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { BiArrowBack } from 'react-icons/bi';

import PawIcon from 'images/icons/AddPetPageIcons/PawIcon';

import css from '../AddPetPage.module.scss';

const dateRegex =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/g;

const SecondStep = ({ data, next, prev, setStatus }) => {
  const schema = object({
    title:
      data.category !== 'your pet'
        ? string('Title must be a string').required('Enter a title')
        : string(),
    namePet: string('Name must be a string')
      .min(2, 'Min name`s length - two characters')
      .max(16, 'Max name`s length - sixteen characters')
      .required('Enter a name'),
    dateOfBirth: string('Date of birth must be a string')
      .required('Enter a date of birth')
      .matches(dateRegex, "The date must be in the format: 'DD.MM.YYYY'"),
    breed: string('Breeed must be a string').required('Enter a breed'),
  });

  const handleSubmit = values => {
    setStatus(prev => ({
      ...prev,
      secondIndicator: 'completed',
      thirdIndicator: 'current',
    }));
    next(values);
  };

  const onCancelBtnClick = values => {
    prev(values);

    setStatus(prev => ({
      ...prev,
      firstIndicator: 'current',
      secondIndicator: 'coming',
    }));
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, errors }) => (
        <Form className={css.form}>
          {data.category !== 'your pet' && (
            <>
              <label className={css.inputLabel} htmlFor="title">
                Title of add
              </label>
              <Field
                name="title"
                id="title"
                placeholder="Title of add"
                className={
                  errors.title ? `${css.input} ${css.error}` : css.input
                }
              />
              <ErrorMessage
                className={css.errMessage}
                component="p"
                name="title"
              />
            </>
          )}
          <label htmlFor="namePet" className={css.inputLabel}>
            Name pet
          </label>
          <Field
            name="namePet"
            id="namePet"
            placeholder="Type name pet"
            className={errors.namePet ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage
            className={css.errMessage}
            component="p"
            name="namePet"
          />

          <label htmlFor="dateOfBirth" className={css.inputLabel}>
            Date of birth
          </label>
          <Field
            name="dateOfBirth"
            id="dateOfBirth"
            placeholder="Type date of birth"
            className={
              errors.dateOfBirth ? `${css.input} ${css.error}` : css.input
            }
          />
          <ErrorMessage
            className={css.errMessage}
            component="p"
            name="dateOfBirth"
          />

          <label htmlFor="breed" className={css.inputLabel}>
            Breed
          </label>
          <Field
            name="breed"
            id="breed"
            placeholder="Type breed"
            className={errors.breed ? `${css.input} ${css.error}` : css.input}
          />
          <ErrorMessage className={css.errMessage} component="p" name="breed" />

          <div
            className={
              data.category === 'your pet'
                ? css.btnsStepTwoYourPetWrap
                : css.btnsWrap
            }
          >
            <button type="submit" className={css.nextBtn}>
              Next
              <PawIcon />
            </button>
            <button
              type="button"
              onClick={() => onCancelBtnClick(values)}
              className={css.cancelBtn}
            >
              <BiArrowBack color="#54ADFF" size={24} />
              Back
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SecondStep;
