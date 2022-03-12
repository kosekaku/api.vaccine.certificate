import axios from 'axios';
import { auth, authProd } from '../utils/authConfig';
import { notFound, success, tryCatchExceptions } from '../helpers/messages';

const verifyCertificate = async (req, res) => {
  try {
    // send api request to DHIS2 tei
    const { teiId } = req.params;
    console.log('CERT PArama', teiId);
    const verifyURL = `https://southsudanhis.org/covid19southsudan/api/trackedEntityInstances/${teiId}.json?ou=OV9zi20DDXP&ouMode=DESCENDANTS&program=yDuAzyqYABS&programStage=a1jCssI2LkW&lastUpdatedStartDate=2021-08-01&lastUpdatedEndDate=2022-01-19&fields=trackedEntityInstance,attributes[attribute,value],enrollments[program,orgUnit,events[status,enrollmentStatus,eventDate,orgUnitName,programStage,dataValues[dataElement,value]]]&pageSize=1&page=`;
    const response = await axios.get(verifyURL, {
      auth,
    });

    if (!response) return notFound(res);
    const { status, data } = response;
    // get only vaccination program
    const vaccinationProgram = data.enrollments.filter(
      ({ program }, index) => program === 'yDuAzyqYABS',
    );
    // filter data to only completed
    const filteredEvent = vaccinationProgram[0].events.filter(
      (
        {
          status,
          enrollmentStatus,
          dataValues,
          eventDate,
          orgUnitName,
          length,
        },
        index
      ) => {
        return status === 'COMPLETED';
      },
    );

    // confirm filtered events
    if (!filteredEvent || filteredEvent.length === 0) return notFound(res); // events not found
    const dataFinal = {
      attributes: data.attributes,
      enrollments: filteredEvent,
    };
    success(res, dataFinal);
  } catch (error) {
    // return any error during data fetching
    if (error.response.status === 404) return notFound(res);
    tryCatchExceptions(res, error);
  }
};

export { verifyCertificate };
