import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import PrivateRouting from './PrivateRouting';
import VehicleManagement from './VehicleManagement';
import ServiceManagement from './ServiceManagement';
import AddVehicleManagement from './AddVehicleManagement';
import { useDispatch } from 'react-redux';
import { getVehicleManagement, getServiceManagement } from '../actions';
import AddServiceManagement from './AddServiceManagement';
import ChangePasswordForm from './ChangePasswordForm';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVehicleManagement('postVehicleManagement/'));
  }, []);
  useEffect(() => {
    dispatch(getServiceManagement('postServiceManagement/'));
  }, []);
  let loginPayload;


  useEffect(() => {
    loginPayload = JSON.parse(sessionStorage.getItem('loginPayload'));
    if (!loginPayload) {
      loginPayload = null;
      sessionStorage.setItem('loginPayload', loginPayload);
    }
  }, []);

  return (
    <div>
      <Home />

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRouting />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/vehiclemanagement" element={<VehicleManagement />} />

          <Route
            path="/addvehiclemanagement"
            element={<AddVehicleManagement />}
          />

          <Route
            path="/addvehiclemanagement/:id"
            element={<AddVehicleManagement />}
          />
          <Route path="/servicemanagement" element={<ServiceManagement />} />
          <Route
            path="/addservicemanagement"
            element={<AddServiceManagement />}
          />
          <Route
            path="/editservicemanagement/:id"
            element={<AddServiceManagement />}
          />
          <Route path="/changePassword" element={<ChangePasswordForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
