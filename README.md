# vue-json-editor
A jsoneditor of vue.js

## 依赖
vue.js

## 组件属性
v-model：必须，[json对象]组件的json对象   
:showBtns: boolean,是否显示保存按钮，默认为true   
@json-change: json发生变化后的事件

# 怎么使用
## 1. 使用npm安装vue-json-editor
```
npm install vue-json-editor --save
```
## 2. 在vue组件中使用vue-json-editor
```
<template>
  <div>
    <p>vue-json-editor使用</p>
    <!--在模板中使用vue-json-editor-->
    <vue-json-editor v-model="json" :showBtns="true" @json-change="onJsonChange"></vue-json-editor>
  <div>
</template>

<script>
  // 引入vue-json-editor模块
  import vueJsonEditor from 'vue-json-editor'
  export default {
    data () {
      json: {
        msg: 'demo of jsoneditor'
      }
    },

    // 注入vueJsonEditor组件
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
