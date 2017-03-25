import Oscillator from './Oscillator.js'
import Vectorscope from './Vectorscope.js'

export default function (canvas) {
  var AudioContext = window.AudioContext || window.webkitAudioContext
  var audioCtx = new AudioContext()

  this.osc1 = new Oscillator(audioCtx)
  this.osc2 = new Oscillator(audioCtx)

  // osc1.connect(audio.destination)
  // osc2.connect(audio.destination)

  this.osc1.setFrequency(300)
  this.osc1.setDetune(0.2)
  setTimeout(() => { this.osc1.setDetune(0) }, 3620)

  this.osc2.setFrequency(550)
  // this.osc2.setFrequency(549.92)
  // this.osc2.setFrequency(Math.random() * 1000)

  this.osc2.setDetune(0.2)
  setTimeout(() => { this.osc2.setDetune(0) }, 1940)

  // var time = 0
  // this.planck = 0.0002
  // this.scalar = 0
  // setInterval(() => {
  //   time += this.planck
  //   this.osc2.setFrequency(550 + Math.sin(time) * this.scalar)
  // }, 1)

  var options = {
    lineWidth: 1,
    style: 'lines'
  }

  this.vectorscope = new Vectorscope(canvas, audioCtx, options)
  this.vectorscope.setChannels(this.osc1, this.osc2)

  this.start = () => {
    this.osc1.start()
    this.osc2.start()
    this.vectorscope.start()
  }
}
