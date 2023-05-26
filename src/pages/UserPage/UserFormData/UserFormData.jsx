import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';

import instance from 'redux/auth/auth';
import Logout from '../Logout/Logout';
import Loader from '../../../components/Loader/Loader';

import css from './UserFormData.module.css';

import {
  EditIcon,
  CameraIcon,
  CloseIcon,
  ConfirmIcon,
} from 'images/icons/userPageIcons';

import photodefault from 'images/img/userPhotoDefault.png';

const UserFormData = () => {
  const [userData, setUserData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log('isLoading', isLoading);

  const toggleEditable = field => {
    if (activeField === field) {
      setActiveField(null);
    } else {
      setActiveField(field);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await instance.get('/api/user/pets/getAllUserPets');
      setUserData(data.userInfo);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue('image', file);
    setIsSubmitting(false);
  };

  const handleAvatarUpdate = async values => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('image', values.image);
      await instance.patch('/api/auth/users/updateavatar', formData);
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const handleUserDataUpdate = async (values, fieldName) => {
    try {
      const userId = values.id;
      const updatedData = {
        [fieldName]: values[fieldName],
      };

      await instance.put(`/api/auth/users/update/${userId}`, updatedData);
      console.log(updatedData);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleFormSubmit = async values => {
    try {
      setIsSubmitting(true);
      if (values.image) {
        await handleAvatarUpdate(values);
      }

      await handleUserDataUpdate(values, activeField);
      setIsSubmittingData(true);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDeleteClick = setFieldValue => {
    setFieldValue('image', null);
  };

  const DataUser = userData.map(
    ({ _id, name, email, Birthday, Phone, City, avatarURL }, index) => (
      <div key={index}>
        <Formik initialValues={{ id: _id }} onSubmit={handleFormSubmit}>
          {formikProps => (
            <Form autoComplete="off" className={css.form}>
              <div>
                <div className={css.photo}>
                  {formikProps.values.image ? (
                    <img
                      src={URL.createObjectURL(formikProps.values.image)}
                      alt="Preview"
                    />
                  ) : (
                    <img src={avatarURL || photodefault} alt="name" />
                  )}
                </div>

                {(formikProps.values.image && (
                  <div className={css.editPhotoWrapper}>
                    <button type="submit">
                      <ConfirmIcon
                        color={isSubmitting ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>

                    <span className={css.editPhotoTitle}>Confirm</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteClick(formikProps.setFieldValue)
                      }
                    >
                      <CloseIcon color={'#ec1f18'} width={13} height={13} />
                    </button>
                  </div>
                )) || (
                  <label className={css.editPhotoWrapper}>
                    <input
                      className={css.uploadbtn}
                      type="file"
                      accept="image/*"
                      onChange={event =>
                        handleFileChange(event, formikProps.setFieldValue)
                      }
                    />
                    <CameraIcon color={'#54ADFF'} />
                    <span className={css.editPhotoTitle}>Edit photo</span>
                  </label>
                )}
              </div>
              <div className={css.formFieldWrapper}>
                <label className={css.fieldWrapper}>
                  <span className={css.fieldName}>Name:</span>

                  <Field
                    className={css.field}
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formikProps.values.name ?? name}
                    disabled={activeField !== 'name'}
                    autoFocus={activeField === 'name'}
                  />
                  {!activeField || activeField !== 'name' ? (
                    <button
                      type="button"
                      className={css.editBtn}
                      onClick={() => toggleEditable('name')}
                    >
                      <EditIcon color={'#54ADFF'} />
                    </button>
                  ) : (
                    <button className={css.editBtn} type="submit">
                      <ConfirmIcon
                        color={isSubmittingData ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>
                  )}
                  <ErrorMessage name="name" component="div" />
                </label>
                <label className={css.fieldWrapper}>
                  <span className={css.fieldName}>Email:</span>

                  <Field
                    className={css.field}
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    value={formikProps.values.email ?? email}
                    disabled={activeField !== 'email'}
                    autoFocus={activeField === 'email'}
                  />

                  {activeField !== 'email' ? (
                    <button
                      type="button"
                      className={css.editBtn}
                      onClick={() => toggleEditable('email')}
                    >
                      <EditIcon color={'#54ADFF'} />
                    </button>
                  ) : (
                    <button className={css.editBtn} type="submit">
                      <ConfirmIcon
                        color={isSubmittingData ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>
                  )}

                  <ErrorMessage name="email" component="div" />
                </label>
                <label className={css.fieldWrapper}>
                  <span className={css.fieldName}>Birthday:</span>
                  <Field
                    className={css.field}
                    type="text"
                    placeholder="Enter birthday"
                    name="Birthday"
                    value={formikProps.values.Birthday ?? Birthday}
                    disabled={activeField !== 'Birthday'}
                    autoFocus={activeField === 'Birthday'}
                  />
                  {!activeField || activeField !== 'Birthday' ? (
                    <button
                      type="button"
                      className={css.editBtn}
                      onClick={() => toggleEditable('Birthday')}
                    >
                      <EditIcon color={'#54ADFF'} />
                    </button>
                  ) : (
                    <button className={css.editBtn} type="submit">
                      <ConfirmIcon
                        color={isSubmittingData ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>
                  )}
                  <ErrorMessage name="Birthday" component="div" />
                </label>
                <label className={css.fieldWrapper}>
                  <span className={css.fieldName}>Phone:</span>
                  <Field
                    className={css.field}
                    type="text"
                    placeholder="Enter phone"
                    name="Phone"
                    value={formikProps.values.Phone ?? Phone}
                    disabled={activeField !== 'Phone'}
                    autoFocus={activeField === 'Phone'}
                  />
                  {!activeField || activeField !== 'Phone' ? (
                    <button
                      type="button"
                      className={css.editBtn}
                      onClick={() => toggleEditable('Phone')}
                    >
                      <EditIcon color={'#54ADFF'} />
                    </button>
                  ) : (
                    <button className={css.editBtn} type="submit">
                      <ConfirmIcon
                        color={isSubmittingData ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>
                  )}
                  <ErrorMessage name="Phone" component="div" />
                </label>
                <label className={css.fieldWrapper}>
                  <span className={css.fieldName}>City:</span>

                  <Field
                    className={css.field}
                    type="text"
                    placeholder="Enter city"
                    name="City"
                    value={formikProps.values.City ?? City}
                    disabled={activeField !== 'City'}
                    autoFocus={activeField === 'City'}
                  />
                  {!activeField || activeField !== 'City' ? (
                    <button
                      type="button"
                      className={css.editBtn}
                      onClick={() => toggleEditable('City')}
                    >
                      <EditIcon color={'#54ADFF'} />
                    </button>
                  ) : (
                    <button className={css.editBtn} type="submit">
                      <ConfirmIcon
                        color={isSubmittingData ? '#00C3AD' : '#54ADFF'}
                      />
                    </button>
                  )}
                  <ErrorMessage name="City" component="div" />
                </label>
              </div>
            </Form>
          )}
        </Formik>
        <Logout />
      </div>
    )
  );

  return isLoading ? <Loader /> : <>{DataUser}</>;
};

export default UserFormData;
