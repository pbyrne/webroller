class Die {
  constructor(sides) {
    this.result = Die.roll(sides)
    this.sides = sides
  }

  static roll(n) {
    return 1 + Math.floor(Math.random() * Math.floor(n));
  }

  inspect() {
    return {
      result: this.result,
      sides: this.sides,
    }
  }

  // Leveraged by `parseInt`ing the dice in the tower below
  toString() {
    return this.result.toString()
  }
}

class DiceTower {
  // Accepts an array of Die instances or modifiers
  constructor(dice, options) {
    this.dice = dice || []
    this.options = options || {}
  }

  inspect() {
    return {
      dice: this.dice,
      options: this.options,
      total: this.total,
    }
  }

  add(die) {
    this.dice.push(die)
  }

  total() {
    return this.dice.reduce((acc, die) => acc + parseInt(die), 0)
  }
}
