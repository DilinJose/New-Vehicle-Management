import { combineReducers } from 'redux';

const initialValue = {
  vehicleManagementData: [],
  serviceManagementData: [],
};

export const vehicleMangementReducers = (state = initialValue, action) => {
  switch (action.type) {
    case 'GET_VEHICLE_DATA':
      return {
        ...state,
        vehicleManagementData: action.payload,
      };
    case 'GET_SERVICE_DATA':
      
      return {
        ...state,
        serviceManagementData: action.payload,
      };
    default:
      return state;
  }
};

export const loginCredReducers = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  vehicleMangement: vehicleMangementReducers,
  loginCred: loginCredReducers,
});
