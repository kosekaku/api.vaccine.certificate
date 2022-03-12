// import axios from 'axios';

// TODO 11/03/2022 DHIS2 services api template

// // handle unexpected errors globally using axios interceptors
// axios.interceptors.response.use(null, (error) => {
//   console.log('axios interceptor starting..');
//   const expectedErrors = (
//     error.response
//     && error.response.status >= 400
//     && error.response.status < 500);

//   if (expectedErrors) return console.log("Error",error.response);
//   return Promise.reject(error);
// });

// export default {
//   get: axios.get,
//   post: axios.post,
//   put: axios.put,
//   patch: axios.patch,
//   delete: axios.delete,
// };
