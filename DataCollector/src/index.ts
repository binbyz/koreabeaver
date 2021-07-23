import 'dotenv/config';

import Mdcin from './classes/collector/Mdcin';
import MdcinModel from './classes/models/MdcinModel';
import CollectorHistory from './classes/models/CollectorHistory';

import { logger } from '../config/winston';
import { Collector } from './types';

main();

async function main()
{
  logger.info('Start DataCollector');

  const historyInst = new CollectorHistory();
  const mdcinInst = new Mdcin(process.env.MDCIN_ENCODING_KEY!);

  // 이전 히스토리 가져오기
  historyInst.where('type', Collector.Types.DATA24_MDCIN);

  mdcinInst.setPageNo(1);
  mdcinInst.setNumOfRows(100);

  const mdcinModel: MdcinModel = new MdcinModel();

  await mdcinInst.call()
    .then(response => {
      mdcinModel.loadXML(response).handle();
    })
    .catch(error => mdcinModel.throws(error));
}
