import { object, string, number, mixed } from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { BsGenderFemale } from 'react-icons/bs';
import { IoMaleOutline } from 'react-icons/io5';

// BsGenderFemale;
// IoMaleOutline;

import PawIcon from 'images/icons/AddPetPageIcons/PawIcon';

import css from '../AddPetPage.module.scss';

// const citiesRegex =
//   /^[a-zA-Z\\u0080-\\u024F.]+((?:[ -.|'])[a-zA-Z\\u0080-\\u024F]+)*$/;

const ThirdStep = ({ next, prev, data, setStatus, currentStep }) => {
  const isRightSize = file => {
    // console.log('Выполняется проверка файла');
    console.log(file.size);
    return file.size <= 3000000;
  };

  const schema = object({
    price: data.category === 'sell' ? number().min(0).required() : number(),
    sex:
      data.category !== 'your pet'
        ? string().required('Choose male or female')
        : string(),
    location:
      data.category !== 'your pet'
        ? string('location must be a string')
            // .matches(citiesRegex, 'Location should be in the form of a city')
            .required('Enter a city')
        : string('location must be a string'),
    // .matches(
    //   citiesRegex,
    //   'Location should be in the form of a city'
    // ),
    image: mixed()
      .required('You need to provide a image')
      .test('fileSize', 'File must be less than 3 MB', isRightSize),
    comments: string('Comment must be a string').min(8).max(120),
  });

  const handleSubmit = (values, formik) => {
    setStatus(prev => ({
      ...prev,
      thirdIndicator: 'completed',
    }));
    console.log('values', values);
    next(values, true, formik);
  };

  const onCancelBtnClick = values => {
    prev(values);

    setStatus(prev => ({
      ...prev,
      secondIndicator: 'current',
      thirdIndicator: 'coming',
    }));
  };

  //  className={
  //                 data.category !== 'your pet' && errors.comments
  //                   ? css.textareaThirdStep
  //                   : css.commentTextarea
  //               }

  const getCommentsInputClass = ({ category }, { comments }) => {
    if (category !== 'your pet') return css.textareaThirdStep;

    if (category !== 'your pet' && comments)
      return `${css.textareaThirdStep} ${css.error}`;

    if (comments) return `${css.commentTextarea} ${css.error}`;

    return css.commentTextarea;
  };

  return (
    <Formik
      initialValues={data}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue }) => (
        <Form className={css.formStepThree}>
          <div
            className={
              data.category !== 'your pet' ? css.thirdStepFormWrap : ''
            }
          >
            <div>
              {data.category !== 'your pet' && (
                <>
                  <p className={css.inputLabel}>The sex</p>
                  <div className={css.sexWrap}>
                    <label
                      htmlFor="female"
                      className={
                        values.sex === 'female'
                          ? css.activeFemaleSexLabel
                          : css.sexLabel
                      }
                    >
                      <BsGenderFemale
                        size={24}
                        color={`${
                          values.sex === 'female' || values.sex === ''
                            ? '#F43F5E'
                            : '#888888'
                        }`}
                      />
                      Female
                    </label>
                    <Field
                      type="radio"
                      name="sex"
                      value="female"
                      className={css.sexInput}
                      id="female"
                    />
                    <label
                      htmlFor="male"
                      className={
                        values.sex === 'male'
                          ? css.activeMaleSexLabel
                          : css.sexLabel
                      }
                    >
                      <IoMaleOutline
                        size={24}
                        color={`${
                          values.sex === 'male' || values.sex === ''
                            ? '#54ADFF'
                            : '#888888'
                        }`}
                      />
                      Male
                    </label>
                    <Field
                      type="radio"
                      name="sex"
                      value="male"
                      className={css.sexInput}
                      id="male"
                    />
                  </div>
                  <ErrorMessage
                    className={css.errMessage}
                    component="p"
                    name="sex"
                  />
                </>
              )}
              <div
                className={
                  data.category === 'your pet'
                    ? css.addImgWrap
                    : css.addImgThirdStepWrap
                }
              >
                <p className={css.inputLabel}>
                  {/* {data.category === 'your pet'
                    ? 'Add photo'
                    : 'Load the pet’s image:'} */}
                  Add photo
                </p>
                <label
                  htmlFor="image"
                  className={
                    errors.image ? `${css.addImg} ${css.addImgErr}` : css.addImg
                  }
                >
                  {values.image ? (
                    <img
                      width="100%"
                      src={URL.createObjectURL(values.image)}
                      alt="pet"
                    />
                  ) : (
                    <AiOutlinePlus size={30} color="#54ADFF" />
                  )}
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className={css.addImgInput}
                  onChange={e => setFieldValue('image', e.target.files[0])}
                />
              </div>
              <ErrorMessage
                className={css.errMessage}
                component="p"
                name="image"
              />
            </div>

            <div
              className={
                data.category !== 'your pet' ? css.thirdStepInputwrap : ''
              }
            >
              {data.category !== 'your pet' && (
                <>
                  <label
                    htmlFor="location"
                    className={css.inputLabel}
                    placeholder="Type name pet"
                  >
                    Location
                  </label>
                  <Field
                    name="location"
                    id="location"
                    className={
                      errors.location ? `${css.input} ${css.error}` : css.input
                    }
                    placeholder="Type of location"
                  />
                  <ErrorMessage
                    className={css.errMessage}
                    component="p"
                    name="location"
                  />
                </>
              )}

              {data.category === 'sell' && (
                <>
                  <label htmlFor="price" className={css.inputLabel}>
                    Price
                  </label>
                  <Field
                    name="price"
                    id="price"
                    className={
                      errors.price ? `${css.input} ${css.error}` : css.input
                    }
                    placeholder="Type of price"
                  />
                  <ErrorMessage
                    className={css.errMessage}
                    component="p"
                    name="price"
                  />
                </>
              )}

              <label htmlFor="comments" className={css.inputLabel}>
                Comments
              </label>
              <Field
                as="textarea"
                name="comments"
                id="comments"
                className={getCommentsInputClass(data, errors)}
                placeholder="Type breed"
              />
              <ErrorMessage
                className={css.errMessage}
                component="p"
                name="comments"
              />
            </div>
          </div>

          <div className={css.btnsThirdStepWrap}>
            <button className={css.nextBtn} type="submit">
              Done
              <PawIcon />
            </button>
            <button
              className={css.cancelBtn}
              type="button"
              onClick={() => onCancelBtnClick(values)}
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

export default ThirdStep;
