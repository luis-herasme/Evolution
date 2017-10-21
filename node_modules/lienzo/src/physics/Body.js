
class Body {
  constructor (position, size) {
    this.position = position.copy()
    position.mult(0)
    this.aceleration = position.copy()
    this.velocity = position.copy()
    this.size = size
  }

  update () {
    this.velocity.add(this.aceleration)
    this.position.add(this.velocity)
    this.aceleration.mult(0)
  }

  addForce (force) {
    force.mult(1 / this.size)
    this.aceleration.add(force)
  }
}

export default Body
