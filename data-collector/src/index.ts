/* eslint-disable */
require('dotenv').config({ path: "../.env" });

import MdcinCollector from './classes/collector/MdcinCollector';
import AptTradeCollector from './classes/collector/AptTradeCollector';

import MdcinModel from './classes/models/MdcinModel';
import CircuitModel from './classes/models/CircuitModel';

import { logger } from './config/winston';
import { Circuit } from './types';
import { getLocaleDatetime } from './lib/slim';

logger.info('Start DataCollector');

main();
// test();

/**
 * Test Function
 */
function test() {
  console.log({
    "database": process.env.MYSQL_DB_NAME!,
    "host": process.env.MYSQL_HOST!,
    "user": process.env.MYSQL_USER!,
    "password": process.env.MYSQL_PASSWORD!,
    "port": parseInt(process.env.MYSQL_PORT!, 10),
  });
}

/**
 * Main Function
 */
function main()
{
  const mdcinCollector = new MdcinCollector(process.env.MDCIN_ENCODING_KEY!);
  const aptTradeCollector = new AptTradeCollector(process.env.APT_TRADE_ENCODING_KEY!);

  const historyModel = new CircuitModel();
  const mdcinModel: MdcinModel = new MdcinModel();

  setInterval(async () => {
    // 이전 히스토리 가져오기
    const historyOne = await historyModel.where('type', Circuit.Types.DATA24_MDCIN).orderBy('id', 'desc').first();
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
    historyModel.clear().where('type', Circuit.Types.DATA24_MDCIN).update({
      "extra_data": {
        "last_page": pageNo,
        "last_updated": getLocaleDatetime(),
      },
    });
  }, 5000);
}
