
const lienzo = require('lienzo')
const Cell = require('./Cell.js')
const Obstacle = require('./Obstacle.js')

const RENDER = lienzo.render
RENDER.init()

let obstacles = [
  new Obstacle(window.innerWidth * 0.9, window.innerHeight * 0.9, 25),
  new Obstacle(window.innerWidth * 0.5, window.innerHeight * 0.5, 100),
  new Obstacle(window.innerWidth * 0.5, window.innerHeight * 0.2, 120),
  new Obstacle(window.innerWidth * 0.2, window.innerHeight * 0.5, 75)
]
let cells = []

for (; cells.length < 200;) cells.push(new Cell(0, 0, 10, obstacles))
const fitnessDom = document.getElementById('ui')

let lastAverage = 0

function calculateFitness () {
  let fitness = cells.map((x) => lienzo.vec.distance(x.body.position.value, obstacles[0].body.position.value))
  let average = fitness.reduce((a, c) => a + c) / cells.length
  let better = []

  fitnessDom.innerHTML = 'Fitness: ' + average.toFixed(2) + '<br>Generation: ' + generation
  let temp

  if (lastAverage) {
    if (average > lastAverage) {
      temp = average
      average = lastAverage
    }
  }

  let dead = 0

  fitness.forEach((fit, index) => {
    if (fit > average) dead += 1
  })

  if (dead > cells.length * 0.9) average = (temp + average) / 2
  fitness.forEach((fit, index) => {
    if (fit > average) cells[index] = undefined
    else better.push(cells[index])
  })

  let fitness2 = better.map((x) => lienzo.vec.distance(x.body.position.value, obstacles[0].body.position.value))
  let average2 = fitness2.reduce((a, c) => a + c) / better.length

  lastAverage = (average2 + average2 + average) / 3
  console.log(lastAverage)

  cells.forEach((cell, i) => {
    if (!cell) {
      cells[i] = better[Math.floor(Math.random() * better.length)].haveChild()
    }
  })

  generation += 1
  cells.forEach((x) => x.body.position.mult(0))
  inter = setInterval(update)
}

let i = 0
let generation = 0
let rend = true

const bot = document.getElementById('boton')
bot.addEventListener('click', () => {
  rend = !rend
})

let read = 500

const READER = document.getElementById('reader')
const ADD = document.getElementById('add')
const SUB = document.getElementById('sub')

ADD.addEventListener('click', () => {
  read += 10
  READER.innerHTML = read
})

SUB.addEventListener('click', () => {
  read -= 10
  READER.innerHTML = read
})

function update () {
  if (rend) {
    obstacles.forEach((x) => x.render(RENDER))
    RENDER.clear('rgba(50, 50, 50, 0.1)')
  }

  cells.forEach((x) => {
    x.update()
    if (rend) x.render(RENDER)
  })
  i += 1
  if (i > read) {
    clearInterval(inter)
    calculateFitness()
    i = 0
  }
}

let inter = setInterval(update)
