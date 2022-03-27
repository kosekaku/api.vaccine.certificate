import Joi from 'joi';
import { joiError } from '../helpers/messages';

const CertifcateAttributesValidate = (req, res, next) => {
  const schema = Joi.object({
    uniqueId: Joi.string().required().label('Unique Vaccination Id'),
    phone: Joi.string().required().min(9).max(12)
      .label('Phone Number'),
  });
  const { error } = schema.validate(req.query);
  if (error) return joiError(error, res);
  next();
};

export { CertifcateAttributesValidate };
