import { Data24 } from '../../types';
import { logger } from '../../../config/winston';

export default class Model implements Data24.ModelInterface
{
  private contentType: Data24.ModelContents;

  public constructor()
  {
    this.contentType = Data24.ModelContentTypes.CONTENT;
  }

  public loadContent(rawContent: string): void
  {
    this.contentType = Data24.ModelContentTypes.CONTENT;
  }

  public loadXML(rawContent: string): void
  {
    this.contentType = Data24.ModelContentTypes.XML;
  }

  public loadJSON(rawContent: string): void
  {
    this.contentType = Data24.ModelContentTypes.JSON;
  }

  public throws(error: Error): void
  {
    logger.error(error.toString());
  }
}
