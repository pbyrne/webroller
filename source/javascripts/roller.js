class Roller {
  constructor(options) {
    this.options = options 

    this.diceTower = options.diceTower
    this.ticker = options.ticker
    this.towerDisplay = options.towerDisplay
    this.towerInterface = options.towerInterface

    this.addButtons = this.towerInterface.$("button[data-add-d-n]")
    this.rollButtons = this.towerInterface.$("button[data-trigger=roll]")

    this.towerController = new TowerController({
      container: this.towerDisplay,
      diceTower: this.diceTower,
    })

    this.bindEventListeners()
  }

  bindEventListeners() {
    this.addButtons.forEach(button => button.disabled = false)
    this.addButtons.on("click", event => this.addDie(event))
    this.rollButtons.on("click", this.roll)
  }

  addDie(event) {
    event.preventDefault()
    const sides = parseInt(event.target.dataset.addDN)
    this.diceTower.add(new Die(sides))
    this.towerController.repaint()
  }

  roll() {
    this.tickerController.add()
  }
}

class TowerController {
  constructor(options) {
    this.container = options.container
    this.contents = this.container.$("div[data-contents]").first()
    this.diceTower = options.diceTower
  }

  get orderedDiceGroups() {
    console.log("Grouping…")
    const groups = new Map()
    // Duping so that we don't change order as entered
    const dupedDice = this.diceTower.dice.map(x => x).sort($.sortNumerically)

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

  repaint() {
    console.log("Repainting…")
    $.clear(this.contents)

    const ordered = this.orderedDiceGroups
    const notations = []
    ordered.forEach((dice, sides) => {
      notations.push(`${dice.length}d${sides}`)
    })

    const p = $.createElement("p", {
      text: notations.join("+"),
    })
    this.contents.appendChild(p)
  }
}
