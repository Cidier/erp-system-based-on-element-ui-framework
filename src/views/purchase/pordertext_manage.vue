<template>
  <div class="app-container" style="background-color: #dcdcdc;">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item>
        <el-button size="small" type="primary" style="position: absolute;right:80px;" @click="createData()">保存</el-button>
        <el-button size="small" style="position: absolute;right:10px;" @click="onCancel">取消</el-button>
      </el-form-item>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <br>
        <h3 style="margin-left: 50px;">基本信息</h3>
        <el-col :span="10">
          <el-form-item label="采购订单ID" :span="8">
            <el-input v-model="form.orderId" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购计划ID" :span="8">
            <el-input v-model="form.planId" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="订单日期">
            <el-input v-model="form.date" readonly />
          <!-- <el-col :span="11">
            <el-date-picker v-model="form.date" type="datetime" placeholder="请选择一个日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-col> -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="卖方">
            <el-input v-model="form.saler" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="总数量">
            <el-input v-model="form.sumNum" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合价">
            <el-input v-model="form.sumPrice" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="是否审核">
            <el-input v-model="form.isCheck" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否入库">
            <el-input v-model="form.isStock" readonly />
          </el-form-item>
        </el-col>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <h3 style="margin-left: 50px;">商品信息</h3>
        <div style="margin: 10px 0">
        <!-- <el-input v-model="search" placeholder="请输入商品id" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button> -->
        </div>

        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
        >
          <el-table-column
            width="100"
            prop="goodId"
            label="商品编号"
          />
          <el-table-column
            width="120"
            prop="name"
            label="商品名称"
          />
          <el-table-column
            width="80"
            prop="brand"
            label="商品品牌"
          />
          <el-table-column
            prop="type"
            label="纸种"
            width="80"
          />
          <el-table-column
            prop="level"
            label="商品级别"
            width="80"
          />
          <el-table-column
            width="120"
            prop="specifications"
            label="商品规格"
          />
          <el-table-column
            prop="gramWeight"
            label="商品克重"
            width="80"
          />
          <el-table-column
            prop="unit"
            label="商品单位"
            width="80"
          />
          <el-table-column
            width="110"
            prop="quantity"
            label="数量"
          />
          <el-table-column
            prop="pieces"
            label="件数"
            width="110"
          />
          <el-table-column
            prop="perPrice"
            label="单价"
            width="110"
          />
          <el-table-column
            prop="totalPrice"
            label="总价"
            width="110"
          />
          <el-table-column label="操作" width="240">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>
    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="dataForm.quantity" />
        </el-form-item>

        <el-form-item label="件数" prop="pieces">
          <el-input-number v-model="dataForm.pieces" :controls="false" :precision="2" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="editData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-card :body-style="{ padding: '0px' }">
      <div style="margin: 10px 0">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { updatePOrder, getList } from '@/api/pordermain'
import { getListTest, updatePOrderText } from '@/api/pordertext'

export default {
  data() {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      listLoading: false,
      addVisible: false,
      // judger: '',  //判断是新增还是编辑
      form: {
        orderId: '',
        planId: '',
        date: '',
        saler: '',
        sumNum: '',
        sumPrice: '',
        isCheck: '',
        isStock: ''
      },
      dataForm: {
        orderId: '',
        goodId: '',
        name: '',
        brand: '',
        type: '',
        level: '',
        specifications: '',
        gramWeight: 0,
        unit: '',
        quantity: 0,
        pieces: 0,
        perPrice: 0,
        totalPrice: 0
      }
    }
  },
  created() {
    this.form.orderId = this.$route.query.id // 接收参数
    this.getInfo()
    this.fetchData()
  },
  methods: {
    createData() {
      this.$refs['form'].validate((valid) => {
        updatePOrder(this.form).then(() => {
          this.$notify({
            title: 'Success',
            message: 'update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    getInfo() {
      getList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.form.orderId
      }).then(response => {
        console.log(response)
        this.form = response.data.records[0]
        this.total = response.data.total
      })
    },
    fetchData() {
      this.listLoading = true
      getListTest({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.form.orderId
      }).then(response => {
        console.log(response)
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
        // 获取总价
        let xiaoji = {}
        xiaoji = this.tableData.map(v => v.totalPrice)
        let t = 0
        xiaoji.forEach(
          function(i) {
            t += i
          }
        )
        this.form.sumPrice = t
        // 获取总数量
        let totalnum = 0
        this.tableData.forEach(item => {
          totalnum += item.quantity
        })
        this.form.sumNum = totalnum
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({name:'porder_manage'})
    },
    handleSizeChange(pageSize) { // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNum) { // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    },
    handleEdit(data) {
      this.addVisible = true
      this.dataForm = data
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updatePOrderText(this.dataForm).then(() => {
          this.addVisible = false
          this.$notify({
            title: 'Success',
            message: 'updateSuccessfully',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
          this.createData()
        })
      })
    }
  }
}
</script>

  <style scoped>
  .line{
    text-align: center;
  }
  </style>

