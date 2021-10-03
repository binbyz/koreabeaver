import { CircuitInterface } from "../circuit/CircuitInterface";
import ElasticHandler from "../elastic/ElasticHandler";
import CircuitModel, { CircuitTypes } from "../models/CircuitModel";

export default class MdcinConverter extends ElasticHandler implements CircuitInterface.Bodies
{
  private historyModel: CircuitModel;

  public constructor() {
    super();

    this.historyModel = new CircuitModel();
  }

  public boot()
  {
    // send ping to `elastic`
    this.ping();
  }

  public async prepare(): Promise<void>
  {
  }

  public handle()
  {
  }

  public always()
  {
  }
}
