import 'dotenv/config';
import Mdcin from './classes/collector/Mdcin';
import { logger } from '../config/winston';

logger.info('Start DataCollector');

const mdcinInst = new Mdcin(process.env.MDCIN_ENCODING_KEY!);

mdcinInst.setPageNo(1);
mdcinInst.setNumOfRows(20);

mdcinInst.call()
  .then(function (response) {
    // console.log(response)
  })
  .catch(function (error) {
    // TODO Mdcin 모델을 생성하여 에러 핸들링 처리 및 winston.error 로그 남기기
  });
