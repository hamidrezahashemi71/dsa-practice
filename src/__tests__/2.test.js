const { getStudent } = require('../algorithms/2');

describe('getStudent', () => {
  it('gets a valid student', () => {
    expect(getStudent(["Jixer", "Sara", "Hamidrez", "Saba", "Erfan"], 1)).toEqual("Sara");
  });

  it('returns undefined when index is out of bounds', () => {
    expect(getStudent(["Jixer", "Sara", "Hamidrez", "Saba", "Erfan"], 10)).toBeUndefined();
  });

  it('returns undefined when array is empty', () => {
    expect(getStudent([], 0)).toBeUndefined();
  });
});

