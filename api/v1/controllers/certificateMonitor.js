import uuidV1 from 'uuid/v1';
import Users from '../models/Users';
import CertificatePrintCount from '../models/CertificatePrintCount';
import {
  generateTokens, hashPassword, veryfyPassword, pagination,
} from '../utils/auth';
import {
  accessDenied,
  notFound,
  somethingWrongErr,
  success,
} from '../helpers/messages';

const { DEFAULT_EMAIL, DEFAULT_PASSWORD } = process.env;
// perform monitering certificates printed here
// CertificatePrintCount.deleteTable();
const getPrints = async (req, res) => {
  // get users
  const users = await CertificatePrintCount.getAllPrints();
  if (users.rows.length === 0) return notFound(res);
  return success(res, users.rows);
};

// post prints
const postPrints = async (req, res) => {

  // get users
  const { uniqueId, fullName, occupation, dob, address } = req.data;
  const users = new CertificatePrintCount(
    uniqueId,
    fullName,
    occupation,
    dob,
    address,
    new Date(),
  );
  const storeUsers = await users.storeCertificatePrint();
  if (storeUsers.rows === 0) return somethingWrongErr(res); // data not posted
  console.log('posting prints info', storeUsers.rows);
  return success(res); // don't return data-> success
};

// signin
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = email; // if user entered id instead of email
    // get db password
    const user = await Users.getUsers(email, userId);
    if (user.rows.length === 0) {
      // bug for admin login, account is created on the first login tries for the provided default email and password in the env
      const userDefault = new Users(
        DEFAULT_EMAIL,
        uuidV1(),
        'kose dev',
        hashPassword(DEFAULT_PASSWORD),
        'admin',
        new Date(),
      );

      // if (email !== DEFAULT_EMAIL) null;
      await userDefault.createAccount(); // create default account
      return accessDenied(res); // BUGGY for the admin user- no login user
    }
    const { full_name: fullName, role, password: dbPassword } = user.rows[0];
    // verify password
    const status = await veryfyPassword(password, dbPassword);
    console.log('SOMETHING......', status);

    if (!status) return accessDenied(res);
    // get some user attributes and send to client

    // generate access tokens
    const data = {
      token: generateTokens(email, fullName, role),
    };
    return success(res, data);
  } catch (error) {
    console.log('some error occured', error.message);
    return somethingWrongErr(res);
  }
}; // end signin

// create user to monitor prints
const signup = async (req, res) => {
  // TODO
  // ensure user has admin token to create a user
};
export { getPrints, postPrints, login };
