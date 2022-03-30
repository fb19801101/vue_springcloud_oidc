<template>
  <div class="flex-markdown-container">
    <div class="flex-markdown-body" :id="id" />
  </div>
</template>

<script>
// deps for editor
import "tui-editor/dist/tui-editor.css"; // editor's ui
import "tui-editor/dist/tui-editor-contents.css"; // editor's content
import "codemirror/lib/codemirror.css"; // codemirror
import "highlight.js/styles/github.css"; // code block highlight

import Editor from 'tui-editor'
import Opts from './opts'

export default {
  name: 'MarkdownEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: false,
      default() {
        return 'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    options: {
      type: Object,
      default() {
        return Opts
      }
    },
    mode: {
      type: String,
      default: 'markdown' //markdown, wysiwyg
    },
    height: {
      type: String,
      required: false,
      default: '100vh'
    },
    language: {
      type: String,
      required: false,
      default: 'zh_CN'
    }
  },
  data() {
    return {
      editor: null
    }
  },
  computed: {
    editorOptions() {
      const options = Object.assign({}, Opts, this.options)
      options.initialEditType = this.mode
      options.height = this.height
      options.language = this.language
      return options
    }
  },
  watch: {
    value(newValue, preValue) {
      if (newValue !== preValue && newValue !== this.editor.getValue()) {
        this.editor.setValue(newValue)
      }
    },
    language(val) {
      this.destroyEditor()
      this.initEditor()
    },
    height(newValue) {
      this.editor.height(newValue)
    },
    mode(newValue) {
      this.editor.changeMode(newValue)
    }
  },
  mounted() {
    this.initEditor()
  },
  destroyed() {
    this.destroyEditor()
  },
  methods: {
    initEditor() {
      this.editor = new Editor({
        el: document.getElementById(this.id),
        ...this.editorOptions
      })
      if (this.value) {
        this.editor.setValue(this.value)
      }
      this.editor.on('change', () => {
        this.$emit('input', this.editor.getValue())
      })
    },
    destroyEditor() {
      if (!this.editor) return
      this.editor.off('change')
      this.editor.remove()
    },
    setValue(value) {
      this.editor.setValue(value)
    },
    getValue() {
      return this.editor.getValue()
    },
    setHtml(value) {
      this.editor.setHtml(value)
    },
    getHtml() {
      return this.editor.getHtml()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-markdown-container >>> {
    margin-left: 5px;
    background-color: $white;
    color: $gray-black;
    height: calc(100vh - 125px);
    .flex-markdown-body {
      .CodeMirror {
        width: 25%
      }
      .te-md-splitter {
        left: 25%
        width: 75%
      }
      .te-editor {
        width: 100%
      }
      .te-preview {
        width: 100%
      }

      .CodeMirror-vscrollbar::-webkit-scrollbar, .te-preview::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .CodeMirror-vscrollbar::-webkit-scrollbar-thumb, .te-preview::-webkit-scrollbar-thumb {
        background-color: $gray-white;
        border-radius: 4px;
        transition: background 0.4s;
      }
      .CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover, .te-preview::-webkit-scrollbar-thumb:hover {
        background: $gray;
      }
      .CodeMirror-vscrollbar::-webkit-scrollbar-track, .te-preview::-webkit-scrollbar-track {
        width: 8px;
        height: 8px;
        background-color: transparent;
      }
    }
  }
</style>
