import dotenv from 'dotenv';

dotenv.config();
const {
  NODE_ENV,
  // dev
  HOST_DEV,
  PORT_DEV,
  DHIS2_API_URL_OU_DEV,
  DHIS2_API_URL_TEI_DEV,
  DHIS2_API_URL_TEI_VERIFY_DEV,
  DHIS2_API_USERNAME_DEV,
  DHIS2_API_PASSWORD_DEV,
  // prod
  HOST,
  PORT,
  DHIS2_API_URL_OU,
  DHIS2_API_URL_TEI,
  DHIS2_API_URL_TEI_VERIFY,
  DHIS2_API_USERNAME,
  DHIS2_API_PASSWORD,
} = process.env;

let envs;
let axiosAuth;
let apiURLs;
if (process.env.NODE_ENV === 'development') {
  // load dev configurations
  console.log('UTILS config>', process.env.NODE_ENV);
  envs = {
    PORT,
    HOST,
    DHIS2_API_URL_OU,
    DHIS2_API_URL_TEI,
    DHIS2_API_URL_TEI_VERIFY,
    DHIS2_API_USERNAME_DEV,
    DHIS2_API_PASSWORD_DEV,
  };

  // DHIS2 api endpoints
  apiURLs = {
    DHIS2_API_BASE_URL: 'https://southsudanhis.org/covid19southsudan',
    DHIS2_API_URL_OU_DEV,
    DHIS2_API_URL_TEI_DEV,
    DHIS2_API_URL_TEI_VERIFY_DEV,
  };

  // axios authernication signature
  axiosAuth = {
    username: DHIS2_API_USERNAME_DEV,
    password: DHIS2_API_PASSWORD_DEV,
  };
} else {
  // load data, production config
  // DHIS2 api endpoints
  apiURLs = {
    DHIS2_API_BASE_URL: 'https://southsudanhis.org',
    DHIS2_API_URL_OU,
    DHIS2_API_URL_TEI,
    DHIS2_API_URL_TEI_VERIFY,
  };

  // axios authernication signature
  axiosAuth = {
    username: DHIS2_API_USERNAME,
    password: DHIS2_API_PASSWORD,
  };
}

const DHIS2_API_BASE_URL = apiURLs;
const auth = axiosAuth;

export { auth, DHIS2_API_BASE_URL };

// import dotenv from 'dotenv';

// dotenv.config();
// const {
//   DHIS2_API_USERNAME,
//   DHIS2_API_PASSWORD,
//   DHIS2_API_USERNAME_DEV,
//   DHIS2_API_PASSWORD_DEV,
// } = process.env;

// const auth = {
//   username: DHIS2_API_USERNAME_DEV,
//   password: DHIS2_API_PASSWORD_DEV,
// };

// const authProd = {
//   username: DHIS2_API_USERNAME,
//   password: DHIS2_API_PASSWORD,
// };

// export { auth, authProd };
