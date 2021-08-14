export default class CircuitErrorException extends Error
{
  public constructor(message: string)
  {
    super(message);
  }
}
