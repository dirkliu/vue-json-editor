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
    props: ['value', 'showBtns',"mode","modes"],
    watch: {
      value: function (newValue) {
        if (!this.internalChange) {
          this.editor.set(newValue)
        }
      }
    },
    data () {
      return {
        editor: null,
        error: false,
        json: this.value,
        internalChange: false
      }
    },
    mounted () {
     var self = this;
     var mode="tree";
     var modes= ['tree', 'code', 'form', 'text', 'view'];
      if (this.mode!==undefined) mode=this.mode;
      if (this.modes!== undefined) modes=this.modes;
     var options = {
        mode: mode,
        modes: modes, // allowed modes
        onChange () {
          try {
            var json = self.editor.get()
            self.error = false
          } catch (e) {
            self.error = true
            self.$emit('has-error')
          }
          if (!self.error) {
            self.json = json
            self.$emit('json-change', json)
            self.internalChange = true
            self.$emit('input', json)
            self.$nextTick(function () {
              self.internalChange = false
            })
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
