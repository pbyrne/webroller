class Die {
  constructor(sides) {
    this.result = Die.roll(sides)
    this.sides = sides
  }

  static roll(n) {
    console.log("called roll")
    return 1 + Math.floor(Math.random() * Math.floor(n));
  }

  toString() {
    return this.result.toString()
  }

  inspect() {
    return {
      result: this.result,
      sides: this.sides,
    }
  }
}

class DiceTower {
  // Accepts an array of Die instances or modifiers
  constructor(dice) {
    this.dice = dice || []
  }

  total() {
    return this.dice.reduce((acc, die) => acc + parseInt(die), 0)
  }
}
