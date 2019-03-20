<template>
  <vue-json-editor v-model="json" :show-btns="true" :mode="'code'" :lang="'en'" @json-change="onJsonChange" @json-save="onJsonSave" @has-error="onError"></vue-json-editor>
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
            },

            onJsonSave (value) {
                console.log('value:', value);
            },

            onError (value) {
                console.log('value:', value);
            }
        }
    }
</script>
