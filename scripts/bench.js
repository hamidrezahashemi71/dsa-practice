/**
 * Example benchmark runner. Swap out the imported algorithm and input builder
 * to benchmark any solution in src/algorithms/.
 *
 * Run with: npm run bench
 * For cleaner memory readings, run: node --expose-gc scripts/bench.js
 */

const { runTimeBench, measureMemory } = require('../src/utils/benchmark');
const { findStudent } = require('../src/algorithms/1');
const { getStudent } = require('../src/algorithms/2');
const { getAllPairs } = require('../src/algorithms/3');

const sizes = [1_00, 5_00, 1_000, 5_000];


// findStudent
// runTimeBench({
//   label: 'findStudent',
//   fn: ({ students, target }) => findStudent(students, target),
//   buildInput: n => {
//     const students = Array.from({ length: n }, (_, i) => `Student-${i}`);
//     // target near end to avoid best-case bias
//     const target = students[students.length - 2];
//     return { students, target };
//   },
//   sizes,
//   iterations: 5
// });

// measureMemory({
//   label: 'findStudent',
//   fn: ({ students, target }) => findStudent(students, target),
//   inputBuilder: () => {
//     const n = 50_000;
//     const students = Array.from({ length: n }, (_, i) => `Student-${i}`);
//     const target = students[students.length - 2];
//     return { students, target };
//   }
// });


// getStudent
// runTimeBench({
//   label: 'getStudent',
//   fn: ({ students, index }) => getStudent(students, index),
//   buildInput: n => {
//     const students = Array.from({ length: n }, (_, i) => `Student-${i}`);
//     const index = Math.floor(Math.random() * n);
//     return { students, index };
//   },
//   sizes,
//   iterations: 5
// });

// measureMemory({
//   label: 'getStudent',
//   fn: ({ students, index }) => getStudent(students, index),
//   inputBuilder: () => {
//     const n = 1_000;
//     const students = Array.from({ length: n }, (_, i) => `Student-${i}`);
//     const index = Math.floor(Math.random() * n);
//     return { students, index };
//   }
// });

// getAllPairs
runTimeBench({
  label: 'getAllPairs',
  fn: ({ numbers }) => getAllPairs(numbers),
  buildInput: n => {
    const numbers = Array.from({ length: n }, (_, i) => i);
    return { numbers };
  },
  sizes,
  iterations: 5
});

measureMemory({
  label: 'getAllPairs',
  fn: ({ numbers }) => getAllPairs(numbers),
  inputBuilder: () => {
    const n = 1_000;
    const numbers = Array.from({ length: n }, (_, i) => i);
    return { numbers };
  }
});