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
          <el-form-item label="销售订单ID" :span="8">
            <el-input v-model="form.id" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="买家" :span="8">
            <el-input v-model="form.buyer" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="21">
          <el-form-item label="订单日期">
            <el-input v-model="form.date" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="货款总价">
            <el-input v-model="form.sumPrice" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="分切费">
            <el-input v-model="form.cutPrice" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="运费">
            <el-input v-model="form.freight" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合同总价">
            <el-input v-model="form.lastPrice" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <!-- <el-form-item label="是否出库">
                    <el-select v-model="form.isStock" placeholder="请选择是否出库">
                        <el-option label="未出库" value="未出库"></el-option>
                        <el-option label="已出库" value="已出库"></el-option>
                    </el-select>
                </el-form-item> -->
          <el-form-item label="是否出库">
            <el-input v-model="form.isStock" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item label="是否付款">
                    <el-select v-model="form.isPay" placeholder="请选择是否付款">
                        <el-option label="未付款" value="未付款"></el-option>
                        <el-option label="已付款" value="已付款"></el-option>
                    </el-select>
                </el-form-item> -->
          <el-form-item label="是否付款">
            <el-input v-model="form.isPay" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="类型">
            <el-input v-model="form.type" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否审核">
            <el-input v-model="form.isCheck" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="21">
          <el-form-item label="特殊要求">
            <el-input v-model="form.requirement" type="textarea" readonly />
          </el-form-item>
        </el-col>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <h3 style="margin-left: 50px;">商品信息</h3>
        <div style="margin: 10px 0">
          <!-- <el-input v-model="search" placeholder="请输入商品id" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button> -->
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD">
            新增商品</el-button>
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
              <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
                <template #reference>
                  <el-button size="mini" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>
    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商品编号" prop="goodId">
          <el-input v-model="dataForm.goodId" />
        </el-form-item>

        <el-form-item label="数量" prop="quantity">
          <el-input v-model="dataForm.quantity" />
        </el-form-item>

        <el-form-item label="件数" prop="pieces">
          <el-input-number v-model="dataForm.pieces" :controls="false" :precision="2" />
        </el-form-item>
        <!--
        <el-form-item label="数量"   prop="quantity">
          <el-input v-model="dataForm.quantity" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button v-if="judger == 'add' " type="primary" @click="createGood()">
          确定
        </el-button>
        <el-button v-else type="primary" @click="editData()">
          确定
        </el-button>
        <!-- <el-button  type="primary" @click="editData()">
            确定
          </el-button> -->
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
import { updateSell, getList } from '@/api/sellmain'
import { getListTest, updateSellTest, addSellTest, deleteSellTest } from '@/api/selltext'

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
      judger: '', // 判断是新增还是编辑
      form: {
        id: '',
        date: '',
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
      dataForm: {
        sellId: '',
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
    this.form.id = this.$route.query.id // 接收参数
    this.getInfo()
    this.fetchData()
  },
  methods: {
    createData() {
      this.$refs['form'].validate((valid) => {
        updateSell(this.form).then(() => {
          this.$notify({
            title: 'Success',
            message: 'update Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    createGood() {
      this.$refs['dataForm'].validate((valid) => {
        this.dataForm.sellId = this.form.id
        this.dataForm.totalPrice = this.dataForm.quantity * this.dataForm.perPrice
        addSellTest(this.dataForm).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
        })
      })
    },
    getInfo() {
      getList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.form.id
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
        search: this.form.id
      }).then(response => {
        console.log(response)
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
        let xiaoji = {}
        xiaoji = this.tableData.map(v => v.totalPrice)
        let t = 0
        xiaoji.forEach(
          function(i) {
            t += i
          }
        )
        this.form.sumPrice = t
        this.form.lastPrice = this.form.sumPrice + this.form.cutPrice + this.form.freight
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
      this.$router.push({name:'sellmain_manage'})
    },
    handleSizeChange(pageSize) { // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNum) { // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    },
    handleADD() {
      this.resetADD()
      this.judger = 'add'
      this.addVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetADD() {
      this.dataForm = {
        goodId: '',
        factoryPrice: 0,
        freight: 0
      }
    },
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataForm = data
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updateSellTest(this.dataForm).then(() => {
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
    },
    Delete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
      deleteSellTest(row)
      this.handleDelete()
      this.fetchData()
    }
  }

}

</script>

  <style scoped>
  .line{
    text-align: center;
  }
  </style>

