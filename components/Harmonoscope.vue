<script>
import Harmonoscope from '~assets/js/Harmonoscope.js'
// import Konami from 'konami-js'

export default {
  props: ['collapsed', 'frequencies'],
  directives: {
    harmonoscope: {
      bind (canvas, binding) {
        canvas.harmonoscope = new Harmonoscope(canvas)
        var color = '#777777'
        var hover = '#00BFFF'
        var spinSpeed = 0.1
        canvas.harmonoscope.vectorscope.setColor(color)
        canvas.harmonoscope.start()

        canvas.addEventListener('mouseenter', (e) => {
          canvas.harmonoscope.osc2.setFrequency(canvas.harmonoscope.osc2.frequency - spinSpeed)
          canvas.harmonoscope.vectorscope.setColor(hover)
          // harmonoscope.scalar = 1
          // harmonoscope.planck = 0.002
          // harmonoscope.osc1.setDetune(0.5)
        })
        canvas.addEventListener('mouseleave', (e) => {
          canvas.harmonoscope.osc2.setFrequency(canvas.harmonoscope.osc2.frequency + spinSpeed)
          canvas.harmonoscope.vectorscope.setColor(color)
          // harmonoscope.scalar = 0
          // harmonoscope.planck = 0.0009
          // harmonoscope.osc1.setDetune(0)
        })
        canvas.addEventListener('click', (e) => {
          var f = Math.random() * 1000
          canvas.harmonoscope.osc2.setFrequency(f)
          // console.log(harmonoscope.osc1.frequency / harmonoscope.osc2.frequency)
          // harmonoscope.osc2.setFrequency(Math.random() * 1000)
        })
        // var d = 0.6
        canvas.addEventListener('mousedown', (e) => {
          // harmonoscope.osc1.setDetune(d)

          // var t = Math.random() * 5 + 1
          // var interval = setInterval(() => {
          //   harmonoscope.osc1.setDetune(t)
          //   t -= 0.02
          //   if (t <= 0) clearInterval(interval)
          // }, 1)
          // setTimeout(() => {
          //   harmonoscope.osc1.setDetune(0)
          // }, 400)
        })
        canvas.addEventListener('mouseup', (e) => {
          // d = -d
          // harmonoscope.osc1.setDetune(0)
        })
        // var types = ['sine', 'triangle', 'square', 'sawtooth']
        // var i = 1
        // Konami(() => {
        //   canvas.harmonoscope.osc1.setType(types[i])
        //   canvas.harmonoscope.osc2.setType(types[i])
        //   i++
        // })
      },
      update (canvas, binding) {
        canvas.harmonoscope.osc1.setFrequency(binding.value.osc1)
        canvas.harmonoscope.osc2.setFrequency(binding.value.osc2)
      }
    }
  }
}
</script>

<template>
<canvas id="harmonoscope" :class="{'collapsed': collapsed}" width=100 height=100 v-harmonoscope="frequencies"></canvas>
</template>

<style>

#harmonoscope {
  width: 80px;
  height: 80px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

#harmonoscope.collapsed {
  width: 50px;
  height: 50px;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}
</style>
