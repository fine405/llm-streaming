import { parseArgs } from "util";
import { StreamingNode } from "./src/nodes";
import type { SharedStore } from "./types";

function main() {
  const streamingNode = new StreamingNode();

  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      prompt: {
        type: "string",
        default: "List the most popular place to visit in the world.",
      },
      delay: {
        type: "string",
        default: "100",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  const shared: SharedStore = {
    prompt: values.prompt,
    outputDelay: parseInt(values.delay),
  };
  streamingNode.run(shared);
}

main();
