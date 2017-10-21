
/* global window */

let mouse = {
  position: [0, 0],
  click: 0
}

let time = 0

function init (window) {
  window.onload = function () {
    window.addEventListener('mousemove', function (e) {
      mouse.position = [e.clientX, e.clientY]
      if (window.mouseMove) window.mouseMove(mouse)
    })

    window.addEventListener('mousedown', function (e) {
      mouse.click = e.which
      if (window.mouseDown) window.mouseDown(mouse)
    })

    window.addEventListener('mouseup', function (e) {
      mouse.click = 0
      if (window.mouseUp) window.mouseUp(mouse)
    })

    window.addEventListener('keydown', function (e) {
      if (window.keyDown) window.keyDown(e.key)
    })

    window.addEventListener('keyup', function (e) {
      if (window.keyUp) window.keyUp(e.key)
    })

    window.addEventListener('keypress', function (e) {
      if (window.keyPress) window.keyPress(e.key)
    })

    if (window.update) {
      setInterval(() => {
        window.update()
      }, time)
    }

    if (window.start) {
      window.start()
    }
  }
}

export default init
