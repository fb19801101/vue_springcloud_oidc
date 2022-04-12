<template>
  <div class="flex-toast-container">
    <toast-ui-editor class="flex-toast-body" :initialValue="content" height="100%" />
  </div>
</template>

<script>
import ToastUiEditor from '@/components/ToastUi/Editor/Editor'

export default {
  name: 'TuiEditor',
  components: { ToastUiEditor },
  data () {
    return {
      content: [
        '![image](https://uicdn.toast.com/toastui/img/tui-editor-bi.png)',
        '',
        '# Awesome Editor!',
        '',
        'It has been _released as opensource in 2018_ and has ~~continually~~ evolved to **receive 10k GitHub ⭐️ Stars**.',
        '',
        '## Create Instance',
        '',
        'You can create an instance with the following code and use `getHtml()` and `getMarkdown()` of the [Editor](https://github.com/nhn/tui.editor).',
        '',
        '```js',
        'const editor = new Editor(options);',
        '```',
        '',
        '> See the table below for default options',
        '> > More API information can be found in the document',
        '',
        '| name | type | description |',
        '| --- | --- | --- |',
        '| el | `HTMLElement` | container element |',
        '',
        '## Features',
        '',
        '* CommonMark + GFM Specifications',
        '   * Live Preview',
        '   * Scroll Sync',
        '   * Auto Indent',
        '   * Syntax Highlight',
        '        1. Markdown',
        '        2. Preview',
        '',
        '## Support Wrappers',
        '',
        '> * Wrappers',
        '>    1. [x] React',
        '>    2. [x] Vue',
        '>    3. [ ] Ember'
      ].join('\n')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-toast-container >>> {
    margin-left: 5px;
    background-color: $white;
    color: $gray-black;
    height: calc(100vh - 125px);
    .flex-toast-body {
      .ProseMirror::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      .ProseMirror::-webkit-scrollbar-thumb {
        background-color: $gray-white;
        border-radius: 4px;
        transition: background 0.4s;
      }

      .ProseMirror::-webkit-scrollbar-thumb:hover {
        background: $gray;
      }

      .ProseMirror::-webkit-scrollbar-track {
        width: 8px;
        height: 8px;
        background-color: transparent;
      }
    }
  }
</style>
