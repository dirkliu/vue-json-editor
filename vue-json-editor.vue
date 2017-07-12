<template>
  <div>
    <div class="jsoneditor-vue"></div>
    <div class="jsoneditor-btns" v-if="showBtns!==false"><button class="json-save-btn" type="button" @click="onSave()" :disabled="error">保存</button></div>
  </div>
</template>

<script>
  import './assets/jsoneditor.css'
  import JsonEditor from './assets/jsoneditor'

  export default {
    props: ['value', 'showBtns'],
    watch: {
      value: function (newValue) {
        this.editor.set(newValue)
      }
    },
    data () {
      return {
        editor: null,
        error: false,
        json: this.value
      }
    },
    mounted () {
      var self = this
      var options = {
        mode: 'tree',
        modes: ['tree', 'code', 'form', 'text', 'view'], // allowed modes
        onChange () {
          try {
            var json = self.editor.get()
            self.error = false
          } catch (e) {
            console.log('e:', e)
            self.error = true
          }
          if (!self.error) {
            self.json = json
            self.$emit('json-change', json)
            self.$emit('input', json)
          }
        }
      }
      this.editor = new JsonEditor(this.$el.querySelector('.jsoneditor-vue'), options, this.json)
    },
    methods: {
      onSave () {
        this.$emit('json-save', this.json)
      }
    }
  }
</script>

<style>
  .ace_line_group {
    text-align: left;
  }

  .json-editor-container {
    display: flex;
    width: 100%;
  }

  .json-editor-container .tree-mode {
    width: 50%;
  }

  .json-editor-container .code-mode {
    flex-grow: 1;
  }

  .jsoneditor-btns{
    text-align: center;
    margin-top:10px;
  }

  .jsoneditor-vue .jsoneditor-outer{
    min-height:150px;
  }

  .jsoneditor-vue div.jsoneditor-tree{
    min-height: 350px;
  }

  .json-save-btn{
    background-color: #20A0FF;
    border: none;
    color:#fff;
    padding:5px 10px;
    border-radius: 5px;
  }

  .json-save-btn:focus{
    outline: none;
  }

  .json-save-btn[disabled]{
    background-color: #1D8CE0;
  }

  code {
    background-color: #f5f5f5;
  }
</style>
