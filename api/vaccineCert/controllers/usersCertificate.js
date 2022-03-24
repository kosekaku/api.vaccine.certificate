/* eslint-disable max-len */
import axios from 'axios';
import { success, notFound, tryCatchExceptions } from '../helpers/messages';
import { auth } from '../../commons/utils/authConfig';
import { getFacilitiesURL } from '../../commons/constants/vaccineCertURL';
import { TEIData } from '../helpers/getTEIData';

// get all organization units from dhis2
const getFacilities = async (req, res) => {
  try {
    const url = getFacilitiesURL();
    const response = await axios.get(url, {
      auth,
    });
    if (!response) return notFound(res);
    const { status, data } = response;
    if (status !== 200) return notFound(res);
    const { organisationUnits } = data;
    return success(res, organisationUnits);
  } catch (error) {
    return tryCatchExceptions(res, error);
  }
};

// get tei events return from middleware
const getTEIData = async (req, res) => {
  try {
    const { teiId } = req.data;
    TEIData(teiId, res);
  } catch (error) {
    tryCatchExceptions(res, error);
  }
};

export { getFacilities, getTEIData }; // named exports
