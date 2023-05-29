import { instance } from './api/Instance';

export const getDataFromJson = (url) => instance.get(url);

export const postDataToJson = (url, data) => instance.post(url, data);

export const deleteDataFromJson = (url) => instance.delete(url);

export const editDataInJson = (url, data) => instance.put(url, data);

export const updateData = (url, data) => instance.patch(url, data);
