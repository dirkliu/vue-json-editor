<template>
  <vue-json-editor v-model="json" :showBtns="false" @json-change="onJsonChange"></vue-json-editor>
</template>

<script>
import vueJsonEditor from '../vue-json-editor.vue'
export default {
  data () {
    return {
      json: {
        name: "Dirk"
      }
    }
  },

  components: {
    vueJsonEditor
  },

  methods: {
    onJsonChange (value) {
      console.log('value:', value);
    }
  }
}
</script>
