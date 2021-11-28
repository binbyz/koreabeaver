/* eslint-disable */
require('dotenv').config({ path: "../.env.test" });

import Circuit from "../src/classes/circuit/Circuit";
import FoodCollector from "../src/classes/collector/FoodCollector";

main();

function main() {
  const foodCollector = new FoodCollector();

  // circuit
  const circuit = new Circuit([foodCollector]);
  circuit.tick(5000).loop(Infinity).fire();
}
