import { tryCatchExceptions } from '../helpers/messages';
import { TEIData } from '../helpers/getTEIData';

const verifyCertificate = async (req, res) => {
  try {
    const { teiId } = req.params;
    TEIData(teiId, res);
  } catch (error) {
    tryCatchExceptions(res, error);
  }
};

export { verifyCertificate };
