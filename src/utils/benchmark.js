const { performance } = require('perf_hooks');

const median = values => {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/**
 * Run a timing benchmark across input sizes.
 * @param {Object} options
 * @param {string} options.label - Name of the function/algorithm.
 * @param {(input: any) => void} options.fn - Function to benchmark.
 * @param {(n: number) => any} options.buildInput - Builds input for size n.
 * @param {number[]} options.sizes - Input sizes to test.
 * @param {number} [options.iterations=3] - Repetitions per size.
 */
function runTimeBench ({ label, fn, buildInput, sizes, iterations = 3 }) {
  console.log(`Benchmark: ${label}`);
  for (const n of sizes) {
    const input = buildInput(n);
    const samples = [];
    for (let i = 0; i < iterations; i += 1) {
      const start = performance.now();
      fn(input);
      const end = performance.now();
      samples.push(end - start);
    }
    const med = median(samples);
    console.log(`n=${n.toLocaleString()} | median ${med.toFixed(3)} ms (${iterations} runs)`);
  }
}

/**
 * Estimate heap delta for a single run.
 * Note: run Node with --expose-gc for best consistency.
 */
function measureMemory ({ label, fn, inputBuilder }) {
  if (typeof global.gc === 'function') global.gc();
  const before = process.memoryUsage().heapUsed;
  fn(inputBuilder());
  if (typeof global.gc === 'function') global.gc();
  const after = process.memoryUsage().heapUsed;
  const diffMb = (after - before) / 1024 / 1024;
  console.log(`Memory (${label}): ~${diffMb.toFixed(3)} MB heap delta`);
}

module.exports = {
  runTimeBench,
  measureMemory
};

