import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// hash password for safety
const hashPassword = (password) => {
  const salt = 10;
  return bcrypt.hashSync(password, salt);
};

// veryfy password hash
const veryfyPassword = async (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

// json web tokens
const generateTokens = (email, fullName, role) => jwt.sign({
  email, fullName, role,
},
process.env.JWT_SCRETE_KEY,
{
  expiresIn: '1hr',
});


export {
  hashPassword, generateTokens, veryfyPassword,
};
