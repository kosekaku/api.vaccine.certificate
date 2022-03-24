import axios from 'axios';
import { somethingWrongErr } from '../helpers/poeMessages';

// handle unexpected errors globally using axios interceptors
axios.interceptors.response.use(null, (error) => {
  const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
  if (expectedErrors) {
    console.log('some axios interceptor error', error.message);
    return error.message;
    // return somethingWrongErr(res);
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
