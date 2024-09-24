<template>
  <div class="app-container" style="background-color: #dcdcdc;">
    <el-form ref="form" :model="form" label-width="120px" prop>
      <el-form-item>
        <el-button size="small" type="primary" style="position: absolute;right:80px;" @click="createData()">保存</el-button>
        <el-button size="small" style="position: absolute;right:10px;" @click="jumpTo">取消</el-button>
      </el-form-item>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <br>
        <h3 style="margin-left: 50px;">基本信息</h3>
        <el-form-item label="采购计划ID" prop="id">
          <el-input v-model="form.id" placeholder="请输入采购计划ID" />
        </el-form-item>
        <el-form-item label="采购计划供应商" prop="supplier">
          <el-select
            v-model="form.supplier"
            placeholder="选择供应商"
            clearable
            style="width: 100%"
          >
            <el-option
              v-for="item in company"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
          <!-- <el-select v-model="form.supplier" placeholder="请输入采购计划供应商">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select> -->
        </el-form-item>
        <!-- <el-form-item label="制定时间">
          <el-col :span="11">
            <el-date-picker v-model="form.date" type="datetime" placeholder="请选择一个日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-col>
        </el-form-item> -->
        <el-form-item label="制定者" prop="maker">
          <el-input v-model="form.maker" type="textarea" placeholder="请输入制定者" />
        </el-form-item>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <h3 style="margin-left: 50px;">商品信息</h3>
        <template>
          <div class="tableDate">
            <div class="button" style="width:6%;float:right;">
              <P><el-button class="el-icon-plus" @click.prevent="addRow()" /></P>
              <p><el-button class="el-icon-minus" @click.prevent="delData()" /></p>
            </div>
            <div class="table">
              <el-table
                ref="table"
                :data="tableData"
                tooltip-effect="dark"
                border
                stripe
                style="width: 93%"
                @selection-change="selectRow"
              >
                <el-table-column type="selection" width="45" align="center" />
                <el-table-column label="序号" type="index" width="60" align="center" />
                <!-- <el-table-column  label="岗位" align="center">
                  <template slot-scope="scope">
                    <el-cascader prop="post_id" class="post_name" v-model="scope.row.post_id" :options="post_options" :show-all-levels="false" @change="test"></el-cascader>
                    <el-input v-model="scope.row.post_id"></el-input>
                  </template>
                </el-table-column> -->
                <el-table-column label="商品ID">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goodId" style="width:120px;" readonly />
                    <el-button class="el-icon-more-outline" circle @click="ShowDiaLog(scope.row,scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="出厂价">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.factoryPrice" :controls="false" class="factoryPrice" :precision="4" @change="ChangeXiaoji(scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="运费">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.freight" :controls="false" class="freight" :precision="2" @change="changeXiaoji(scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="总价">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.totalPrice" :controls="false" class="totalPrice" :precision="4" readonly />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <SupplierDialog :show-flag="dialogVisible" :search-mes="form.supplier" @resetShow="resetShow" @setMes="setMes" />
        </template>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { addPlan } from '@/api/planmain'
import { getListAll } from '@/api/supplier'
import SupplierDialog from '@/component/ToSearch/SupplierDialog.vue'
export default {
  components: {
    SupplierDialog
  },
  data() {
    return {
      tableData: [],
      selectlistRow: [],
      company: [],
      rowNum: 1,
      form: {
        id: '',
        supplier: '',
        // date:'',
        maker: ''
      },
      dialogVisible: false,
      curCompany: ''
    }
  },
  created() {
    this.iniData()
  },
  methods: {
    // 获取公司
    iniData() {
      getListAll().then(response => {
        this.company = response.data
      })
    },
    createData() {
      this.$refs['form'].validate((valid) => {
        addPlan({ planMain: this.form,
          goods: this.tableData }).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // resetForm() {
    //     this.$refs['form'].resetFields()

    //     this.$message({
    //       message: 'cancel!',
    //       type: 'warning'
    //     })
    //   },
    jumpTo() {
      // 跳转到上一次浏览的页面
      this.$router.go(-1)

      // //指定跳转的地址
      // this.$router.push('./')
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 增加行
    addRow() {
       	  var list = {
        rowNum: this.rowNum,
        planId: this.form.id,
        goodId: '',
        factoryPrice: 0,
        freight: 0,
        totalPrice: 0
   		 }
      this.tableData.unshift(list)
      this.rowNum += 1
    },
    // 删除方法
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        const val = this.selectlistRow
        // 获取选中行的索引的方法
        // 遍历表格中tableData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.tableData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.tableData.splice(i, 1)
            }
          })
        })
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection()
    },
    // 商品组件
    ShowDiaLog(row, index) {
      this.curIndex = index
      this.dialogVisible = true
    },
    // 点击取消的事件
    resetShow() {
      //  这里可重置数据
      this.dialogVisible = false
    },
    setMes(mes) {
      this.tableData[this.curIndex].goodId = mes.goodsId
      //  这里可重置数据
      this.dialogVisible = false
    },
    // 变价
    ChangeXiaoji(index) {
      this.tableData[index].totalPrice = (this.tableData[index].freight + this.tableData[index].factoryPrice)
    }
  }
}
</script>

  <style scoped>
  .line{
    text-align: center;
  }
  </style>

