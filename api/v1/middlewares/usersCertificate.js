import axios from 'axios';
import { auth, DHIS2_API_BASE_URL } from '../utils/authConfig';
import { decryptCredential } from '../utils/users';
import CertificatePrintCount from '../models/CertificatePrintCount';
import {
  badRequest,
  notFound,
  somethingWrongErr,
  success,
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
    const { DHIS2_API_BASE_URL: baseUrl } = DHIS2_API_BASE_URL;
    const urlTEI = `${baseUrl}/api/trackedEntityInstances.json?ou=${organizationUnit}&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=${lastUpdatedStartDate}&lastUpdatedEndDate=${lastUpdatedEndDate}&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=${pageSize}&page=`;
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

// moniter prints dashboards
const certificateStatus = async (req, res, next) => {
  try {
    const { uniqueId, fullName, occupation, dob, address } = req.body;
    if (!uniqueId || !fullName || !occupation || !dob || !address) return badRequest(res);
    // check if cert already printed else- update as reprints
    const { rows: data } = await CertificatePrintCount.getPrintCountByUser(
      uniqueId,
    );
    console.log(
      'middleware check if certificate is printed length>0, printed',
      data, req.body,
    );
    if (data.length !== 0) {
      const { print_count: printCount } = data[0];
      const updateData = await CertificatePrintCount.updateCertifcateCount(
        printCount + 1,
        new Date(),
        uniqueId,
      );
      if (!updateData) return somethingWrongErr(res);
      return success(res);
    }
    // post data to database and track count as 0
    req.data = {
      uniqueId,
      fullName,
      occupation,
      dob,
      address,
    };
    next();
  } catch (error) {
    somethingWrongErr(res);
  }
};

export { getTrackedEntityInstances, certificateStatus };
