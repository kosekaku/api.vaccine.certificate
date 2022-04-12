import express from 'express';
import fs from 'fs';
import http from '../commons/utils/httpServices';
import { auth, DHIS2_API_BASE_URL } from '../commons/utils/authConfig'

const { DHIS2_API_BASE_URL: baseURL } = DHIS2_API_BASE_URL;
// const baseURL = 'http://localhost:8080';
// get and clean ou code and names
const cleanOU = async (req, res, next) => {
  try {
    const url =
      `${baseURL}/api/organisationUnits.json?fields=id,name, shortName, openingDate,ancestors[id,name,level]&level=5&paging=false`;
    const ouData = await http.get(url, {
      auth,
    });
    if (!ouData) throw Error('Ou not found');
    // success(res, ouData);
    const { organisationUnits } = ouData.data;
    let payloadArray =[];
    const strArray = [];
    organisationUnits.map(async ({ name, id, shortName, openingDate, ancestors }, index1, arr1) => {
      // acestors
      let state, county;
      ancestors.map(({ id: idAncestor, name: nameAncestor, level }) => {
        if (level === 2) {
          // state code
          state = nameAncestor.match(/\b(\w)/g).join('');
        } else if (level === 3) {
          // county code
          const code = nameAncestor.match(/\b(\w)/g);
          code.length <= 2 ? (county = nameAncestor.slice(0, 3)): (county = code.join(''));
        }
      });
      // facility code
      const trimName = name.replace(/\s+/g, ' ').trim();
      const trimShortName = shortName.replace(/\s+/g, ' ').trim();
      const abbr = name.match(/\b(\w)/g);
      let abbrRes;
      (abbr.length <= 2) ? (abbrRes = name.slice(0, 3)): (abbrRes = abbr.join('')); 
      strArray.push(abbrRes);
      let trimCode;
      for(let i = 0; i < strArray.length; i++) {
        // compare the first and last index of an element
        if(strArray.indexOf(strArray[i]) !== strArray.lastIndexOf(strArray[i])){
          trimCode = `${state}_${county}_${strArray[i]+i}`.trim().toUpperCase();
           // log duplicates
        }else{
          // not duplicate
          trimCode = `${state}_${county}_${strArray[i]}`.trim().toUpperCase();

        }
     }
     
      const payload = {
        id,
        name: trimName,
        shortName: trimShortName,
        code: trimCode,
        openingDate,
      };
      payloadArray.push(payload);
      // submit data to api
    });
     req.oupayload = payloadArray;
     next();
  } catch (error) {
    await fs.promises.appendFile('/home/uk45/Desktop/SEND-DHIS2-OU/fetch-ou-error-logs.txt', `${JSON.stringify(data)}\r\n`);
  }
};
// cleaning
const postCleanOU = async (req, res) => {
  const dataOU = req.oupayload;
    dataOU.forEach(async (data, index) => {
      try {
        const postURL = `${baseURL}/api/organisationUnits/${data.id}?mergeMode=REPLACE`;
        const postOUCode = await http.patch(postURL, {
        name: data.name,
        shortName: data.shortName,
        code: data.code,
        openingDate: data.openingDate,
      }, {
        auth,
      });
      if (postOUCode.status !== 204) throw Error();
      await fs.promises.appendFile(`${process.cwd()}/success-logs.txt`, `${JSON.stringify(data)}\r\n`);
      } catch (error) {
        // log failed transactions
        await fs.promises.appendFile(`${process.cwd()}/error-logs.txt`, `${JSON.stringify(data)}\r\n`);
      }
      
    });

};

export { cleanOU, postCleanOU };
