<template>
  <div>
    <div class="jsoneditor-vue"></div>
    <div class="jsoneditor-btns"><el-button type="success" @click="onSave()" :disabled="error">保存</el-button></div>
  </div>
</template>

<script>
  import './assets/jsoneditor.css'
  import JsonEditor from './assets/jsoneditor'

  export default {
    props: ['value'],
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

  code {
    background-color: #f5f5f5;
  }
</style>
