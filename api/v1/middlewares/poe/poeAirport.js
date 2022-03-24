import { badRequest, notFound, success, tryCatchExceptions } from '../../helpers/poeMessages';
import http from '../../utils/httpServices';
import { auth } from '../../utils/authConfig';

// check if user visted south sudan before
const checkVisitor = async (req, res, next) => {
  try {
    const { passPortNumber, nationality } = req.query;
    if (!passPortNumber || !nationality) return badRequest(res);
    console.log('check empty',typeof passPortNumber, !nationality );
    // TODO filter rows fields in the DHIS2 api field filter
    const url = `https://southsudanhis.org/covid19southsudan/api/events/query.json?orgUnit=he6RdNPCKhY&ouMode=DESCENDANTS&program=ArXGGyMgxL4&programStage=ePHVvZFGdZo&filter=v5KB4meGBFe:EQ:${passPortNumber}&filter=QwzbmOS6Loa:in:${nationality}`;
    const results = await http.get(url, {
      auth,
    });
    if (results && results.data.rows.length === 0) return success(res, []);
    const visitorHistoryId = results.data.rows[0][0];
    req.data = { visitorHistoryId };
    console.log('visitor found', visitorHistoryId);
    next();
  } catch (error) {
    tryCatchExceptions(res, error);
  }
};

export { checkVisitor };
