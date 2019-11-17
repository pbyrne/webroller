class Die {
  constructor(sides) {
    this.sides = sides
  }

  roll() {
    return 1 + Math.floor(Math.random() * Math.floor(this.sides));
  }
}
