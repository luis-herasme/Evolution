/* global Image */

const render = {
  init,
  setCenter,
  clear,
  circle,
  strokeCircle,
  strokeArc,
  rect,
  strokeRect,
  line,
  poligon,
  text,
  width: 0,
  height: 0,
  setScale,
  scale: 1,
  loadImage,
  image,
  context: undefined
}

let images = {}
let canvas

function init (canvasName, width, height) {
  if (canvasName) {
    canvas = document.getElementById(canvasName)
    if (width && height) {
      canvas.width = width
      canvas.height = height
    } else {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  } else {
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)

    if (width && height) {
      canvas.width = width
      canvas.height = height
    } else {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
  }
  render.width = canvas.width / render.scale
  render.height = canvas.height / render.scale

  render.center = [render.width / 2, render.height / 2]
  render.context = canvas.getContext('2d')
}

function setScale (scale) {
  render.width = render.width / scale
  render.height = render.height / scale
  render.center = [render.width / 2, render.height / 2]
  render.scale = scale
}

function line (vec1, vec2, style, stroke) {
  // Takes a vector as an start point and another vector as the final point of the line
  render.context.beginPath()
  setStyle(style)
  render.context.moveTo(vec1[0] * render.scale, vec1[1] * render.scale)
  render.context.lineTo(vec2[0] * render.scale, vec2[1] * render.scale)
  if (stroke) render.context.stroke()
  render.context.fill()
}

function rect (x, y, w, h, color) {
  // Draws a rect in the screen
  render.context.beginPath()
  x *= render.scale
  y *= render.scale
  h *= render.scale
  w *= render.scale
  render.context.fillStyle = color
  render.context.fillRect(x, y, w, h)
}

function strokeRect (x, y, w, h, color) {
  // Draws the borders of a rect in the screen
  x *= render.scale
  y *= render.scale
  h *= render.scale
  w *= render.scale
  render.context.beginPath()
  render.context.fillStyle = color
  render.context.rect(x, y, w, h)
  render.context.stroke()
}

function circle (pos, size, color) {
  // Draws a circle in the screen
  render.context.beginPath()
  size = size * render.scale
  render.context.fillStyle = color
  render.context.arc(pos[0] * render.scale, pos[1] * render.scale, size, 0, 2 * Math.PI)
  render.context.fill()
}

function strokeArc (x, y, size, width, eAngl, aAngl, color) {
  // Draws the borders of an arc in the screen
  render.context.beginPath()
  x *= render.scale
  y *= render.scale
  size = size * render.scale
  render.context.strokeStyle = color
  render.context.arc(x, y, size, eAngl, aAngl, true)
  render.context.lineWidth = width
  render.context.stroke()
}

function strokeCircle (pos, size, width, color) {
  // Draws the borders of a circle in the screen
  render.context.beginPath()
  size = size * render.scale
  render.context.strokeStyle = color
  render.context.arc(pos[0] * render.scale, pos[1] * render.scale, size, size, 0, 2 * Math.PI)
  render.context.lineWidth = width
  render.context.stroke()
}

function setStyle (style) {
  for (let i in style) {
    render.context[i] = style[i]
  }
}

function setCenter (vec = render.center) {
  // Sets the center of the screen in the given position by a 2D vector
  render.context.translate(vec[0], vec[1])
}

function text (texto, pos, style, stroke) {
  // Puts text in the screen
  setStyle(style)
  if (stroke) render.context.strokeText(texto, pos[0] * render.scale, pos[1] * render.scale)
  render.context.fillText(texto, pos[0] * render.scale, pos[1] * render.scale)
}

function loadImage (name, src) {
  const image = new Image()
  image.src = src
  images[name] = image
}

function image (name, x, y, w, h) {
  render.context.beginPath()
  x *= render.scale
  y *= render.scale
  h *= render.scale
  w *= render.scale
  render.context.drawImage(images[name], x, y, w, h)
}

function clear (color = '#000') {
  // Clears the entire screen
  render.context.fillStyle = color
  render.context.save()
  render.context.setTransform(1, 0, 0, 1, 0, 0)
  render.context.fillRect(0, 0, canvas.width, canvas.height)
  render.context.restore()
}

function poligon (vecs, color, stroke) {
  // Draws a poligon in the screen
  render.context.beginPath()
  render.context.fillStyle = color
  render.context.moveTo(vecs[0][0], vecs[0][1])
  for (var i = 0; i < vecs.length; i++) {
    render.context.lineTo(vecs[i][0], vecs[i][1])
  }
  render.context.closePath()
  render.context.fill()
  if (stroke) render.context.stroke()
}

export default render
