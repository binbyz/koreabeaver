import RequestHandler from '../../request/RequestHandler';

export default class EnvironmentHandler extends RequestHandler
{
  protected encodingKey: string;
  protected decodingKey: string | undefined;

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super();

    this.encodingKey = encodingKey
    this.decodingKey = decodingKey
  }
}
