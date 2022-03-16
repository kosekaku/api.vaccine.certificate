import express from 'express';
import {
  getFacilities,
  searchTrackedEntityInstances,
} from '../controllers/usersCertificate';
import { verifyCertificate } from '../controllers/verifyCertificate';
import { CertifcateAttributesValidate } from '../middlewares/joiValidations';
import { getTrackedEntityInstances, certificateStatus } from '../middlewares/usersCertificate';
import { getPrints, login, postPrints } from '../controllers/certificateMonitor';
import { veryfyTokens } from '../middlewares/auth';

const router = express.Router();
router.get('/facilities', getFacilities);
router.get('/teis', CertifcateAttributesValidate, getTrackedEntityInstances, searchTrackedEntityInstances);
router.get('/teis/verify/:teiId', verifyCertificate);
router.get('/teis/prints', veryfyTokens, getPrints);
router.post('/login', login);
router.post('/teis/prints', certificateStatus, postPrints);

export default { router };