import 'dotenv/config';

import MdcinCollector from './classes/collector/MdcinCollector';
import AptTradeCollector from './classes/collector/AptTradeCollector';

import MdcinModel from './classes/models/MdcinModel';
import CollectorHistory from './classes/models/CollectorHistory';

import { logger } from './config/winston';
import { Collector } from './types';
import { getLocaleDatetime } from './lib/slim';

logger.info('Start DataCollector');

main();

/**
 * Main Function
 */
function main()
{
  const mdcinCollector = new MdcinCollector(process.env.MDCIN_ENCODING_KEY!);
  const aptTradeCollector = new AptTradeCollector(process.env.APT_TRADE_ENCODING_KEY!);

  const historyModel = new CollectorHistory();
  const mdcinModel: MdcinModel = new MdcinModel();

  setInterval(async () => {
    // 이전 히스토리 가져오기
    const historyOne = await historyModel.where('type', Collector.Types.DATA24_MDCIN).orderBy('id', 'desc').first();
    let pageNo = 1;

    if (historyOne !== null) {
      pageNo = historyOne?.extra_data?.last_page ? (historyOne.extra_data.last_page + 1) : 1;
    }

    mdcinCollector.setPageNo(pageNo);
    mdcinCollector.setNumOfRows(100);

    // 응답 API 처리
    await mdcinCollector.call()
      .then(response => {
        // 응답값 처리
        mdcinModel.loadXML(response).handle();
      })
      .catch(error => mdcinModel.throws(error));

    // 마지막 페이징 업데이트
    historyModel.clear().where('type', Collector.Types.DATA24_MDCIN).update({
      "extra_data": {
        "last_page": pageNo,
        "last_updated": getLocaleDatetime(),
      },
    });
  }, 5000);
}
