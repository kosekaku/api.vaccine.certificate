// helper functions for response messages
const tryCatchExceptions = (res, error) => {
  const { httpStatusCode, message } = error;
  return res.json({ status: httpStatusCode, message });
};

const success = (res, data) => {
  res.set('Access-Control-Allow-Origin', '*'); // allow cors, updated 21/09/2020

  res.status(200).json({ status: 200, message: 'Operation successful', data });
};

const dataCreated = (data, res) => {
  return res.status(201).json({ status: 201, message: 'Operation successful, data created', data });
};

// joi validation error messages
const joiError = (errorFound, res) => {
  res.status(400).json({ status: 400, error: errorFound.details[0].message });
};

const somethingWrongErr = (res) => {
  res.status(400).json({ status: 400, error: 'something went wrong, please ensure to provide required data' });
};

const badRequest = (res) => {
  res.status(400).json({ status: 400, error: 'bad request, please ensure you provide correct credentials ' });
};

const accessDenied = (res) => {
  res.status(401).json({ status: 401, error: 'operation denied, authentication failed ' });
};

const forbidden = (res) => {
  res.status(403).json({ status: 403, error: 'operation forbidden, you dont have access rights' });
};

const notFound = (res) => {
  res.status(404).json({ status: 404, error: 'certificate data not found' });
};

const alreadyExist = (data, res) => {
  res.status(409).json({ status: 409, error: `Email ${data} already exist , please try with new credentials` });
};

const serverExceptions = (res, errors) => {
  res.status(500).json({ status: 500, error: errors });
};

export {
  success, dataCreated, notFound, accessDenied, badRequest, alreadyExist, joiError, forbidden,
  serverExceptions,
  somethingWrongErr, tryCatchExceptions,
};
