import { CircuitInterface } from "./CircuitInterface";
import CircuitErrorException from "../exceptions/CircuitErrorException";
import { sleep } from 'slimphp';

/**
 * Circuit
 *
 * 라라벨의 `Events`와 비슷한 역할을 합니다.
 * 일련의 실행 프로세스를 정해진 메소드에 담아 규칙된 순서에 맞게 실행합니다.
 *
 * `boot()` -> `prepare()` -> `handle()` ----- (error) -----> `except()`
 *                                |
 *                                |
 *                                |
 *                            return true
 */
export default class Circuit
{
  private circuits: Array<CircuitInterface.Bodies> = [];
  private times: number = 1;
  private tickSeconds: number = 0;

  public constructor(circuits: Array<CircuitInterface.Bodies>)
  {
    this.circuits = circuits;
  }

  /**
   * Execute Circuit
   */
  public async fire()
  {
    do {
      this.execute();

      // Tick Seconds
      if (this.tickSeconds) {
        await sleep(this.tickSeconds / 1000);
      }
    } while (this.times--);
  }

  private execute()
  {
    // execute step
    const executes: string[] = ['boot', 'prepare', 'handle'];

    this.circuits.forEach(async circuit => {
      for (let sort in executes) {
        let method = executes[sort];

        try {
          await circuit[method]();
        } catch (e: any) {
          throw new CircuitErrorException(e.stack);
        }
      }

      circuit.always();
    });
  }

  /**
   * Delay Times
   * @param delay miliseconds
   * @returns
   */
  public tick(delay: number): this
  {
    this.tickSeconds = delay;

    return this;
  }

  /**
   * 실행 횟수
   */
  public loop(times: number): this
  {
    this.times = times;

    return this;
  }
}
