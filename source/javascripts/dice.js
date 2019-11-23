class Die {
  constructor(sides) {
    this.sides = sides
  }

  roll() {
    return 1 + Math.floor(Math.random() * Math.floor(this.sides));
  }
}

class DiceTower {
  // Accepts an array of Die instances or modifiers
  constructor(dice, options) {
    this.dice = dice || []
    this.options = options || {}
  }

  get notations() {
    const ns = []

    this.orderedDiceGroups.forEach((dice, sides) => {
      ns.push(`${dice.length}d${sides}`)
    })

    return ns
  }

  get orderedDiceGroups() {
    // Duping so that we don't change order as entered
    const dupedDice = this.dice.map(x => x).sort($.sortNumerically)
    const groups = new Map()

    dupedDice.forEach((die) => {
      const key = die.sides
      const collection = groups.get(key)

      if (collection) {
        collection.push(die)
      } else {
        groups.set(key, [die])
      }
    })

    return groups
  }

  add(die) {
    this.dice.push(die)
  }

  clear() {
    this.dice.length = 0
  }

  roll() {
    const rolls = this.dice.map((die) => new DieRoll(die))
    return new DiceRoll({
      rolls: rolls,
      notations: this.notations,
    })
  }
}

// A single die's roll
class DieRoll {
  constructor(die) {
    this.die = die
    this.result = die.roll()
  }
}

// Collection of DieRoll instances
class DiceRoll {
  constructor(options) {
    this.rolls = options.rolls
    this.notations = options.notations
    this.total = this.calculateTotal()
  }

  calculateTotal() {
    return this.rolls.reduce((acc, roll) => acc + roll.result, 0)
  }
}
