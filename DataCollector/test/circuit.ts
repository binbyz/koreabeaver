/* eslint-disable */
require('dotenv').config({ path: "../.env" });

import Circuit from "../src/classes/circuit/Circuit";
import MdcinCollector from "../src/classes/collector/MdcinCollector";
import AptTradeCollector from "../src/classes/collector/AptTradeCollector";

main();

function main() {
  // Circuit.fire([new MdcinCollector()]);
  // Circuit.fire([new MdcinCollector(), new AptTradeCollector()]);
  Circuit.fire([new AptTradeCollector()]);
}
