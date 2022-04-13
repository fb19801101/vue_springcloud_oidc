/** When your routing table is too long, you can split it into small modules **/

const LayoutChild = () => import('@/components/LayoutTabs/LayoutChild')
const TuiEditor = () => import('@views/ToastUi/TuiEditor')
const TuiViewer = () => import('@views/ToastUi/TuiViewer')
const TuiGrid = () => import('@views/ToastUi/TuiGrid')
const TuiChart = () => import('@views/ToastUi/TuiChart')

const toastRouter = [
  {
    path: 'toast',
    name: 'ToastUI',
    components: { TabPaneView: LayoutChild },
    meta: {
      title: 'ToastUI',
      cache: false,
      affix: false,
      auth: true,
      svg: 'sub-group'
    },
    children: [
      {
        path: 'editor',
        name: 'TuiEditor',
        components: { TabPaneChild: TuiEditor },
        meta: {
          title: '富文本E',
          cache: false,
          affix: false,
          auth: true,
          svg: 'sub-unit'
        }
      },
      {
        path: 'viewer',
        name: 'TuiViewer',
        components: { TabPaneChild: TuiViewer },
        meta: {
          title: '富文本V',
          cache: false,
          affix: false,
          auth: true,
          svg: 'sub-unit'
        }
      },
      {
        path: 'grid',
        name: 'TuiGrid',
        components: { TabPaneChild: TuiGrid },
        meta: {
          title: '表格',
          cache: false,
          affix: false,
          auth: true,
          svg: 'sub-unit'
        }
      },
      {
        path: 'chart',
        name: 'TuiChart',
        components: { TabPaneChild: TuiChart },
        meta: {
          title: '图表',
          cache: false,
          affix: false,
          auth: true,
          svg: 'sub-unit'
        }
      }
    ]
  }
]

export default toastRouter
