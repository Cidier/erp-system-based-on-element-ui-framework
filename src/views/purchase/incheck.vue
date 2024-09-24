<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入采购计划id/供应商名称" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="porderADD">
          生成采购订单</el-button>
     -->
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
        width="150"
        prop="id"
        label="进仓单号"
      />
      <el-table-column
        width="150"
        prop="poId"
        label="采购订单号"
      />
      <el-table-column
        prop="statue"
        label="审核状态"
        width="150"
      />
      <el-table-column
        prop="checkStatue"
        label="抽检审核状态"
        width="150"
      />
      <el-table-column
        prop="date"
        label="生成时间"
        width="150"
        sortable
      />
      <el-table-column
        prop="stockTime"
        label="进仓时间"
        width="150"
      />
      <el-table-column
        prop="finanTime"
        label="收款时间"
        width="150"
      />
      <el-table-column
        prop="logisticTime"
        label="签收时间"
        width="150"
      />
      <el-table-column label="操作" width="200">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="查看客诉报告" width="220">
        <template slot-scope="{row,$index}">
          <el-button type="text" @click="gotoCheck(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataPlan" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="进仓单号" prop="id">
          <el-input v-model="dataPlan.id" readonly />
        </el-form-item>

        <el-form-item label="进仓时间" prop="date">
          <el-date-picker
            v-model="dataPlan.stockTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="收款时间" prop="date">
          <el-date-picker
            v-model="dataPlan.finanTime"
            type="datetime"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="签收时间" prop="date">
          <el-date-picker
            v-model="dataPlan.logisticTime"
            type="datetime"
            placeholder="选择日期时间"
          />
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
import { getList, update, deleteById } from '@/api/incheck'

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
      dataPlan: {}
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
    listplantext(row, column, event, cell) {
      if (column.label === '进仓单号') {
        this.$router.push({ name: 'inchecktext', query: { id: row.id }})
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
      this.dataPlan = data
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        update(this.dataPlan).then(() => {
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

      deleteById(row.id)
      this.handleDelete()
      this.fetchData()
    },
    handleDelete(id) {
      this.fetchData() // 删除之后重新加载表格的数据
    },
    gotoCheck(row) {
      this.$router.push({ name: 'check', query: { id: row.id }})
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

