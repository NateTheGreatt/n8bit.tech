export default function (canvas, audio, options) {
  var canvasCtx = canvas.getContext('2d')

  var WIDTH = canvas.width
  var HEIGHT = canvas.height

  var analyser1 = audio.createAnalyser()
  var analyser2 = audio.createAnalyser()

  var splitter = audio.createChannelSplitter(2)

  // osc.connect(splitter)
  // osc2.connect(splitter)

  // console.log(splitter.numberOfOutputs)
  splitter.connect(analyser1, 0, 0)
  splitter.connect(analyser2, 1, 0)

  var fttSize = Math.pow(2, 12) // must be power of two and max of 32768 (2^15)
  analyser1.fftSize = fttSize
  analyser2.fftSize = fttSize

  var binCount = analyser1.frequencyBinCount
  var wave1 = new Float32Array(binCount)
  var wave2 = new Float32Array(binCount)

  canvas.width = WIDTH
  canvas.height = HEIGHT

  // set the origin to the center of the canvas
  canvasCtx.translate(canvas.width * 0.5, canvas.height * 0.5)

  // rotate 45 degrees
  canvasCtx.rotate(45 * Math.PI / 180)

  if (!options) options = {}

  var opts = {
    scale: options.scale || 1,
    style: options.style || 'lines',
    lineWidth: options.lineWidth || 1.5,
    color: options.color || '#000000',
    bgColor: options.bgColor || 'rgba(255,255,255,0.5)',
    trail: options.trail || 1
  }

  this.setColor = (c) => {
    opts.color = c
  }

  this.setChannels = (ch1, ch2) => {
    ch1.connect(splitter)
    ch2.connect(splitter)
  }

  this.draw = () => {
    canvasCtx.clearRect(-WIDTH, -HEIGHT, WIDTH * 2, HEIGHT * 2)
    canvasCtx.lineWidth = opts.lineWidth
    canvasCtx.strokeStyle = opts.color
    canvasCtx.fillStyle = opts.bgColor

    // canvasCtx.fillRect(-WIDTH,-HEIGHT,WIDTH*2,HEIGHT*2)

    analyser1.getFloatTimeDomainData(wave1)
    analyser2.getFloatTimeDomainData(wave2)

    canvasCtx.beginPath()

    for (var i = 0; i < binCount; i++) {
      var a = wave1[i] * WIDTH / 3
      var b = wave2[i] * HEIGHT / 3

      var x = a * opts.scale
      var y = b * opts.scale

      if (opts.style === 'lines') {
        canvasCtx.lineTo(x, y)
      }

      if (opts.style === 'dots') {
        canvasCtx.arc(x, y, 1, 0, 2 * Math.PI, true)
      }
    }

    canvasCtx.stroke()

    window.requestAnimationFrame(this.draw.bind(this))
  }
  this.start = this.draw
  this.canvas = canvas
}
