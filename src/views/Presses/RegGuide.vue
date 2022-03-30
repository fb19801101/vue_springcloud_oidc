<template>
  <div>
<!--    <div>-->
<!--      <el-button type="primary" icon="el-icon-document" @click="getHtml">-->
<!--        Get HTML-->
<!--      </el-button>-->
<!--      <div v-html="html" />-->
<!--    </div>-->
    <markdown-editor ref="markdown" v-model="content" :options="{hideModeSwitch:true, previewStyle:'vertical'}" />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/Markdown'

export default {
  name: 'RegGuide',
  components: { MarkdownEditor },
  data () {
    return {
      content: `
# this is markdown
* vue
* element
* webpack
* package
* config
* development
* production
`,
      html: ''
    }
  },
  methods: {
    getHtml () {
      this.html = this.$refs.markdown.getHtml()
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
