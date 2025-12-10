
// Benchmark: getAllPairs
// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
// n = 100 | median 0.925 ms(5 runs)
// n = 500 | median 20.956 ms(5 runs)
// n = 1,000 | median 121.677 ms(5 runs)
// n = 5,000 | median 3672.867 ms(5 runs)
// Memory(getAllPairs): ~0.001 MB heap delta

const getAllPairs = (numbers) => {
  const pairs = [];
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      pairs.push([numbers[i], numbers[j]]);
    }
  }
  return pairs;
};

// const getAllPairs = (numbers) =>
//   numbers.map(number => numbers.map(otherNumber => [number, otherNumber]));

module.exports = { getAllPairs };

// 26:11 