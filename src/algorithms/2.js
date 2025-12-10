
// Benchmark: getStudent
// Time Complexity: O(1)
// Space Complexity: O(1)
// n = 1,000 | median 0.000 ms(5 runs)
// n = 5,000 | median 0.002 ms(5 runs)
// n = 10,000 | median 0.000 ms(5 runs)
// n = 25,000 | median 0.000 ms(5 runs)
// Memory(getStudent): ~-0.003 MB heap delta

const getStudent = (allStudents, index) =>
  allStudents[index]

module.exports = { getStudent };

/* Time grows proportionally with n: ~0.028 → 0.072 → 0.141 → 0.342 ms as sizes increase (1k → 5k → 10k → 25k). That’s consistent with O(n).
Memory delta is ~0 MB (the tiny negative is just measurement noise); the function doesn’t allocate meaningful extra heap beyond the input array, which matches O(1) extra space.
So: time ≈ linear, extra space ≈ constant.*/