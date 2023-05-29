import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FileBase64 from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { postSignupData } from '../actions';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  phNo: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'Must be 10 numbers')
    .max(10, 'Must be 10 numbers')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  currentAddress: Yup.string().required('Current address is required'),
  presentAddress: Yup.string().required('Permanent address is required'),
  // images: Yup.array().min(1, 'select at least 1 file'),
});

const Signup = () => {
  const [files, setfiles] = useState('');
  const [error, setError] = useState(false);
  console.log('files', files);

  const dispatch = useDispatch();
  const history = useNavigate();

  const initialValues = {
    name: '',
    phNo: '',
    email: '',
    currentAddress: '',
    presentAddress: '',
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          var ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(values.phNo),
            'secret key 123'
          ).toString();
          resetForm = true;
          values = {
            ...values,
            images: files,
            phNo: ciphertext,
          };
          if (files === '') {
            setError(true);
          } else {
            dispatch(postSignupData('signupcredentials/', values, history));
            history('/');

            setfiles('');
          }
        }}
      >
        <Form>
          <div className="signup-card ">
            <div className="signup-card-label">
              <h1 className="align-center m-3">SignUp Page</h1>
              <div className="signup-label ">
                <Field
                  className="form-control"
                  name="name"
                  type="text"
                  placeholder="Name"
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="name"
                />
              </div>
              <div className="signup-label">
                <Field
                  className="form-control"
                  name="phNo"
                  type="text"
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="phNo"
                />
              </div>

              <div className="signup-label">
                <Field
                  className="form-control"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="email"
                />
              </div>

              <div className="signup-label">
                <h6>Current Address</h6>
                <Field
                  className="form-control"
                  name="currentAddress"
                  placeholder="Current Address"
                  as="textarea"
                  row="1"
                  col="20"
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="currentAddress"
                />
              </div>

              <div className="signup-label">
                <h6>Present Address</h6>
                <Field
                  className="form-control"
                  name="presentAddress"
                  placeholder="Present Address"
                  as="textarea"
                  row="1"
                  col="20"
                />
                <ErrorMessage
                  component="div"
                  className="error-message"
                  name="presentAddress"
                />
              </div>

              <div className="signup-label">
                <label>
                  Choose an image
                  <FileBase64
                    name="images"
                    multiple={false}
                    onDone={(files) => setfiles(files.base64)}
                  />
                </label>
                {error === true && files === '' ? (
                  <label className="text-danger">Image Required</label>
                ) : null}
              </div>
              <div className="signup-label">
                {files ? (
                  <img
                    name="files"
                    src={files}
                    alt="preview"
                    width={150}
                    height={100}
                  />
                ) : null}
              </div>
              <div className="buttons">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
