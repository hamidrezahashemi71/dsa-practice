class CustomArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  // TIME COMPLEXITY: O(1)
  // SPACE COMPLEXITY: O(1)
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.length;
  }

  // TIME COMPLEXITY: O(1)
  // SPACE COMPLEXITY: O(1)
  get(index) {
    return this.data[index];
  }

  // TIME COMPLEXITY: O(1)
  // SPACE COMPLEXITY: O(1)
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }

  // TIME COMPLEXITY: O(n)
  // SPACE COMPLEXITY: O(1): because we are not allocating any new space, we are just shifting the items in the array.
  shift() {
    const firstItem = this.data[0];
    for (let i = 0; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
    return firstItem;
  }

  // TIME COMPLEXITY: O(n)
  // SPACE COMPLEXITY: O(1): because we are not allocating any new space, we are just shifting the items in the array.
  deleteByIndex(index) {
    const item = this.data[index];
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    delete this.data[this.length - 1];
    this.length--;
    return item;
  }
}

const customArray = new CustomArray();
customArray.push('apple');
customArray.push('banana');
customArray.push('cherry');
console.log(customArray.deleteByIndex(1));
console.log(customArray);

module.exports = CustomArray;