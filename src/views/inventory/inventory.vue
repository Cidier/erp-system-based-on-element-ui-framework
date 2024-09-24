<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入id/品牌" style="width: 20%" clearable />
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
        prop="goodId"
        label="商品编号"
        sortable
      />
      <el-table-column
        width="100"
        prop="shipId"
        label="仓库编号"
      />
       <el-table-column
        width="100"
        prop="shipName"
        label="仓位区域"
      />
      <el-table-column
        width="110"
        prop="name"
        label="名称"
      />
      <el-table-column
        width="100"
        prop="brand"
        label="品牌"
      />
      <el-table-column
        prop="type"
        label="纸种"
        width="100"
      />
      <el-table-column
        prop="level"
        label="级别"
        width="80"
      />
      <el-table-column
        prop="specifications"
        label="规格"
        width="100"
      />
      <el-table-column
        prop="gramWeight"
        label="克重"
        width="100"
      />
      <el-table-column
        width="80"
        prop="unit"
        label="计量单位"
      />
      <el-table-column
        prop="quantity"
        label="数量"
        width="80"
      />
      <el-table-column
        width="80"
        prop="safeNum"
        label="安全库存"
      />
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button type="primary" style="margin-left: 30px" size="mini"  @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->
    <el-dialog title="新增" :visible.sync="dialogVisible" style="width:50%;margin-left:400px">
      <el-form ref="dataForm" :model="dataInventory">
        <el-form-item label="商品编号" label-width="100px">
          <el-input v-model="dataInventory.goodId" autocomplete="off " />
        </el-form-item>
        <el-form-item label="仓库编号" label-width="100px">
          <el-input v-model="dataInventory.shipId" autocomplete="off " />
        </el-form-item>
        <el-form-item label="仓位区域" label-width="100px">
          <el-input v-model="dataInventory.shipName" autocomplete="off " />
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="dataInventory.quantity" autocomplete="off" />
        </el-form-item>
        <el-form-item label="安全库存" label-width="100px">
          <el-input v-model="dataInventory.safeNum" autocomplete="off" />
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
import { getList,addIventory,updateIventory } from '@/api/inventory'

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
      dataInventory: {
        goodId: undefined,
        shipId: undefined,
        shipName:'',
        quantity: '',
        safeNum: ''
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
      this.dataInventory = {
        goodId: '',
        shipId: '',
        shipName:'',
        quantity: '',
        safeNum: ''
      }
    },
    handleEdit(data){
      this.judger = 'edit'
      this.dialogVisible = true
      this.dataInventory = data
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
        addIventory(this.dataInventory).then(() => {
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
        updateIventory(this.dataInventory).then(() => {
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
    }
  }
}
</script>

