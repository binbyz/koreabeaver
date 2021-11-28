import Data24Handler from "./handler/Data24Handler";
import { Data24 } from '../../types';
import { CircuitInterface } from "../circuit/CircuitInterface";
import CircuitModel, { CircuitTypes } from "../models/CircuitModel";
import { is_null, is_array } from 'slimphp';
import { logger } from '../../config/winston';
import FoodModel, { FoodItem } from '../models/FoodModel';
import moment from 'moment';

export default class FoodCollector extends Data24Handler implements CircuitInterface.Bodies
{
  private static readonly encodingKey: string = process.env.MDCIN_ENCODING_KEY! || '';
  private static readonly decodingKey: string = process.env.MDCIN_DECODING_KEY! || '';

  private readonly numOfRows = 100; // NO MANDATORY REQUEST PARAMETERS ERROR! numOfRows maximum is =[100]
  private pageNo: number = 1;

  private historyModel: CircuitModel;
  private foodModel: FoodModel;

  public constructor()
  {
    super(FoodCollector.encodingKey, FoodCollector.decodingKey);
    super.setRequestUri(Data24.API_FOOD_URI);

    this.historyModel = new CircuitModel();
    this.foodModel = new FoodModel();
  }

  public boot()
  {
    // 한 페이지 리스트 갯수
    this.setNumOfRows(this.numOfRows);

    // 이전 수집기 모델 히스토리
    this.historyModel.where('type', CircuitTypes.DATA24_FOOD).orderBy('id', 'desc');
  }

  public async prepare(): Promise<void>
  {
    this.pageNo = await this.getPageNo();

    this.setPageNo(this.pageNo);
  }

  /**
   * 마지막 페이지 번호구하기
   * @returns number
   */
  private async getPageNo()
  {
    const history = await this.historyModel.first();
    let pageNo = 1;

    if (!is_null(history)) {
      pageNo = history.extra_data.last_page + 1;
    }

    return pageNo;
  }

  private async getItems(): Promise<FoodItem[]>
  {
    return this.call()
      .then(response => {
        this.loadXML(response);

        // 데이터 유효성 검사
        this.isValidResponse();

        return is_array(this.content.response.body.items.item)
                  ? this.content.response.body.items.item
                  : [];
      });
  }

  private async updateContentsAndHistory(items: FoodItem[])
  {
    if (items.length) {
      // upsert massive
      await this.foodModel.upserts(items, 'PRDUCT', ['PRDUCT', 'ENTRPS']);
    }

    // 마지막 히스토리 업데이트
    this.updateHistory();
  }

  private updateHistory(): void
  {
    this.historyModel.clear();
    this.historyModel.where('type', CircuitTypes.DATA24_FOOD).update({
      "extra_data": {
        "last_page": this.pageNo,
        "last_updated": moment().format('YYYY-MM-DD HH:mm:ss')
      }
    });
  }

  public async handle()
  {
    logger.info(`[COLLECTOR] FoodCollector (requestParams: ${JSON.stringify(this.requestParams)})`);
    logger.info(this.getRequestUriWithParams());

    const items: FoodItem[] = await this.getItems();

    this.updateContentsAndHistory(items);
  }

  public always()
  {
    this.historyModel.clear();
    this.foodModel.clear();
  }
}
