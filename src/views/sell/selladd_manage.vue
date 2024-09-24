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
        <el-col :span="10">
          <el-form-item label="销售订单ID" :span="8">
            <el-input v-model="form.id" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="买家" :span="8">
            <el-select
              v-model="form.buyer"
              placeholder="选择客户名称"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="item in client"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="货款总价">
            <el-input v-model="form.sumPrice" :precision="4" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分切费">
            <el-input v-model="form.cutPrice" :precision="2" @input="changeMoney()" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="运费">
            <el-input v-model="form.freight" :precision="2" @input="changeMoney()" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否出库">
            <el-select v-model="form.isStock" placeholder="请选择是否出库">
              <el-option label="未出库" value="未出库" />
              <el-option label="已出库" value="已出库" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="是否出库">
                  <el-input v-model="form.isStock"/>
                </el-form-item> -->
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否付款">
            <el-select v-model="form.isPay" placeholder="请选择是否付款">
              <el-option label="未付款" value="未付款" />
              <el-option label="已付款" value="已付款" />
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="是否付款">
                    <el-input v-model="form.isPay"/>
                </el-form-item> -->
        </el-col>
        <el-col :span="10">
          <el-form-item label="类型">
            <el-select v-model="form.type" placeholder="请选择类型">
              <el-option label="直出" value="直出" />
              <el-option label="分切" value="分切" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="21">
          <el-form-item label="特殊要求">
            <el-input v-model="form.requirement" type="textarea" />
          </el-form-item>
        </el-col>

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
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.quantity" :controls="false" class="quantity" :precision="4" @change="ChangeXiaoji(scope.$index)" />
                  </template>
                </el-table-column>
                <el-table-column label="件数">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.pieces" :controls="false" class="pieces" />
                  </template>
                </el-table-column>
                <el-table-column label="单价">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.perPrice" :controls="false" class="perPrice" :precision="2" readonly />
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
          <MaterialDialog :show-flag="dialogVisible" @resetShow="resetShow" @setMes="setMes" />
        </template>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { addSell } from '@/api/sellmain'
import MaterialDialog from '@/component/ToSearch/MaterialDialog.vue'
import { getListAll } from '@/api/customer'
import { getPer } from '@/api/price'
export default {
  components: {
    MaterialDialog
  },
  data() {
    return {
      tableData: [],
      selectlistRow: [],
      rowNum: 1,
      client: [],
      dialogVisible: false,
      form: {
        id: '',
        // date: "",
        buyer: '',
        sumPrice: 0,
        cutPrice: 0,
        freight: 0,
        lastPrice: 0,
        isStock: '',
        isPay: '',
        requirement: '',
        type: ''
      },
      // 当前行
      currow: {},
      // 当前下标
      curIndex: {}
    }
  },
  wacth: {
    'form.sumPrice'() {
      this.lastPrice = this.sumPrice + this.freight + this.cutPrice
    },
    'form.cutPrice'(oldprice, newprice) {
      console.log(newprice)
      this.lastPrice = this.sumPrice + this.freight + newprice
      true
    },
    // 'form.freight'() {
    //   this.lastPrice=this.sumPrice+this.freight+this.cutPrice
    // },
    'form.freight': {
      handler(newVal, oldVal) {
        console.log('newVal', newVal)
        console.log('oldVal', oldVal)
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.iniData()
  },
  methods: {
    createData() {
      this.$refs['form'].validate((valid) => {
        addSell({ sellMain: this.form,
          goods: this.tableData }).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
          this.jumpTo()
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
    //   //跳转到上一次浏览的页面
    //   this.$router.go(-1)

      // 指定跳转的地址
      this.$router.push({ name: 'sellmain_manage' })
    },
    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val
    },
    // 增加行
    addRow() {
       	  var list = {
        rowNum: this.rowNum,
        sellId: this.form.id,
        goodId: '',
        quantity: 0,
        pieces: 0,
        perPrice: 0,
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
    // 获取公司
    iniData() {
      getListAll().then(response => {
        this.client = response.data
      })
    },
    changeMoney() {
      this.lastPrice = this.sumPrice + this.freight + this.cutPrice
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
      this.tableData[this.curIndex].goodId = mes.id
      if (this.form.buyer !== '') {
        getPer({
          goodId: this.tableData[this.curIndex].goodId,
          name: this.form.buyer
        }).then(response => {
          console.log(response)
          this.tableData[this.curIndex].perPrice = response.data
        })
      } else {
        this.$notify({
          title: 'error',
          message: '请先填写客户！',
          type: 'error',
          duration: 2000
        })
      }
      //  这里可重置数据
      this.dialogVisible = false
    },
    // 变价
    ChangeXiaoji(index) {
      this.tableData[index].totalPrice = (this.tableData[index].quantity * this.tableData[index].perPrice)
      let t = 0
      this.tableData.forEach(item => { t += item.totalPrice })
      this.form.sumPrice = t
      this.form.lastPrice = this.form.freight + this.form.sumPrice + this.form.cutPrice
    }
  }
}
</script>

  <style scoped>
  .line{
    text-align: center;
  }
  </style>

