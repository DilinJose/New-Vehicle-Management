import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PrivateRouting = () => {
  let auth = JSON.parse(sessionStorage.getItem('loginPayload'));

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouting;
