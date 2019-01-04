<template>
  <div>
    <div class="jsoneditor-vue"></div>
    <div class="jsoneditor-btns" v-if="showBtns!==false"><button class="json-save-btn" type="button" @click="onSave()" :disabled="error">{{ locale[lang].save }}</button></div>
  </div>
</template>

<script>
    import './assets/jsoneditor.css'
    import JsonEditor from './assets/jsoneditor'
    export default {
        props: ['value', 'showBtns', 'mode', 'modes', 'lang'],
        watch: {
            value: {
                immediate: true,
                handler (val)
                {
                    if (!this.internalChange)
                    {
                        this.setEditor(val)
                    }
                },
                deep: true
            }
        },
        data () {
            return {
                editor: null,
                error: false,
                json: this.value,
                internalChange: false,
                locale: {
                    'it': {
                        save: 'SALVA',
                    },
                    'en': {
                        save: 'SAVE',
                    },
                    'zh': {
                        save: '保存'
                    }
                }
            }
        },
        mounted ()
        {
            let self = this;
            let defaultMode = 'tree';
            let defaultModes = ['tree', 'code', 'form', 'text', 'view'];

            if (this.mode === undefined) this.mode = defaultMode;
            if (this.modes === undefined) this.modes = defaultModes;
            if (this.lang === undefined) this.lang = 'en';

            let options = {
                mode: this.mode,
                modes: this.modes, // allowed modes
                onChange () {
                    try {
                        let json = self.editor.get();
                        self.json = json;
                        self.$emit('json-change', json);
                        self.internalChange = true;
                        self.$emit('input', json);
                        self.$nextTick(function () {
                            self.internalChange = false
                        })
                    } catch (e) {
                        self.$emit('has-error', e);
                    }
                }
            };

            this.editor = new JsonEditor(this.$el.querySelector('.jsoneditor-vue'), options, this.json)
        },
        methods: {
            onSave () {
                this.$emit('json-save', this.json)
            },

            setEditor(value)
            {
                if(this.editor)
                    this.editor.set(value)
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
