<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入框架合同号/卖方名称" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :cell-class-name="addClass"
      border
      stripe
      @cell-click="listpordertext"
    >
      <el-table-column
        prop="orderId"
        label="采购订单ID"
        width="140"
      />
      <el-table-column
        width="100"
        prop="planId"
        label="采购计划ID"
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
        prop="sumNum"
        label="总数量"
        width="80"
      />
      <el-table-column
        prop="sumPrice"
        label="合价"
        width="80"
      />
      <el-table-column
        prop="isCheck"
        label="审核状态"
        width="80"
      />
      <el-table-column
        prop="isStock"
        label="入库状态"
        width="80"
      />

      <el-table-column label="操作" width="180">
        <template slot-scope="{row,$index}">
          <!-- <el-button size="mini" @click="handleEdit(row)">编辑</el-button> -->
          <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
      <el-table-column label="更改审核" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isCheck === '未审核'" type="text" @click="createIn(scope.row)">审核并生成进仓验货单</el-button>
        </template>
      </el-table-column>
    </el-table>

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
import { getList, deletePOrder, createInByPO } from '@/api/pordermain'

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
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      listLoading: true
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
    listpordertext(row, column, event, cell) {
      if (column.label === '采购订单ID') {
        this.$router.push({ name: 'pordertext_manage', query: { id: row.orderId }})
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

    Delete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)

      deletePOrder(row.orderId)
      this.handleDelete()
      this.fetchData()
    },
    handleDelete(id) {
      this.fetchData() // 删除之后重新加载表格的数据
    },
    createIn(row) {
      createInByPO(row.orderId).then(response => {
        this.$notify({
          title: 'Success',
          message: '生成成功',
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

