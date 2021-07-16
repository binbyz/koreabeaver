import 'dotenv/config';
import Mdcin from './classes/collector/Mdcin';

const mdcinInst = new Mdcin(process.env.MDCIN_ENCODING_KEY!);

mdcinInst.setPageNo(1);
mdcinInst.setNumOfRows(1000);

mdcinInst.call()
  .then(function (response) {
    console.log(response)
  })
  .catch(function (error) {
    console.error(error)
  });
