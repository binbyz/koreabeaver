import { logger } from "../../config/winston";
import { CircuitInterface } from "../circuit/CircuitInterface";
import ElasticHandler from "../elastic/ElasticHandler";
import CircuitModel, { CircuitHistoryItem, CircuitTypes } from "../models/CircuitModel";
import MdcinModel from "../models/MdcinModel";

export default class MdcinConverter extends ElasticHandler implements CircuitInterface.Bodies
{
  private historyModel: CircuitModel;
  private mdcinModel: MdcinModel;
  private history: CircuitHistoryItem;
  private static readonly convertLimit: number = 10; // ANCHOR for test
  private lastConvertId: number;

  public constructor() {
    super();

    this.history = <CircuitHistoryItem>{};
    this.historyModel = new CircuitModel();
    this.mdcinModel = new MdcinModel();
    this.lastConvertId = 0;
  }

  public boot()
  {
    // check: elastic health
    this.ping();

    // conditions: history conditions
    this.historyModel.where('type', CircuitTypes.MDCIN_CONVERTER).orderBy('id', 'desc');
  }

  public async prepare(): Promise<void>
  {
    this.history = await this.historyModel.first();

    // TODO check `extra_data`.`raw_table`

    this.lastConvertId = parseInt(this.history.extra_data.last_convert_id);

    if (isNaN(this.lastConvertId)) {
      throw new Error(`[CONVERT] lastConvertId is Not a Number.`);
    }
  }

  /**
   * 변환시킬 아이템들을 리턴.
   * @returns
   */
  private getConvertItems(): Promise<any>
  {
    const fields: string[] = ['id', 'ENTP_NAME', 'ADDR', 'ENTP_NO', 'ITEM_NAME', 'LAST_SETTLE_DATE'];

    return this.mdcinModel
      .select(fields)
      .where('id', this.lastConvertId, '>')
      .orderBy('id', 'desc')
      .limit(MdcinConverter.convertLimit)
      .get();
  }

  public async handle()
  {
    logger.info(`[CONVERT] mdcin items will be converted into elasticsearch. (history: ${JSON.stringify(this.history)})`);

    const items = await this.getConvertItems();
    console.log(items);
  }

  public always()
  {
    this.historyModel.clear();
    this.mdcinModel.clear();
  }
}
