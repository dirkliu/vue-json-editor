<template>
  <vue-json-editor v-model="json" :show-btns="false" @json-change="onJsonChange"></vue-json-editor>
</template>

<script>
import vueJsonEditor from '../vue-json-editor.vue'
export default {
  data () {
    return {
      json: [
        {"name": "Dirk", "age": 1234},
		    {"name": "Jason"}
      ]
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
