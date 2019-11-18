class Roller {
  constructor(options) {
    this.options = options || {}
    const requiredAttributes = [
      "interface",
      "ticker",
      "tower",
    ]

    requiredAttributes.forEach((attrName) => {
      if (options[attrName]) {
        this[attrName] = options[attrName]
      } else {
        throw "Must provide a '" + attrName + "' element"
      }
    })

    this.bindEventListeners()
  }

  bindEventListeners() {
    console.log("Binding event listeners")
    var addButtons = this.interface.$("button[data-add-dn]")
    console.log(addButtons)
    addButtons.forEach((button) => {
      button.disabled = false
    })
    addButtons.on("click", (event) => {
      event.preventDefault()
      console.log("clicked", event.target)
    })
  }
}
