import {
  getDataFromJson,
  postDataToJson,
  deleteDataFromJson,
  editDataInJson,
  updateData,
} from '../Services';
import CryptoJS from 'crypto-js';

//Get vehicle details
export const getVehicleManagement = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);

  dispatch({
    type: 'GET_VEHICLE_DATA',
    payload: data,
  });
};

//Get service details
export const getServiceManagement = (url) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  dispatch({
    type: 'GET_SERVICE_DATA',
    payload: data,
  });
};

//Edit vehicle details
export const editVehicleManagement = (url, data) => async (dispatch) => {
  await editDataInJson(url, data);
  dispatch(getVehicleManagement('postVehicleManagement/'));
};

//Edit service details
export const editServiceManagement = (url, data) => async (dispatch) => {
  await editDataInJson(url, data);
  dispatch(getServiceManagement('postServiceManagement/'));
};

//Delete vehicle details
export const deleteVehicleManagement = (url) => async (dispatch) => {
  await deleteDataFromJson(url);
  dispatch(getVehicleManagement('postVehicleManagement/'));
};

//Delete service details
export const deleteServiceManagement = (url) => async (dispatch) => {
  await deleteDataFromJson(url);
  dispatch(getServiceManagement('postServiceManagement/'));
};

//Post vehicle details
export const postVehicleManagement = (url, data) => async (dispatch) => {
  await postDataToJson(url, data);
  dispatch(getVehicleManagement('postVehicleManagement/'));
};

//Post Service  details
export const postServiceManagement = (url, data) => async (dispatch) => {
  await postDataToJson(url, data);
  dispatch(getServiceManagement('postServiceManagement/'));
};

//Post Signup  details
export const postSignupData = (url, data, history) => async (dispatch) => {
  
  await postDataToJson(url, data);
  history('/');
};

export const postChangePassword = (url, data) => async (dispatch) => {
  await updateData(url, data);
};

export const ChangePassword = (url, values, history) => async (dispatch) => {
  const { data } = await getDataFromJson(url);
  console.log('data', data)

  var bytes = CryptoJS.AES.decrypt(data.phNo, 'secret key 123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


  if (decryptedData === values.currentPassword) {
    alert('correct password');
    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(values.newPassword),
      'secret key 123'
    ).toString();
    dispatch(
      postChangePassword(`signupcredentials/${data.id}`, {
        ...data,
        phNo: ciphertext,
      })
    );
    history('/');
    alert('password changed');
  } else {
    alert('Password does not match');
  }
};

export const validateLogin = (values, history) => async (dispatch) => {
  const { data } = await getDataFromJson('signupcredentials/');

  const getSignupData = data.find((d) => d.email === values.email);

  if (getSignupData) {
    var bytes = CryptoJS.AES.decrypt(getSignupData.phNo, 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (decryptedData === values.pswd) {
      sessionStorage.setItem('loginPayload', JSON.stringify(getSignupData.id));
      history('/dashboard');
    } else {
      alert('invalid pswd');
    }
  } else {
    alert('invalid email');
  }
};
