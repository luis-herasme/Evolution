import Vector from '../vector/Vector'
import vec from '../vector/_vector'

class Collision {
  constructor (particles = [], restitution = 1) {
    this.restitution = restitution
    this.particles = particles
    this.boundSet = false
  }

  add (particle) {
    this.particles.push(particle)
  }

  setBounds (minX, maxX, minY, maxY) {
    this.boundSet = true
    this.minX = minX
    this.maxX = maxX
    this.minY = minY
    this.maxY = maxY
  }

  removeBounds () {
    this.boundSet = false
  }

  update () {
    for (let i = 0; i < this.particles.length; i++) {
      if (this.boundSet) {
        if (this.particles[i].position.x <= this.minX) {
          this.particles[i].position.x = this.minX
          this.particles[i].velocity.mult(this.restitution)
          this.particles[i].velocity.inverse()
        }

        if (this.particles[i].position.x >= this.maxX) {
          this.particles[i].position.x = this.maxX
          this.particles[i].velocity.mult(this.restitution)
          this.particles[i].velocity.inverse()
        }

        if (this.particles[i].position.y <= this.minY) {
          this.particles[i].position.y = this.minY
          this.particles[i].velocity.mult(this.restitution)
          this.particles[i].velocity.inverse()
        }

        if (this.particles[i].position.y >= this.maxY) {
          this.particles[i].position.y = this.maxY
          this.particles[i].velocity.mult(this.restitution)
          this.particles[i].velocity.inverse()
        }
      }
      for (let x = 0; x < this.particles.length; x++) {
        let c = vec.sub(
          this.particles[i].position.value,
          this.particles[x].position.value
        )

        let choque = new Vector(c)

        if (choque.mag() !== 0) {
          if (choque.mag() < this.particles[i].size + this.particles[x].size) {
            const force = choque.copy()
            force.inverse()
            force.mult(this.restitution)

            this.particles[x].addForce(force)
            if (this.particles[x].onCollision) this.particles[x].onCollision(this.particles[i])
            break
          }
        }
      }
    }
  }
}

const collision = new Collision([], 1)

export default collision
