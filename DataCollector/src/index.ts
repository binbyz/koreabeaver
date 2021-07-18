import 'dotenv/config';

import Mdcin from './classes/collector/Mdcin';
import MdcinModel from './classes/models/MdcinModel';

import { logger } from '../config/winston';

logger.info('Start DataCollector');

const mdcinInst = new Mdcin(process.env.MDCIN_ENCODING_KEY!);

mdcinInst.setPageNo(1);
mdcinInst.setNumOfRows(20);

const mdcinModel: MdcinModel = new MdcinModel();

mdcinInst.call()
  .then(response => {
    mdcinModel.loadXML(response).handle();
  })
  .catch(error => mdcinModel.throws(error));
