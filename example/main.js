import Vue from 'vue'
import vueJsonEditor from '../vue-json-editor.vue'

new Vue({
  el: '#app',
  components: { vueJsonEditor },
  render (h) {
    return h('vueJsonEditor')
  }
})
