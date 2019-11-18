var selector = (query) => document.querySelectorAll(query)

window.$ = selector.bind(document)

$.createElement = (tag, attributes) => {
  attributes = attributes || {}

  var element = document.createElement(tag)
  if (attributes.text) {
    element.textContent = attributes.text
    delete(attributes.text)
  }
  if (attributes.class) {
    attributes.class.split(" ").forEach(function(className) {
      element.classList.add(className)
    })

    delete(attributes.class)
  }

  Object.keys(attributes).forEach(function(key) {
    element.setAttribute(key, attributes[key])
  })

  return element
}

$.ready = (fn) => {
  document.addEventListener("DOMContentLoaded", fn)

  // if we're past DOMContentLoaded, just run it…
  if (document.readyState === "interactive" || document.readyState === "complete" ) {
    fn()
  }
}

Node.prototype.on = function(name, fn) {
  this.addEventListener(name, fn)
}
Node.prototype.$ = selector.bind(this)
NodeList.prototype.on = function(name, fn) {
  this.forEach((elem) => elem.on(name, fn))
}
