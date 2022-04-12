<template>
  <div class="flex-toast-container">
    <h1>🍞 🔡 TOAST UI Grid</h1>
    <el-scrollbar class="flex-toast-scroll">
      <toast-ui-grid
        class="flex-toast-body"
        :data="grid.data"
        :columns="grid.columns"
        :options="grid.options"
        :theme="grid.myTheme"
        @check="onCheck"
        @uncheck="onUnCheck"
        :rowHeaders="grid.rowHeaders"
        :columnOptions="grid.columnOptions">
      </toast-ui-grid>
    </el-scrollbar>
  </div>
</template>

<script>
import ToastUiGrid from '@/components/ToastUi/Grid/Grid'

export default {
  name: 'TuiGrid',
  components: { ToastUiGrid },
  data () {
    return {
      grid: {}
    }
  },
  created () {
    this.grid = {
      rowHeaders: ['checkbox', 'rowNum'],
      columnOptions: {
        resizable: true,
        frozenCount: 1
      },
      columns: [
        {
          header: 'Name',
          name: 'name',
          editor: 'text'
        },
        {
          header: 'Artist',
          name: 'artist'
        },
        {
          header: 'Personal Score',
          name: 'score',
          onBeforeChange (ev) {
            console.log('executes before the value changes : ', ev)
          },
          onAfterChange (ev) {
            console.log('executes after the value has changed : ', ev)
          },
          copyOptions: {
            useListItemText: true
          },
          formatter: 'listItemText',
          editor: {
            type: 'radio',
            options: {
              listItems: [
                {
                  text: '★☆☆☆☆',
                  value: '1'
                },
                {
                  text: '★★☆☆☆',
                  value: '2'
                },
                {
                  text: '★★★☆☆',
                  value: '3'
                },
                {
                  text: '★★★★☆',
                  value: '4'
                },
                {
                  text: '★★★★★',
                  value: '5'
                }
              ]
            }
          }
        }
      ],
      data: [
        {
          name: 'Kiss and Make Up',
          artist: 'Dua Lipa',
          score: '5'
        },
        {
          name: 'Bohemian Rhapsody',
          artist: 'Queen',
          score: '2'
        },
        {
          name: 'Done For Me',
          artist: 'Charlie Puth',
          score: '3'
        },
        {
          name: 'thank u, next',
          artist: 'Ariana Grande',
          score: '4'
        },
        {
          name: 'Handclap',
          artist: 'Fitz & The Tantrums',
          score: '1'
        },
        {
          name: 'Shape Of You',
          artist: 'Ed Sheeran',
          score: '5'
        },
        {
          name: 'Snowman',
          artist: 'Sia',
          score: '5'
        },
        {
          name: "Don't Stop Me Now ",
          artist: 'Queen',
          score: '3'
        },
        {
          name: 'Havana',
          artist: 'Camila Cabello',
          score: '2'
        },
        {
          name: 'A No No',
          artist: 'Mariah Carey',
          score: '5'
        },
        {
          name: 'Kiss and Make Up',
          artist: 'Dua Lipa',
          score: '5'
        },
        {
          name: 'Bohemian Rhapsody',
          artist: 'Queen',
          score: '2'
        },
        {
          name: 'Done For Me',
          artist: 'Charlie Puth',
          score: '3'
        },
        {
          name: 'thank u, next',
          artist: 'Ariana Grande',
          score: '4'
        },
        {
          name: 'Handclap',
          artist: 'Fitz & The Tantrums',
          score: '1'
        },
        {
          name: 'Shape Of You',
          artist: 'Ed Sheeran',
          score: '5'
        },
        {
          name: 'Snowman',
          artist: 'Sia',
          score: '5'
        },
        {
          name: "Don't Stop Me Now ",
          artist: 'Queen',
          score: '3'
        },
        {
          name: 'Havana',
          artist: 'Camila Cabello',
          score: '2'
        },
        {
          name: 'A No No',
          artist: 'Mariah Carey',
          score: '5'
        },
        {
          name: 'Kiss and Make Up',
          artist: 'Dua Lipa',
          score: '5'
        },
        {
          name: 'Bohemian Rhapsody',
          artist: 'Queen',
          score: '2'
        },
        {
          name: 'Done For Me',
          artist: 'Charlie Puth',
          score: '3'
        },
        {
          name: 'thank u, next',
          artist: 'Ariana Grande',
          score: '4'
        },
        {
          name: 'Handclap',
          artist: 'Fitz & The Tantrums',
          score: '1'
        },
        {
          name: 'Shape Of You',
          artist: 'Ed Sheeran',
          score: '5'
        },
        {
          name: 'Snowman',
          artist: 'Sia',
          score: '5'
        },
        {
          name: "Don't Stop Me Now ",
          artist: 'Queen',
          score: '3'
        },
        {
          name: 'Havana',
          artist: 'Camila Cabello',
          score: '2'
        },
        {
          name: 'A No No',
          artist: 'Mariah Carey',
          score: '5'
        },
        {
          name: 'Kiss and Make Up',
          artist: 'Dua Lipa',
          score: '5'
        },
        {
          name: 'Bohemian Rhapsody',
          artist: 'Queen',
          score: '2'
        },
        {
          name: 'Done For Me',
          artist: 'Charlie Puth',
          score: '3'
        },
        {
          name: 'thank u, next',
          artist: 'Ariana Grande',
          score: '4'
        },
        {
          name: 'Handclap',
          artist: 'Fitz & The Tantrums',
          score: '1'
        },
        {
          name: 'Shape Of You',
          artist: 'Ed Sheeran',
          score: '5'
        },
        {
          name: 'Snowman',
          artist: 'Sia',
          score: '5'
        },
        {
          name: "Don't Stop Me Now ",
          artist: 'Queen',
          score: '3'
        },
        {
          name: 'Havana',
          artist: 'Camila Cabello',
          score: '2'
        },
        {
          name: 'A No No',
          artist: 'Mariah Carey',
          score: '5'
        }
      ],
      myTheme: {
        name: 'myTheme',
        value: {
          cell: {
            normal: {
              background: '#00ff00',
              border: '#e0e0e0'
            },
            header: {
              background: '#ff0000',
              border: '#ffff00'
            },
            editable: {
              background: '#fbfbfb'
            }
          }
        }
      },
      options: {
        rowHeaders: ['checkbox']
      }
    }
  },
  methods: {
    onCheck (ev) {
      console.log('check event: ', ev)
    },
    onUnCheck (ev) {
      console.log('uncheck event: ', ev)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .flex-toast-container >>> {
    margin-left: 5px;
    flex-display();
    flex-direction(column);
    flex-justify-content(space-between);
    background-color: $white;
    color: $gray-black;
    height: calc(100vh - 120px);
    .flex-toast-scroll {
      flex(1);
      white-space: nowrap;
      overflow: hidden;
      .el-scrollbar__wrap {
        overflow: scroll;
        height: calc(100% + 17px);
        .el-scrollbar__view {
          background-color: $white;
          color: $gray-black;
          .flex-toast-body {
          }
        }
      }
      //定义滚动条宽高
      > .el-scrollbar__bar {
        z-index: 9999;
        &.is-horizontal {
        }
        &.is-vertical {
          height: 100%;
          width: 10px;
          background-color: transparent;
        }
      }
      //定义滚动条里面的中间条颜色
      .el-scrollbar__thumb {
        background-color: $gray-white;
        border-radius: 5px;
        transition: background 0.4s;
      }
      .el-scrollbar__thumb:hover {
        background: $gray;
      }
    }
  }
</style>
