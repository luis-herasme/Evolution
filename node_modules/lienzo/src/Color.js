class Color {
  constructor (r = 100, g = 100, b = 100, a = 1) {
    this.r = Math.round(r * 255)
    this.g = Math.round(g * 255)
    this.b = Math.round(b * 255)
    this.a = a

    if (this.r > 255) this.r = 255
    if (this.r < 0) this.r = 0

    if (this.g > 255) this.g = 255
    if (this.g < 0) this.g = 0

    if (this.b > 255) this.b = 255
    if (this.b < 0) this.b = 0

    if (this.a > 1) this.a = 1
    if (this.a < 0) this.a = 0
  }

  rgba () {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
  }

  rgb () {
    return `rgb(${this.r}, ${this.g}, ${this.b})`
  }

  static random () {
    const color = new Color(Math.random(), Math.random(), Math.random())
    return color.rgb()
  }
}

export default Color
