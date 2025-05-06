import { Node } from "pocketflow";

import type { SharedStore } from "../types";
import { llm, time } from "./utils";
import { listeners } from "./utils";

interface PreRes {
  prompt: string;
  abort: AbortController;
  outputDelay: number;
}

export class StreamingNode extends Node<SharedStore> {
  async prep(store: SharedStore) {
    const abort = new AbortController();
    store.abortController = abort;

    const cleanup = listeners.listenKeyEnter(() => {
      process.stdout.write("Aborted...");
      abort.abort();
    });
    store.cleanup = cleanup;

    process.stdout.write("Press Enter at any time to interrupt streaming...\n");

    const prompt = store.prompt;
    if (!prompt) {
      throw new Error("No prompt provided");
    }
    process.stdout.write(`Question: ${prompt}\n`);

    return {
      prompt,
      abort,
      outputDelay: store.outputDelay,
    };
  }

  async exec({ prompt, abort, outputDelay }: PreRes) {
    let result = "";
    try {
      const stream = await llm.streamLlm(prompt, abort.signal);
      process.stdout.write("Answer: \n");
      for await (const chunk of stream) {
        if (abort.signal.aborted) {
          process.stdout.write("\n\n");
          break;
        }
        const content = chunk.choices[0]?.delta?.content || "";
        if (!content) continue;

        result += content;

        process.stdout.write(content);
        await time.sleep(outputDelay);
      }

      process.stdout.write("\n\n");
    } catch (error: unknown) {
      throw error;
    }

    return { result };
  }

  execFallback(prepRes: unknown, error: Error): Promise<unknown> {
    console.error(error instanceof Error ? error.message : "Unknown error");
    process.exit(1);
  }

  async post(store: SharedStore, execRes: { result: string }) {
    delete store.stream;

    if (store.abortController) {
      store.abortController.abort();
      delete store.abortController;
    }

    if (store.cleanup) {
      store.cleanup();
      delete store.cleanup;
    }

    store.result = execRes.result;

    return undefined;
  }
}
