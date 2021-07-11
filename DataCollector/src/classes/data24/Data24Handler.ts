import RequestHandler from '../request/RequestHandler'

export default class Data24Handler extends RequestHandler
{
  private encodingKey: string
  private decodingKey: string | undefined

  public constructor(encodingKey: string, decodingKey: string | undefined = undefined)
  {
    super()

    this.encodingKey = encodingKey
    this.decodingKey = decodingKey
  }

  protected getEncodingKey(): string
  {
    return this.encodingKey
  }

  protected getDecodingKey(): string | undefined
  {
    return this.decodingKey
  }
}