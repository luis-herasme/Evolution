
const lienzo = require('lienzo')

class Obstacle {
  constructor (x, y, r) {
    this.body = new lienzo.physics.Body(new lienzo.Vector([x, y]), r)
  }
  render (RENDER) {
    RENDER.circle([this.body.position.x, this.body.position.y], this.body.size, 'rgb(255,224,189)')
    //RENDER.strokeCircle([this.body.position.x, this.body.position.y], this.body.size, 'rgb(255,224,189)')
  }
}

module.exports = Obstacle
