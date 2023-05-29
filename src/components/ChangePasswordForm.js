import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ChangePassword } from '../actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
  const auth = JSON.parse(sessionStorage.getItem('loginPayload'));
  const history = useNavigate();

  const dispatch = useDispatch();
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const validateSchema = Yup.object({
    currentPassword: Yup.string().required('Required'),
    newPassword: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New password is required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('values', values);
          dispatch(
            ChangePassword(`signupcredentials/${auth}`, values, history)
          );
        }}
      >
        <Form>
          <div className="add-vehicle-form">
            <h2 className="text-center">Change Password</h2>
            <div className="management-form">
              <Field
                className="form-control"
                name="currentPassword"
                type="password"
                placeholder="Current Password"
              />
              <ErrorMessage name="currentPassword" />
            </div>
            <div className="management-form">
              <Field
                className="form-control"
                name="newPassword"
                type="password"
                placeholder="New Password"
              />
              <ErrorMessage name="newPassword" />
            </div>
            <div className="management-form">
              <Field
                className="form-control"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassword" />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;
