export default class Nb {

  constructor (config) {
    this.value = config.value || 0

    if (config.IncDec) this.IncDecBetween(config.IncDec[0], config.IncDec[1], config.IncDec[2], config.IncDec[3])
  }

  IncDecBetween = (min, max, step, intTime) => {
    step = step || 1
    intTime = intTime || 100
    this.value = min
    let up = true

    setInterval(() => {
      this.value = up ? this.value + step : this.value - step
      if (this.value === max) up = false
      if (this.value === min) up = true
      // console.log(up, this.value)
    }, intTime)
  }
}
