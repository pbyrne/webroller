class Roller {
  constructor(options) {
    this.options = options

    this.diceTower = options.diceTower
    this.ticker = options.ticker
    this.towerDisplay = options.towerDisplay
    this.towerInterface = options.towerInterface

    this.addButtons = this.towerInterface.$("button[data-add-d-n]")
    this.clearButtons = this.towerInterface.$("button[data-trigger=clear]")
    this.rollButtons = this.towerInterface.$("button[data-trigger=roll]")

    this.towerController = new TowerController({
      container: this.towerDisplay,
      diceTower: this.diceTower,
    })

    this.tickerController = new TickerController({
      container: this.ticker,
    })

    this._bindEventListeners()
  }

  _bindEventListeners() {
    this.addButtons.forEach(button => button.disabled = false)
    this.addButtons.on("click", event => this.addDie(event))

    this.clearButtons.on("click", (event) => this.clear(event))

    this.rollButtons.forEach(button => button.disabled = false)
    this.rollButtons.on("click", (event) => this.roll(event))
  }

  addDie(event) {
    event.preventDefault()
    const sides = parseInt(event.target.dataset.addDN)
    this.diceTower.add(new Die(sides))
    this.towerController.repaint()
  }

  clear(event) {
    event.preventDefault()
    this.diceTower.clear()
    this.towerController.repaint()
  }

  roll(event) {
    event.preventDefault()
    const result = this.diceTower.roll()
    this.tickerController.add(result)
  }
}

class TowerController {
  constructor(options) {
    this.container = options.container
    this.contents = this.container.$("div[data-contents]").first()
    this.diceTower = options.diceTower
  }

  repaint() {
    console.log("Repainting…")
    $.clear(this.contents)

    const p = $.createElement("p", {
      text: this.diceTower.notations.join("+"),
    })
    this.contents.appendChild(p)
  }
}

class TickerController {
  constructor(options) {
    this.container = options.container
    this.contents = this.container.$("div[data-contents]").first()
  }

  add(result) {
    console.log("TickerController.add", result)
    const text = `${result.notations.join("+")}: ${result.total}`
    const p = $.createElement("p", {
      class: "result highlight",
      text: text,
    })
    this.contents.prepend(p)
    setTimeout(() => p.classList.remove("highlight"))
  }
}
