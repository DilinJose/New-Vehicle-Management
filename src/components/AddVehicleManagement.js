import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postVehicleManagement, editVehicleManagement } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';

const AddVehicleManagement = () => {
  const [selectedModel, setSelectedmodel] = useState();


  const dispatch = useDispatch();
  const { id } = useParams();

  const { vehicleManagementData } = useSelector(
    (state) => state.vehicleMangement
  );
  let editableData = vehicleManagementData.find((data) => data.id === +id);

  const history = useNavigate();

  let initialValues;
  id
    ? (initialValues = editableData)
    : (initialValues = {
        vehicleNo: '',
        model: '',
        variant: '',
        vinNumber: '',
        rcNumber: '',
        purchaseDate: '',
      });

  const validationSchema = Yup.object({
    vehicleNo: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    model: Yup.string().required('Required'),
    variant: Yup.string().required('Required'),
    vinNumber: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    rcNumber: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    purchaseDate: Yup.date().required('Required'),
  });
  return (
    <div>
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => history('/vehiclemanagement')}
        >
          Back
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          resetForm({ values: '' });
          values = { ...values };

          if (id) {
            dispatch(
              editVehicleManagement(`postVehicleManagement/${id}`, values)
            );
          } else {
            dispatch(postVehicleManagement('postVehicleManagement/', values));
          }

          history('/vehiclemanagement');
        }}
      >
        <Form>
          <div className="add-vehicle-form">
            <h2 className="text-center ">Add Vehicle Data</h2>

            <div className="management-form">
              <Field
                className="form-control"
                name="vehicleNo"
                type="text"
                placeholder="Vahicle Number"
              />
              <ErrorMessage
                name="vehicleNo"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                name="model"
                as="select"
                className="form-control my-select"
                onClick={(e) => setSelectedmodel(e.target.value)}
              >
                <option value="">-- Selet a model -- </option>
                <option value="Maruti">Maruti </option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
              </Field>
              <ErrorMessage
                name="model"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                name="variant"
                as="select"
                className="form-control my-select"
              >
                <option value="">-- Selet a variant -- </option>
                <option value="Ignis">Ignis</option>
                <option value="Wagon R">Wagon R</option>
                <option value="Swift">Swift</option>
                <option value="GenX">GenX</option>
                <option value="Tiago">Tiago</option>
                <option value="Scorpio">Scorpio</option>
                <option value="Alturas">Alturas</option>
              </Field>
              <ErrorMessage
                name="variant"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                className="form-control"
                name="vinNumber"
                type="text"
                placeholder="VIN Number"
              />
              <ErrorMessage
                name="vinNumber"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                className="form-control"
                name="rcNumber"
                type="text"
                placeholder="RC Number"
              />
              <ErrorMessage
                name="rcNumber"
                component="div"
                className="error-message"
              />
            </div>

            <div className="management-form">
              <Field
                className="form-control"
                name="purchaseDate"
                type="date"
                placeholder="Purchase Data"
              />
              <ErrorMessage
                name="purchaseDate"
                component="div"
                className="error-message"
              />
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

export default AddVehicleManagement;
