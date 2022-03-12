<template>
  <div>
    <el-dialog class="func-dialog" :title="planData.title" :visible.sync="dialogMethodVisible" center :close-on-click-modal="false">
      <el-form ref="form-params" :model="planData" label-width="100px">
        <el-divider content-position="center">工作信息</el-divider>
        <el-row :gutter="20">
          <el-form-item label="工作ID">
            <span>{{planData.item.id}}</span>
          </el-form-item>
          <el-form-item label="工作内容">
            <span>{{planData.item.work}}</span>
          </el-form-item>
          <el-form-item label="工作层级">
            <span>{{planData.item.level}}</span>
          </el-form-item>
        </el-row>
        <el-divider content-position="center">工作计划</el-divider>
        <el-row :gutter="20">
          <el-form-item label="计划开始时间">
            <span>{{planData.item._PB}}</span>
          </el-form-item>
          <el-form-item label="计划结束时间">
            <span>{{planData.item._PE}}</span>
          </el-form-item>
          <el-form-item label="计划持续时间">
            <span>{{planData.item._PG}}</span>
            <el-checkbox v-model="planData.actual" :disabled="true" style="float: right; margin-right: 50px">采集</el-checkbox>
          </el-form-item>
        </el-row>
        <el-divider content-position="center">调整参数</el-divider>
        <el-row :gutter="20">
          <el-form-item label="计划调整类型">
            <el-radio-group v-model="planData.item.type" style="padding:0 10px">
              <el-radio :label="1">EF</el-radio>
              <el-radio :label="2">ES</el-radio>
              <el-radio :label="3">DP</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="计划调整类型" style="width:320px">
            <el-select
              v-model="planData.item.type"
              placeholder="请选择修改类型">
              <el-option :value="1" :label="1+' -- 修改结束时间 EF'"></el-option>
              <el-option :value="2" :label="2+' -- 修改开始时间 ES'"></el-option>
              <el-option :value="3" :label="3+' -- 修改持续时间 DP'"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-divider content-position="center">调整数值</el-divider>
        <el-row :gutter="20">
          <el-form-item label="计划调整工期" style="width:320px;">
            <el-input
              v-model="planData.item.value"
              placeholder="请输入计划调整工期"
              :disabled="planData.item.type !== 3"
            ></el-input>
          </el-form-item>
          <el-form-item label="计划调整时间" style="width:250px;">
            <el-date-picker
              v-model="planData.item.date"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              :disabled="planData.item.type === 3">
            </el-date-picker>
          </el-form-item>
        </el-row>

        <el-row :gutter="20" style="margin-top:30px">
          <el-form-item>
            <el-button @click="closeMethodPlan()">取 消</el-button>
            <el-button type="primary" @click="saveMethodPlan()">确 定</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import LoginApi from '@/api/login'

export default {
  name: 'MethodPlanEstimate',
  props: {
    planData: {
      type: Object,
      default: () => {
        // eslint-disable-next-line no-undef
        return { title: '动态计划调整', dialogMethodVisible, actual: false, item: { id: 0, work: '', level: 0, _PB: -1, _PE: -1, _PG: 0, type: 1, value: 0, date: '' } }
      }
    }
  },
  computed: {
    dialogMethodVisible: {
      get () {
        return this.planData.dialogMethodVisible
      },
      set (val) {
        this.planData.dialogMethodVisible = val
        this.$emit('update:planData', this.planData)
      }
    }
  },
  methods: {
    saveMethodPlan () {
      const planItems = [
        {
          id: this.planData.item.id,
          type: this.planData.item.type,
          level: this.planData.item.level,
          value: this.planData.item.value,
          date: this.planData.item.date,
          format: 'yyyy-MM-dd HH:mm:ss'
        }
      ]
      const planActual = this.planData.actual
      LoginApi.planEstimate(planItems, planActual).then(res => {
        if (res.data.code === 200) {
          this.$message({
            type: 'success',
            message: '动态计划修改成功!',
            duration: 1000
          })

          this.$emit('refreshPlan')
        } else {
          this.$message({
            type: 'waring',
            message: '动态计划修改失败!',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
      })

      this.dialogMethodVisible = false
    },
    closeMethodPlan () {
      this.dialogMethodVisible = false
    }
  }
}
</script>

<style lang="stylus" scoped>
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
    width: 400px;
    height: 800px;

    //给 el-dialog__body 加 overflow auto 实现 body内部滚动
    .el-dialog__body{
      flex: 1;
      overflow: auto;
    }

    .el-form-item {
      height: 20px !important;
      margin-left: 20px !important;
    }
  }
</style>
