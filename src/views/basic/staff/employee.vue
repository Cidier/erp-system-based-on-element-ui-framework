<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入id/名字" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <el-button type="primary" style="margin-left: 5px" @click="handleAdd">新增</el-button>
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
        width="120"
        prop="id"
        label="ID"
        sortable
      />
      <el-table-column
        prop="name"
        label="名字"
      />
        <el-table-column
        width="140"
        prop="age"
        label="年龄"
      />
      <el-table-column
        width="140"
        prop="department"
        label="所属部门"
      />
        <el-table-column
        width="140"
        prop="description"
        label="类型"
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
    <!-- Form -->
    <el-dialog title="新增" :visible.sync="dialogVisible" style="width:50%;margin-left:400px">
      <el-form ref="dataForm" :model="dataEmployee">
        <el-form-item label="id" label-width="100px">
          <el-input v-model="dataEmployee.id" autocomplete="off " />
        </el-form-item>
        <el-form-item label="名字" label-width="100px">
          <el-input v-model="dataEmployee.name" autocomplete="off " />
        </el-form-item>
        <el-form-item label="年龄" label-width="100px">
          <el-input v-model="dataEmployee.age" autocomplete="off" />
        </el-form-item>
         <el-form-item label="所属部门" label-width="100px">
          <el-input v-model="dataEmployee.department" autocomplete="off" />
        </el-form-item>
         <el-form-item label="类型" label-width="100px">
          <el-input v-model="dataEmployee.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button v-if="judger == 'add'" type="primary" @click="createData()">确 定</el-button>
        <el-button  v-else type="primary" @click="editData()">确定</el-button>
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
import { getList,addEmployee,updateEmployee, deleteEmployee } from '@/api/employee'

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
      dialogVisible: false,
      judger: '',  //判断是新增还是编辑
      dataEmployee: {
        id: undefined,
       name:'',
       age:'',
       department:'',
       description:''
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
    resetAdd() {
      this.dataEmployee = {
       id:'',
       name:'',
       age:'',
       department:'',
       description:''
      }
    },
    handleEdit(data){
      this.judger = 'edit'
      this.dialogVisible = true
      this.dataEmployee = data
    },
    handleAdd() {
      this.resetAdd()
      this.judger = 'add'
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.fetchData();
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        addEmployee(this.dataEmployee).then(() => {
          this.dialogVisible = false
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
        updateEmployee(this.dataEmployee).then(() => {
          this.dialogVisible = false
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
     console.log(row.id)
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)

      deleteEmployee(row.id)
      this.handleDelete()
      this.fetchData()
    }
  }
}
</script>