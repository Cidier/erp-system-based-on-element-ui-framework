<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入销售订单id/买方名称" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="orderADD">
          新增销售订单</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :cell-class-name="addClass"
      border
      stripe
      @cell-click="listplantext"
    >
      <el-table-column
        width="100"
        prop="id"
        label="销售订单ID"
      />
      <el-table-column
        prop="date"
        label="订单日期"
        width="160"
        sortable
      />
      <el-table-column
        prop="buyer"
        label="买方"
        width="100"
      />
      <el-table-column
        prop="saler"
        label="卖方"
        width="100"
      />
      <el-table-column
        prop="sumPrice"
        label="货款总价"
        width="100"
      />
      <el-table-column
        prop="cutPrice"
        label="分切费"
        width="100"
      />
      <el-table-column
        prop="freight"
        label="运费"
        width="100"
      />
      <el-table-column
        prop="lastPrice"
        label="合同总价"
        width="100"
      />
      <el-table-column
        width="100"
        prop="isStock"
        label="出库状态"
      />
      <el-table-column
        prop="isPay"
        label="付款状态"
        width="100"
      />
      <el-table-column
        width="100"
        prop="type"
        label="类型"
      />
      <el-table-column
        prop="requirement"
        label="特殊要求"
        width="150"
      />
      <el-table-column
        prop="isCheck"
        label="审核状态"
        width="100"
      />

      <el-table-column label="操作" width="150">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="150">
        <template slot-scope="{row,$index}">
          <el-button type="primary" @click="Check(row,$index)">审核</el-button>
        </template>
      </el-table-column>
      <el-table-column label="出库/生产" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.type === '直出'" type="text" @click="createTo(scope.row)">生成出仓单</el-button>
          <el-button v-if="scope.row.type === '分切'" type="text" @click="createProduce(scope.row)">生成分切出仓单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataSell" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="销售订单ID" prop="id">
          <el-input v-model="dataSell.id" />
        </el-form-item>

        <el-form-item label="订单日期" prop="date">
          <el-input v-model="dataSell.date" />
        </el-form-item>

        <el-form-item label="买方" prop="buyer">
          <el-input v-model="dataSell.buyer" />
        </el-form-item>

        <el-form-item label="货款总价" prop="sumPrice">
          <el-input v-model="dataSell.sumPrice" readonly />
        </el-form-item>

        <el-form-item label="分切费" prop="cutPrice">
          <el-input v-model="dataSell.cutPrice" />
        </el-form-item>

        <el-form-item label="运费" prop="freight">
          <el-input v-model="dataSell.freight" />
        </el-form-item>

        <el-form-item label="合同总价" prop="lastPrice">
          <el-input v-model="dataSell.lastPrice" readonly />
        </el-form-item>

        <el-form-item label="出库状态" prop="isStock">
          <el-input v-model="dataSell.isStock" />
        </el-form-item>

        <el-form-item label="付款状态" prop="isPay">
          <el-input v-model="dataSell.isPay" />
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="dataSell.type" />
        </el-form-item>

        <el-form-item label="特殊要求" prop="requirement">
          <el-input v-model="dataSell.requirement" />
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
  </div></template>

<script>
import { getList, addSell, updateSell, deleteSell, updateSellState, createToBySellId, createProduceBySellId } from '@/api/sellmain'
//   import { addPOrderByPlan } from '@/api/pordermain'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }

      return statusMap[status]
    }
  },
  data() {
    return {
      dialogVisible: false,
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      listLoading: true,
      addVisible: false,
      dataSell: {
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
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    addClass({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return 'cell-blue'
      }
    },
    fetchData() {
      this.listLoading = true
      getList({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
      }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    orderADD() {
      this.$router.replace({ name: 'selladd_manage' })
    },
    listplantext(row, column, event, cell) {
      if (column.label == '销售订单ID') {
        this.$router.push({ name: 'selltext_manage', query: { id: row.id }})
      }
      // this.$router.replace({name:'planmaintext_manage'})
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
      this.dataSell = data
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updateSell(this.dataSell).then(() => {
          this.addVisible = false
          this.$notify({
            title: 'Success',
            message: 'updateSuccessfully',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
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

      deleteSell(row.id)
      this.handleDelete()
      this.fetchData()
    },
    handleDelete(id) {
      this.fetchData() // 删除之后重新加载表格的数据
    },
    Check(row, index) {
      console.log(row)
      console.log(row.isCheck)
      if (row.isCheck === '已审核') {
        this.$notify({
          title: 'error',
          message: '已审核！',
          type: 'error',
          duration: 2000
        })

        this.fetchData()
      } else {
        updateSellState(row)
        this.$notify({
          title: 'Success',
          message: '审核成功！',
          type: 'success',
          duration: 2000
        })
        this.$router.replace({ name: 'sellmain_manage' })
        this.fetchData()
      }
    },
    createTo(row) {
      if (row.isStock === '已出库') {
        this.$notify({
          title: 'error',
          message: '已出库',
          type: 'error',
          duration: 2000
        })
      } else {
        createToBySellId(row.id).then(response => {
          this.$notify({
            title: 'Success',
            message: '直接出仓成功',
            type: 'success',
            duration: 2000
          })
          this.fetchData()
        })
      }
    },
    createProduce(row) {
      createProduceBySellId(row.id).then(response => {
        this.$notify({
          title: 'Success',
          message: '分切出仓单生成成功',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
    }

  }
}
</script>
  <style>
    .cell-blue{
        color: blue!important;
        cursor: pointer;
    }
</style>

