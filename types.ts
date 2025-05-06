import type { StreamResponse } from "./src/utils/llm";

export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

export type Stream = UnwrapPromise<StreamResponse>;

export interface SharedStore {
  prompt?: string;
  result?: string;
  abortController?: AbortController;
  stream?: Stream;
  outputDelay?: number;
  cleanup?: () => void;
  [key: string]: any;
}
