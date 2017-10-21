import Vector from './vector/Vector'
import vec from './vector/_vector'
import render from './render'
import Color from './Color'
import number from './number'
import physics from './physics/main.js'
import initEvents from './events'

function makeGlobal (window) {
  window.physics = physics
  window.vec = vec
  window.Vector = Vector
  window.Color = Color
  window.render = render
  window.number = number
  initEvents(window)
}

export {
  Vector,
  render,
  physics,
  number,
  Color,
  vec,
  makeGlobal,
  initEvents
}
