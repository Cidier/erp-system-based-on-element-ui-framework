<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入用户id" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD">新增用户</el-button>

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
        width="100"
        prop="id"
        label="用户ID"
      />
      <el-table-column
        prop="name"
        label="用户名称"
        width="150"
      />
      <el-table-column
        prop="department"
        label="用户部门"
        width="150"
      />
      <el-table-column
        prop="position"
        label="用户职务"
        width="150"
      />
      <el-table-column
        prop="password"
        label="用户密码"
        width="150"
      />
      <el-table-column
        prop="permission"
        label="用户权限"
        width="150"
      />

      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.id)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>

      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataUser" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="用户ID" prop="id">
          <el-input v-model="dataUser.id" />
        </el-form-item>

        <el-form-item label="用户名称" prop="name">
          <el-input v-model="dataUser.name" />
        </el-form-item>

        <el-form-item label="用户部门" prop="department">
          <el-input v-model="dataUser.department" />
        </el-form-item>

        <el-form-item label="用户职务" prop="position">
          <el-input v-model="dataUser.position" />
        </el-form-item>

        <el-form-item label="用户密码" prop="password">
          <el-input v-model="dataUser.password" />
        </el-form-item>

        <el-form-item label="用户权限" prop="permission">
          <el-input v-model="dataUser.permission" />
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
  </div></template>

<script>
import { addUser, getList, deleteUser, updateUser } from '@/api/user'

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
      dataUser: {
        id: undefined,
        name: '',
        department: '',
        position: '',
        password: '',
        permission: ''

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
      this.dataUser = {
        id: '',
        name: '',
        department: '',
        position: '',
        password: '',
        permission: ''
      }
    },
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataUser = data
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
        addUser(this.dataUser).then(() => {
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
        updateUser(this.dataUser).then(() => {
          this.addVisible = false
          this.$notify({
            title: 'Success',
            message: 'update Successfully',
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

      deleteUser(row.id)
      this.handleDelete()
      this.fetchData()
    }

  }
}
</script>
