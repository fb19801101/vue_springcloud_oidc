<template>
  <div>
    <el-dialog class="func-dialog" :title="authData.title" :visible.sync="dialogMethodVisible" center :close-on-click-modal="false">
      <div class="con-box-div">
        <span>授权对象：{{authData.objName}}</span>
      </div>
      <el-table :data="authData.tableData" border style="width: 701px">
        <el-table-column prop="type" label="权限类型" width="300"></el-table-column>
        <el-table-column prop="scan" label="浏览" width="200" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.scan " :disabled="scope.row._scan"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="manage" label="管理" width="200" align="center">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.manage" :disabled="scope.row._manage" @change="scope.row.manage ? scope.row.scan=true : scope.row.scan"></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMethodAuth()">取 消</el-button>
        <el-button type="primary" @click="saveMethodAuth()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import LoginApi from '@/api/login'

export default {
  name: 'MethodAuth',
  props: {
    authData: {
      type: Object,
      default: () => {
        return { title: '', objName: '', objProvider: '', objId: 0, tableData: [], dialogMethodVisible }
      }
    }
  },
  computed: {
    dialogMethodVisible: {
      get () {
        return this.authData.dialogMethodVisible
      },
      set (val) {
        this.authData.dialogMethodVisible = val
        this.$emit('update:authData', this.authData)
      }
    }
  },
  methods: {
    getMethodAuth (manage, scan) {
      if (!manage && !scan) {
        return 0
      } else if (!manage && scan) {
        return 1
      } else if (manage && scan) {
        return 2
      } else {
        return 0
      }
    },
    saveMethodAuth () {
      const list = this.authData.tableData
      const authOrg = this.getMethodAuth(list[0].manage, list[0].scan)
      const authOpAuth = this.getMethodAuth(list[1].manage, list[1].scan)
      const authQueryAuth = this.getMethodAuth(list[2].manage, list[2].scan)
      const authLog = this.getMethodAuth(list[3].manage, list[3].scan)
      const authPostChange = this.getMethodAuth(list[4].manage, list[4].scan)
      const authPostDelete = this.getMethodAuth(list[5].manage, list[5].scan)

      LoginApi.updateAuth(this.global.providerId, this.global.userId, this.authData.objProvider, this.authData.objId,
        authOrg, authOpAuth, authQueryAuth, authLog, authPostChange, authPostDelete
      ).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '权限更改成功!',
            duration: 500
          })
        }
      })

      this.dialogMethodVisible = false
    },
    closeMethodAuth () {
      this.dialogMethodVisible = false
    },
    handleCheck (row) {
      if (!row._manage) {
        const row_op = this.authData.tableData[1]
        const row_log = this.authData.tableData[3]
        if (row_op != null && row_log != null) {
          if (row_op.manage) {
            row_op.scan = true
            row_log.scan = true
            row_log._scan = false
          } else {
            row_log.scan = false
            row_log._scan = true
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-table >>>.disabledSelection .cell .el-checkbox__inner{
    display: none;
  }
  .el-table >>>.disabledSelection .cell::before{
    content: '管理';

    left: 10px;
  }
  .el-table >>>.disabledSelection1 .cell .el-checkbox__inner{
    display: none;
  }
  .el-table >>>.disabledSelection1 .cell::before{
    content: '浏览';
    left: 10px;
  }

  .con-box-div{
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-family: "Microsoft YaHei UI",serif;
    font-weight: bold;
    vertical-align: middle;
    text-align: left;
    margin: 0 auto;

    span{
      display: block;
      line-height: 40px;
    }
  }

  //scss/less /deep/**
  //stylus >>>**
  .func-dialog >>>.el-dialog {
    //给 el-dialog__body 加 overflow auto 实现 body内部滚动
    display: flex;
    flex-direction: column;
    margin: 0 !important;

    //通过 transform 来实现水平和垂直居中
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    //设置对话框的高度和宽度
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
    width: 760px;

    //给 el-dialog__body 加 overflow auto 实现 body内部滚动
    .el-dialog__body{
      flex: 1;
      overflow: auto;
    }
  }
</style>
