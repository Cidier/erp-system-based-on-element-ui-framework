<template>
  <div class="app-container">
    <div style="margin: 10px 0">
      <!--    搜索区域-->
      <el-input v-model="search" placeholder="请输入id/名称" style="width: 20%" clearable />
      <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD">
        新增仓位
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :judge="judger"
      border
      stripe
    >
      <el-table-column
        width="453"
        prop="id"
        label="ID"
        sortable
      />
      <el-table-column
        width="453"
        prop="name"
        label="仓位区域"
      />
      <el-table-column label="操作" width="260">
        <template slot-scope="{row,$index}">
          <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataWarehouse" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="编号" prop="ID">
          <el-input v-model="dataWarehouse.id" />
        </el-form-item>

        <el-form-item label="仓位区域" prop="name">
          <el-input v-model="dataWarehouse.name" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button v-if="judger == 'add' " type="primary" @click="createData()">
          确定
        </el-button>

        <el-button v-else type="primary" @click="editData()">
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
  </div>
</template>

<script>
import { getList, addWarehouse, updateWarehouse, deleteWarehouse } from '@/api/warehouse'

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
      judger: '',
      dataWarehouse: {
        id: undefined,
        name: '',
        address: '',
        email: '',
        telephone: ''

      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
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
    handleDelete(id) {
      this.fetchData() // 删除之后重新加载表格的数据
    },
    handleSizeChange(pageSize) { // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNum) { // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    },
    resetADD() {
      this.dataWarehouse = {
        id: '',
        name: '',
        address: '',
        email: '',
        telephone: ''
      }
    },
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataCustomer = data
    },
    handleADD() {
      this.resetADD()
      this.judger = 'add'
      this.addVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        addWarehouse(this.dataWarehouse).then(() => {
          this.addVisible = false
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
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updateWarehouse(this.dataWarehouse).then(() => {
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

      deleteWarehouse(row.id)
      this.handleDelete()
      this.fetchData()
    }

  }
}
</script>
