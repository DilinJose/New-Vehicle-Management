import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postServiceManagement, editServiceManagement } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';

const AddServiceManagement = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState();

  const { serviceManagementData, vehicleManagementData } = useSelector(
    (state) => state.vehicleMangement
  );

  let editableData = serviceManagementData.find(
    (data) => data.id === parseInt(id)
  );

  let initialValues;
  id
    ? (initialValues = editableData)
    : (initialValues = {
        date: '',
        vehicle: '',
        kms: '',
        mode: '',
        serviceCenter: '',
        driver: '',
        type: '',
        serviceNo: '',
        comments: '',
        completed: false,
      });

  const validationSchema = Yup.object({
    date: Yup.date().required('Required'),
    vehicle: Yup.string().required('Required'),
    kms: Yup.number().required('Required'),
    mode: Yup.string().required('Required'),
    serviceCenter: Yup.string().required('Required'),
    driver: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    serviceNo: Yup.number().when('type', {
      is: (type) => type === 'Service',
      then: Yup.number().required('Field is required'),
    }),
    comments: Yup.string().required('Required'),
  });

  return (
    <div>
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => history('/servicemanagement')}
        >
          Back
        </button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: '' });
          if (id) {
            dispatch(
              editServiceManagement(`postServiceManagement/${id}`, values)
            );
          } else {
            dispatch(postServiceManagement('postServiceManagement/', values));
          }

          history('/servicemanagement');
        }}
      >
        <Form>
          <div className="add-vehicle-form">
            <div className="management-form">
              <h2 className="text-center ">Add Service Data</h2>
              <Field className="form-control" name="date" type="date" />
              <ErrorMessage
                name="date"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                name="vehicle"
                as="select"
                className=" form-control my-select"
              >
                <option value="">-- Selet a model -- </option>
                {vehicleManagementData.map((data, index) => (
                  <option key={index} value={data.model}>
                    {data.model}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="vehicle"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                className="form-control"
                name="kms"
                type="text"
                placeholder="Kms"
              />
              <ErrorMessage
                name="kms"
                component="div"
                className="error-message"
              />
            </div>

            <div
              className="management-form"
              role="group"
              aria-labelledby="my-radio-group"
            >
              <div id="my-radio-group">
                Mode :
                <label className="m-2">
                  <Field type="radio" name="mode" value="One" />
                  Paid
                </label>
                <label className="m-2">
                  <Field type="radio" name="mode" value="Two" />
                  Free
                </label>
              </div>
              <ErrorMessage
                name="mode"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                name="serviceCenter"
                as="select"
                className="form-control my-select"
              >
                <option value="">-- Selet a model -- </option>
                <option value="Thrissur">Thrissur </option>
                <option value="Kochi">Kochi</option>
                <option value="Aluva">Aluva</option>
              </Field>
              <ErrorMessage
                name="serviceCenter"
                component="div"
                className="error-message"
              />
            </div>

            <div
              className="management-form"
              role="group"
              aria-labelledby="my-radio-group"
            >
              <div id="my-radio-group">
                Driver Required :
                <label className="m-2">
                  <Field type="radio" name="driver" value="Yes" />
                  Yes
                </label>
                <label className="m-2">
                  <Field type="radio" name="driver" value="No" />
                  No
                </label>
              </div>
              <ErrorMessage
                name="driver"
                component="div"
                className="error-message"
              />
            </div>

            <div
              className="management-form"
              role="group"
              aria-labelledby="my-radio-group"
            >
              <div id="my-radio-group">
                Type :
                <label className="m-2">
                  <Field
                    type="radio"
                    name="type"
                    value="Service"
                    onClick={(e) => setType(e.target.value)}
                  />
                  Service
                </label>
                <label className="m-2">
                  <Field
                    type="radio"
                    name="type"
                    value="Repair"
                    onClick={(e) => setType(e.target.value)}
                  />
                  Repair
                </label>
              </div>
              <ErrorMessage
                name="type"
                component="div"
                className="error-message"
              />
            </div>

            {type === 'Service' ? (
              <div className="management-form">
                <Field
                  className="form-control"
                  name="serviceNo"
                  type="text"
                  placeholder="Service Number"
                />
                <ErrorMessage
                  name="serviceNo"
                  component="div"
                  className="error-message"
                />
              </div>
            ) : null}

            <div className="management-form">
              <Field
                className="form-control"
                name="comments"
                as="textarea"
                placeholder="Comments"
              />
              <ErrorMessage
                name="comments"
                component="div"
                className="error-message"
              />
            </div>
            <div className="management-form">
              <label>
                Service Completed
                <Field className="m-4" name="completed" type="checkbox" />
              </label>
            </div>

            <button className="btn btn-primary m-2" type="submit">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddServiceManagement;
