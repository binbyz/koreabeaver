import { IndexSignature } from "../../types";

export namespace CircuitInterface
{
  export type BootFn = (...args: any[]) => boolean;
  export type PrepareFn = (...args: any[]) => Promise<void>;
  export type HandleFn = (...args: any[]) => void;
  export type AlwaysFn = (...args: any[]) => void;

  export interface Bodies extends IndexSignature
  {
    /**
     * step 1: boot
     *
     * Circuit를 실행하기 전 가장 첫 번째 논리 단위입니다.
     * `true`시 `prepare` 단계로 넘어갑니다.
     */
    boot: BootFn;
    /**
     * step 2: prepare
     *
     * `true`시 `handle` 단계로 넘어갑니다.
     */
    prepare: PrepareFn;
    /**
     * step 3: handle
     *
     * 실제 작업이 실행되는 논리 단위의 공간입니다.
     */
    handle: HandleFn;
    /**
     * Circuit 실행 후 항상 실행됩니다.
     */
    always: AlwaysFn;
  }
}
