import express from 'express';
import {
  getFacilities,
  searchTrackedEntityInstances,
} from '../controllers/usersCertificate';
import { verifyCertificate } from '../controllers/verifyCertificate';
import { CertifcateAttributesValidate } from '../middlewares/joiValidations';
import { getTrackedEntityInstances } from '../middlewares/usersCertificate';

const router = express.Router();
router.get('/facilities', getFacilities);
router.get('/teis', CertifcateAttributesValidate, getTrackedEntityInstances, searchTrackedEntityInstances);
router.get('/teis/verify/:teiId', verifyCertificate);

export default { router };
