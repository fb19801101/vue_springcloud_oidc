
<template>
  <svg :class="svgClass" aria-hidden="true" @click="svgEvent">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  },
  methods: {
    svgEvent () {
      this.$emit('svgEvent')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  svg {
    cursor: pointer
  }
  svg:hover {
    background: $black;
    opacity: 1;
    color: $light-blue;
  }
</style>
