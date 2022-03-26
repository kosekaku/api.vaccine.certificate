import JOI from 'joi';
import { joiError } from '../helpers/messages';

const CertifcateAttributesValidate = (req, res, next) => {
  const schema = {
    uniqueId: JOI.string().required().label('Unique Vaccination Id'),
    phone: JOI.string().required().min(9).max(12)
      .label('Phone Number'),
  };
  const { error } = JOI.validate(req.query, schema);
  if (error) return joiError(error, res);
  next();
};

export { CertifcateAttributesValidate };
