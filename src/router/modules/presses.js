/** When your routing table is too long, you can split it into small modules **/

const LayoutChild = () => import('@/components/LayoutTabs/LayoutChild')
const RegGuide = () => import('@views/Presses/RegGuide')
const RedFile = () => import('@views/Presses/RedFile')

const pressesRouter = [
  {
    path: 'presses',
    name: 'Presses',
    components: { TabPaneView: LayoutChild },
    meta: {
      title: '消息聚合',
      cache: false,
      affix: false,
      auth: true,
      svg: 'presses'
    },
    children: [
      {
        path: 'reg',
        name: 'RegGuide',
        components: { TabPaneChild: RegGuide },
        meta: {
          title: '注册指南',
          cache: false,
          affix: false,
          auth: true,
          svg: 'presses-info'
        }
      },
      {
        path: 'red',
        name: 'RedFile',
        components: { TabPaneChild: RedFile },
        meta: {
          title: '红头文件',
          cache: false,
          affix: false,
          auth: true,
          svg: 'presses-info'
        }
      }
    ]
  }
]

export default pressesRouter
