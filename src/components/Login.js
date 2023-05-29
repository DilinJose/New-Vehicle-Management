import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { validateLogin } from '../actions';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('username is Required'),

  pswd: Yup.string()
    .required('Enter the password')
    .min(5, 'password might be minimum 5 character')
    .max(20, 'too long'),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const initialValues = {
    email: '',
    pswd: '',
  };

  return (
    <section className="background">
      <div
        className="container-fluid h-custom "
        style={{ marginBottom: '150px' }}
      >
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h1 className="align-center">Admin Login Page</h1>
            <div className="mt-4">
              <Formik
                initialValues={initialValues}
                validationSchema={LoginSchema}
                onSubmit={(values, { resetForm }) => {
                  resetForm({ values: '' });
                  dispatch(validateLogin(values, history));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <label htmlFor="email" style={{ fontWeight: '700' }}>
                          Enter username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Enter Your username"
                        />

                        {errors.email && touched.email ? (
                          <div className="text-danger">{errors.uname}</div>
                        ) : null}
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="pswd" style={{ fontWeight: '700' }}>
                          Enter Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="pswd"
                          name="pswd"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.pswd}
                          placeholder="Enter Your passWord"
                        />

                        {errors.pswd && touched.pswd ? (
                          <div className="text-danger">{errors.pswd}</div>
                        ) : null}
                      </div>

                      <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                        <Link to="/signup" className="btn btn-secondary">
                          Back
                        </Link>
                      </div>
                    </form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
