/* eslint-disable max-len */
import axios from 'axios';
import { success, notFound, tryCatchExceptions } from '../helpers/messages';
import { auth, DHIS2_API_BASE_URL } from '../utils/authConfig';

const { DHIS2_API_BASE_URL: baseUrl } = DHIS2_API_BASE_URL;
const urlDHIS2Facilities = `${baseUrl}/api/33/programs/yDuAzyqYABS/organisationUnits?fields=id, name, level,ancestors[id, name, level]`;

// get all organization units from dhis2
const getFacilities = async (req, res) => {
  try {
    // send api request to DHIS2
    const response = await axios.get(urlDHIS2Facilities, {
      auth,
    });
    if (!response) return null;
    const { status, data } = response;
    if (status !== 200) return null; // throw error
    const { organisationUnits } = data;
    return success(res, organisationUnits);
  } catch (error) {
    // return any error during data fetching
    return tryCatchExceptions(res, error);
  }
};

// search tei return from middleware
const searchTrackedEntityInstances = async (req, res) => {
  try {
    const { uniqueId, phone, trackedEntityInstances } = req.data; // get data from middleware

    // filter data based on user id, first name & phone combination, or etc combinaton
    trackedEntityInstances.map((data, indexTei) => {
      // get users enrolled to only vaccine program
      const vaccinationProgram = data.enrollments.filter(
        ({ program }, indexVP) => program === 'yDuAzyqYABS',
      );
      // validate vaccination program exist
      if (!(data.enrollments.length !== 0 && vaccinationProgram.length !== 0)) return null; // No user enrollments

      // filter events matching a specified criteria ie. COMPLETED, ALL, ACTIVE, etc
      const filteredEvents = vaccinationProgram[0].events.filter(
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
          return status === 'COMPLETED'; // TODO get both Active and completed
        }
      ); // end filter events

      // validate filtered events
      if (!filteredEvents || filteredEvents.length === 0) return null; // no events match the filter
      // id, firstname, phone attributes for filtering with user provided id, name, phone
      let uniqueIdReturn;
      let nameReturn;
      let phoneReturn; // atrributes for searching

      // filter attributes to user sent id or name or phone searching scriteria
      data.attributes.filter(({ attribute, value }, index) => {
        if (attribute === 'KSr2yTdu1AI' && value.trim() === uniqueId.trim()) {
          uniqueIdReturn = value.trim();
        }
        if (attribute === 'sB1IHYu2xQT' && value.trim() === uniqueId.trim()) {
          nameReturn = value.trim(); // BUG, get a sparate name form field at the UI
        }
        if (attribute === 'fctSQp5nAYl' && value.trim() === phone.trim()) {
          phoneReturn = value.trim();
        }
        // return null; // not needed attributes for searching
      });
      // ensure uniqueId matchs or (name and phone number) matches
      if (
        uniqueIdReturn !== undefined ||
        (nameReturn !== undefined && phoneReturn !== undefined)
      ) {
        // filtered results to sent to UI
        const cloneData = { ...data }; // clone to modify it
        const refineFilteredEvents = filteredEvents[0]; // remove extra [] nesting
        cloneData.enrollments[0] = refineFilteredEvents; // replace events with filtered events
        success(res, cloneData); // filtered data based on user selection
      } else {
        notFound(res);
      }
    }); // end first map
  } catch (error) {
    // return any error during data fetching
    tryCatchExceptions(res);
  }
};

export {
  getFacilities,
  searchTrackedEntityInstances,
}; // named exports
