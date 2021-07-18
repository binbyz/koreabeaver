import { Data24 } from '../../types';
import { logger } from '../../../config/winston';
import XMLParser from 'fast-xml-parser';

export default class Model implements Data24.ModelInterface
{
  protected contentType: Data24.ModelContents;
  protected content: any = null;

  public constructor()
  {
    this.contentType = Data24.ModelContentTypes.CONTENT;
  }

  public loadContent(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.CONTENT;
    this.content = rawContent;

    return this;
  }

  public loadXML(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.XML;

    if (XMLParser.validate(rawContent)) {
      this.content = XMLParser.parse(rawContent);
    }

    return this;
  }

  public loadJSON(rawContent: string): this
  {
    this.contentType = Data24.ModelContentTypes.JSON;
    this.content = JSON.parse(rawContent);

    return this;
  }

  public throws(error: Error): void
  {
    logger.error(error.toString());
  }
}
