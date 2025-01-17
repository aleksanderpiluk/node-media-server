import chalk from "chalk";
import { performance } from "node:perf_hooks";
import { printTable } from "console-table-printer";

const ITERS_COUNT = 1000;

const benchmarkQueue: [string, Function][] = [];

export const microbenchmark = (name: string, func: Function) => {
  benchmarkQueue.push([name, func]);
};

export const run = () => {
  const results: { name: string; tAvgMicroSec: number }[] = [];

  for (const [name, func] of benchmarkQueue.splice(0, benchmarkQueue.length)) {
    console.log(
      chalk.greenBright("[MICROBENCHMARK]" + " " + chalk.white(name))
    );
    console.log(chalk.white(`Executing ${ITERS_COUNT} iterations`));

    const tStart = performance.now();
    for (let i = 0; i < ITERS_COUNT; i++) {
      func();
    }
    const tEnd = performance.now();

    const tAvg = (tEnd - tStart) / ITERS_COUNT;
    const tAvgMicroSecsRounded = Math.round(tAvg * 1_000_00) / 1_00;

    console.log(
      chalk.white(
        `Average execution time: ${tAvgMicroSecsRounded} microseconds`
      )
    );

    results.push({ name, tAvgMicroSec: tAvgMicroSecsRounded });
    console.log("\n");
  }

  results.sort((a, b) => b.tAvgMicroSec - a.tAvgMicroSec);
  printTable(results);

  console.log("\n");

  console.log(
    chalk.green("[FINISHED]"),
    chalk.white("Successful runs: " + results.length)
  );
};
