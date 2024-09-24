<template>
  <div class="app-container" style="background-color: #dcdcdc;">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item>
        <el-button size="small" style="position: absolute;right:10px;" @click="onCancel">取消</el-button>
      </el-form-item>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <br>
        <h3 style="margin-left: 50px;">基本信息</h3>
        <el-col :span="10">
          <el-form-item label="进仓单号" :span="8">
            <el-input v-model="form.id" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购订单号" :span="8">
            <el-input v-model="form.orderId" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="生成日期">
            <el-input v-model="form.date" readonly />
          <!-- <el-col :span="11">
            <el-date-picker v-model="form.date" type="datetime" placeholder="请选择一个日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-col> -->
          </el-form-item>
        </el-col>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <h3 style="margin-left: 50px;">采购具体信息</h3>
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
            width="150"
            prop="caseNo"
            label="件号"
          />
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
            width="100"
            prop="quantity"
            label="数量"
          />
          <el-table-column label="操作" width="240">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini" @click="handleEdit(row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>

    <el-dialog :visible.sync="updateVisible">
      <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="件号" prop="goodId">
          <el-input v-model="dataForm.caseNo" readonly />
        </el-form-item>

        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="dataForm.quantity" :controls="false" :precision="4" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="editData()">
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
import { getById } from '@/api/produce'
import { getListTest, updateText } from '@/api/producetext'

export default {
  data() {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      listLoading: false,
      updateVisible: false,
      // judger: '',  //判断是新增还是编辑
      form: {
      },
      dataForm: {}
    }
  },
  created() {
    this.form.id = this.$route.query.id // 接收参数
    this.getInfo()
    this.fetchData()
  },
  methods: {
    getInfo() {
      getById(
        this.form.id
      ).then(response => {
        this.form = response.data
      })
    },
    fetchData() {
      this.listLoading = true
      getListTest({
        to_id: this.form.id
      }).then(response => {
        this.tableData = response.data
        this.listLoading = false
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
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
      this.dataForm = data
      this.updateVisible = true
    },
    editData() {
      updateText(this.dataForm).then(() => {
        this.addVisible = false
        this.$notify({
          title: 'Success',
          message: 'updateSuccessfully',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
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

