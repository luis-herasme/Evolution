
const lienzo = require('lienzo')

function genome () {
  let gen = Math.random()
  if (gen < 0.25) return 'l'
  else if (gen < 0.5) return 'u'
  else if (gen < 0.75) return 'i'
  else return 's'
}

class Cell {
  constructor (x, y, r, obstacles) {
    this.obstacles = obstacles
    this.body = new lienzo.physics.Body(new lienzo.Vector([x, y]), r)

    this.world = new lienzo.physics.Collision([], 0.1)
    this.world.setBounds(0, window.innerWidth, 0, window.innerHeight)

    for (this.genes = []; this.genes.length < 20000;) this.genes.push(genome())
    this.velocity = 3
    this.clock = 0
    this.world.add(this.body)
    this.obstacles.forEach((obstacle) => this.world.add(obstacle.body))
  }

  update () {
    this.think()
    this.body.update()
    this.world.update()
    this.body.velocity.mult(0.99)
  }

  haveChild () {
    let son = new Cell(0, 0, 10, this.obstacles)
    for (let i = 0; i < this.genes.length - 1; i++) {
      if (Math.random() < 0.975) son.genes[i] = this.genes[i]
    }
    return son
  }

  think () {
    if (this.genes[this.clock] === 'l') {
      this.body.addForce(new lienzo.Vector([0, -this.velocity]))
    } else if (this.genes[this.clock] === 'u') {
      this.body.addForce(new lienzo.Vector([0, this.velocity]))
    } else if (this.genes[this.clock] === 'i') {
      this.body.addForce(new lienzo.Vector([-this.velocity, 0]))
    } else {
      this.body.addForce(new lienzo.Vector([this.velocity, 0]))
    }
    this.clock += 1
    if (this.clock >= this.genes.length) this.clock = 0
  }

  render (RENDER) {
    RENDER.circle([this.body.position.x, this.body.position.y], this.body.size, 'rgb(255, 100, 100)')
    // RENDER.strokeCircle([this.body.position.x, this.body.position.y], this.body.size, 'rgb(255, 100, 100)')
  }
}

module.exports = Cell
