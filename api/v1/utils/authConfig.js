import dotenv from 'dotenv';

dotenv.config();
const {
  DHIS2_API_USERNAME,
  DHIS2_API_PASSWORD,
  DHIS2_API_USERNAME_DEV,
  DHIS2_API_PASSWORD_DEV,
} = process.env;

const auth = {
  username: DHIS2_API_USERNAME_DEV,
  password: DHIS2_API_PASSWORD_DEV,
};

const authProd = {
  username: DHIS2_API_USERNAME,
  password: DHIS2_API_PASSWORD,
};

export { auth, authProd };
