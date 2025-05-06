import * as readline from "readline";

export function listenKeyEnter(callback: () => void) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (line) => {
    if (line === "") {
      callback();
    }
  });

  return () => {
    rl.close();
  };
}
