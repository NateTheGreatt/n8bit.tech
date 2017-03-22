<script>
import Harmonoscope from '~assets/js/Harmonoscope.js'

export default {
  directives: {
    harmonoscope: {
      bind (canvas) {
        var harmonoscope = new Harmonoscope(canvas)
        harmonoscope.start()
        canvas.addEventListener('mouseenter', (e) => {
          harmonoscope.vectorscope.setColor('#00BFFF')
          harmonoscope.scalar = 1
          harmonoscope.planck = 0.002
          // harmonoscope.osc1.setDetune(0.5)
        })
        canvas.addEventListener('mouseleave', (e) => {
          harmonoscope.vectorscope.setColor('#eeeeee')
          harmonoscope.scalar = 0
          harmonoscope.planck = 0.0009
          // harmonoscope.osc1.setDetune(0)
        })
        canvas.addEventListener('click', (e) => {
          var t = Math.random() * 5 + 1
          var interval = setInterval(() => {
            harmonoscope.osc1.setDetune(t)
            t -= 0.02
            if (t <= 0) clearInterval(interval)
          }, 1)
          // setTimeout(() => {
          //   harmonoscope.osc1.setDetune(0)
          // }, 400)
        })
      }
    }
  }
}
</script>

<template>
<canvas id="harmonoscope" width=50 height=50 v-harmonoscope></canvas>
</template>

<style>
#harmonoscope {
  /*float: left;*/
}
</style>
