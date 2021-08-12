import { CircuitInterface } from "../../types";
import MdcinCollector from "../collector/MdcinCollector";

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
  /**
   * Execute Circuit
   */
  public static fire(circuits: Array<CircuitInterface>, ...args: any[]): boolean
  {
    const executes: string[] = ['boot', 'prepare', 'handle', 'except'];

    circuits.forEach(circuit => {
      for (let sort in executes) {
        let method = executes[sort];


      }
    });
  }
}
