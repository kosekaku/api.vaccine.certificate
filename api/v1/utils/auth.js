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



// pagination for user data printed to return
const pagination = (req, res, dataToPaginate) => {
  const pageCount = Math.ceil(dataToPaginate.rows.length / 20);
  let page = parseInt(req.query.page, 16);
  if (!page) { page = 1; }
  if (page > pageCount) {
    page = pageCount;
  }
  res.status(200).json({
    status: 200,
    message: 'Operation successful',
    pages: `${page} of ${pageCount}`,
    data: dataToPaginate.rows.slice(page * 20 - 20, page * 20),
  });
};

export {
  hashPassword, generateTokens, veryfyPassword, pagination,
};
