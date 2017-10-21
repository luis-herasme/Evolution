import vector from './_vector'

class Vector {
  constructor (value) {
    this.value = value
  }

  get x () {
    return this.value[0]
  }

  get y () {
    return this.value[1]
  }

  set x (value) {
    this.value[0] = value
  }

  set y (value) {
    this.value[1] = value
  }

  add (vec) {
    this.value = vector.add(this.value, vec.value)
  }

  sub (vec) {
    this.value = vector.sub(this.value, vec.value)
  }

  mult (scalar) {
    this.value = vector.mult(this.value, scalar)
  }

  inverse () {
    this.value = vector.inverse(this.value)
  }

  mag () {
    return vector.mag(this.value)
  }

  dot (vec) {
    return vector.dot(this.value, vec.value)
  }

  normalize () {
    this.value = vector.normalize(this.value)
  }

  distance (vec) {
    return vector.distance(vec.value, this.value)
  }

  angle () {
    return vector.angle(this.value)
  }

  copy () {
    return new Vector(vector.copy(this.value))
  }

  setMag (magnitud) {
    this.value = vector.setMag(this.value, magnitud)
  }

  addAngle (ang, piv) {
    this.value = vector.addAngle(this.value, ang, piv)
  }

  limit (scalar) {
    this.value = vector.limit(this.value, scalar)
  }

  moveTowards (vec, speed, stop) {
    this.value = vector.moveTowards(this.value, vec, speed, stop)
  }

  angleBetween (vec) {
    return vector.angleBetween(this.value, vec)
  }

  setAngle (ang) {
    this.value = vector.setAngle(this.value, ang)
  }
}

export default Vector
