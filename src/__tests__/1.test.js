const { findStudent } = require('../algorithms/1');

describe('findStudent', () => {
  it('finds a valid student', () => {
    expect(findStudent(["Jixer", "Sara", "Hamidrez", "Saba", "Erfan"], "Sara")).toEqual("Sara");
  });

  it('returns undefined when no student exists', () => {
    expect(findStudent(["Jixer", "Sara", "Hamidrez", "Saba", "Erfan"], "Ali")).toBeUndefined();
  });

  it('returns undefined on empty roster', () => {
    expect(findStudent([], "Ali")).toBeUndefined();
  });
});

