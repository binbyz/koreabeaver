/* eslint-disable */
require('dotenv').config({ path: "../.env.test" });

import Circuit from "../src/classes/circuit/Circuit";
import MdcinCollector from "../src/classes/collector/MdcinCollector";

main();

function main() {
  const mdcinCollector = new MdcinCollector();

  // circuit
  const circuit = new Circuit([mdcinCollector]);
  circuit.tick(5000).loop(Infinity).fire();
}
