import Vue from 'vue'
import SvgIcon from '@components/SvgIcon'// svg组件

// 自动加载
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const iconMap = requireAll(req)

// register globally
Vue.component('svg-icon', SvgIcon)
