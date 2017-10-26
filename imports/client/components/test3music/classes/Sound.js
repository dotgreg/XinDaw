import Tone from 'tone';

export default class Sound {

  constructor (config) {
    this.src = config.src
    this.name = config.name
    this.code = 'dssadasdas'
  }

  sayHello () {
    console.log(this.name)
  }
}
