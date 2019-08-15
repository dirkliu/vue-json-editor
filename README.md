# vue-json-editor
A json editor of vue.js

## Component properties
v-model：bind the [json object]   
:show-btns: boolean, show the save button, default: true   
:mode: string, default: tree
:lang: string, default: en   
@json-change: on json changed   
@json-save: on json save   
@has-error: on error

# How to use
## 1. Install using npm
```
npm install vue-json-editor --save
```
## 2. Use vue-json-editor in the vue component
```vue
<template>
  <div>
    <p>vue-json-editor</p>
    <vue-json-editor v-model="json" :show-btns="true" @json-change="onJsonChange"></vue-json-editor>
  <div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'
  
  export default{
    data () {
      json: {
        msg: 'demo of jsoneditor'
      }
    },
    
    components: {
      vueJsonEditor
    },

    methods: {
      onJsonChange (value) {
        console.log('value:', value)
      }
    }
  }
</script>
```

