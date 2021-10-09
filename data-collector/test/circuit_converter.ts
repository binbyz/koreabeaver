require('dotenv').config({ path: "../.env" });

import Circuit from "../src/classes/circuit/Circuit";
import MdcinConverter from "../src/classes/converter/MdcinConverter";

main();

function main() {
  const mdcinConverter = new MdcinConverter();

  // circuit
  const circuit = new Circuit([mdcinConverter]);
  circuit.tick(5 * 1000).loop(Infinity).fire();
}
