/* eslint-disable */
require('dotenv').config({ path: "../.env" });

import Circuit from "../src/classes/circuit/Circuit";
import MdcinCollector from "../src/classes/collector/MdcinCollector";
import AptTradeCollector from "../src/classes/collector/AptTradeCollector";
import { CityCode } from '../src/classes/models/LawdCdModel';

main();

function main() {
  const aptTrade = new AptTradeCollector([
    CityCode.SEOUL_GEUMCHUN,
    CityCode.SEOUL_YONGSAN,
  ]);

  // circuit
  const circuit = new Circuit([aptTrade]);
  circuit.tick(5000).loop(Infinity).fire();
}
