import axios from 'axios';
import { auth, authProd } from '../utils/authConfig';
import { decryptCredential } from '../utils/users';
import {
  notFound,
  tryCatchExceptions,
} from '../helpers/messages';

// get all tracked entity instances matching organization unit, dates,
const getTrackedEntityInstances = async (req, res, next) => {
  try {
    // send api request to DHIS2
    const {
      organizationUnit,
      lastUpdatedStartDate,
      lastUpdatedEndDate,
      phone,
      uniqueId,
      pageSize,
    } = req.query;

    const urlTEI = `https://southsudanhis.org/covid19southsudan/api/trackedEntityInstances.json?ou=${organizationUnit}&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=${lastUpdatedStartDate}&lastUpdatedEndDate=${lastUpdatedEndDate}&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=${pageSize}&page=`;
    const response = await axios.get(urlTEI, {
      auth,
    });
    if (!response) return null;
    const { status, data } = response;
    if (status !== 200) return null;
    // TODO decrypt user credentials phone and unique Id
    // const encryptedData = ;// uniqueId and phone
    // const decryptedData = decryptCredential();
    // if (!decryptCredential) return console.log('Data decryption not successfull', decryptedData);
    const { trackedEntityInstances } = response.data;
    if (trackedEntityInstances.length === 0) return notFound(res);
    req.data = { uniqueId, phone, trackedEntityInstances };
    next();
  } catch (error) {
    return tryCatchExceptions(res, error);
  }
};

export { getTrackedEntityInstances };
