import JOI from 'joi';
import { joiError } from '../helpers/messages';

const CertifcateAttributesValidate = (req, res, next) => {
  const schema = {
    organizationUnit: JOI.string().required().label('Vaccination Center'),
    lastUpdatedStartDate: JOI.string().required().label('Vaccination Date'),
    lastUpdatedEndDate: JOI.string().required().label('Vaccination Date'),
    phone: JOI.string().required().min(9).max(12)
      .label('Phone Number'),
    uniqueId: JOI.string().required().label('Unique Id'),
    pageSize: JOI.number().required().min(10).max(200)
      .label('Page Size'),
  };
  const { error } = JOI.validate(req.query, schema);
  if (error) return joiError(error, res);
  next();
};

export { CertifcateAttributesValidate };
