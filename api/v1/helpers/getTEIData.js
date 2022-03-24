import axios from 'axios';
import { auth } from '../utils/authConfig';
import { getTEIDataURL } from '../Constants/apiURL';
import { notFound, success, tryCatchExceptions } from './messages';

const TEIData = async (teiId, res) => {
  try {
    const urlTEI = getTEIDataURL(teiId);
    const response = await axios.get(urlTEI, {
      auth,
    });
    if (!response) return notFound(res);
    const { attributes, enrollments } = response.data;
    if (!enrollments.length) return notFound(res);
    enrollments.map(
      ({ program, status, enrollmentStatus, events }, indexTei) => {
        // get users enrolled to only vaccine program
        if (program !== 'yDuAzyqYABS') return notFound(res);
        if (!events.length) return notFound(res);
        const filteredEvents = events.map(
          (
            {
              status,
              enrollmentStatus,
              dataValues,
              eventDate,
              orgUnitName,
              length,
            },
            indexFE
          ) => {
            if (dataValues.length !== 0) {
              return { eventDate, orgUnitName, dataValues };
            }
          },
        ); // end filter events
        if (!filteredEvents || filteredEvents.length === 0) {
          return notFound(res); // no events
        }
        // filtered results to sent to client
        const data = {
          teiId,
          attributes,
          enrollments: filteredEvents,
        };
        success(res, data);
      },
    );
  } catch (error) {
    return tryCatchExceptions(res, error);
  }
};

export { TEIData };
