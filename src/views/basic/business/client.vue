<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入id/名称" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD">
        新增客户</el-button>

      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :judge="judger"
      border
      stripe
    >
      <el-table-column
        width="160"
        prop="id"
        label="客户编号"
      />
      <el-table-column
        prop="name"
        label="客户名称"
      />
      <el-table-column
        prop="email"
        label="客户邮箱"
        width="100"
      />
      <el-table-column
        prop="address"
        label="客户地址"
        width="100"
      />
      <el-table-column
        prop="telephone"
        label="客户联系电话"
        width="100"
      />
      <el-table-column
        pro="type"
        label="客户类型"
        width="100"
      />

      <el-table-column label="操作" width="240">
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
      <el-form ref="dataForm" :model="dataCustomer" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="客户编号" prop="id">
          <el-input v-model="dataCustomer.id" />
        </el-form-item>

        <el-form-item label="客户名称" prop="name">
          <el-input v-model="dataCustomer.name" />
        </el-form-item>

        <el-form-item label="客户邮箱" prop="address">
          <el-input v-model="dataCustomer.address" />
        </el-form-item>

        <el-form-item label="客户地址" prop="email">
          <el-input v-model="dataCustomer.email" />
        </el-form-item>

        <el-form-item label="客户联系电话" prop="telephone">
          <el-input v-model="dataCustomer.telephone" />
        </el-form-item>
        <el-form-item label="客户类型" prop="type">
          <el-input v-model="dataCustomer.type" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button v-if="judger == 'add' " type="primary" @click="createData()">
          确定
        </el-button>

        <el-button  v-else type="primary" @click="editData()">
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
import { addCustomer, getList, deleteCustomer, updateCustomer } from '@/api/customer'

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
      judger: '',  //判断是新增还是编辑
      dataCustomer: {
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
      this.dataCustomer = {
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
        addCustomer(this.dataCustomer).then(() => {
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
        updateCustomer(this.dataCustomer).then(() => {
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

      deleteCustomer(row.id)
      this.handleDelete()
      this.fetchData()
    }

  }
}
</script>

