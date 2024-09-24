<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入id/品牌" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      stripe
    >
      <el-table-column
        width="120"
        prop="id"
        label="物料ID"
        sortable
      />
      <el-table-column
        width="180"
        prop="name"
        label="物料名称"
      />
      <el-table-column
        width="160"
        prop="brand"
        label="品牌"
      />
      <el-table-column
        prop="specifications"
        label="规格"
        width="120"
      />
      <el-table-column
        prop="unit"
        label="计量单位"
        width="130"
      />

       <el-table-column prop="ordinaryPrice" label="基础价格" width="120">
        <template slot-scope="{row,$index}">
            <span v-if="!editOrNot[$index]">{{ row.ordinaryPrice }}</span>
            <el-input v-else v-model="row.ordinaryPrice " class="edit-input" size="small" />
           </template>
      </el-table-column>

        <el-table-column prop="vipPrice" label="vip价格" width="120">
        <template slot-scope="{row,$index}">
            <span v-if="!editOrNot[$index]">{{ row.vipPrice }}</span>
            <el-input v-else v-model="row.vipPrice " class="edit-input" size="small" />
           </template>
      </el-table-column>

    <el-table-column align="center" label="Actions" width="120" >
        <template slot-scope="{row,$index}">
          <el-button
            v-if="editOrNot[$index]"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row,$index)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit($index,row)"
          >
            Edit
          </el-button>
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
import { getList, updatePrice } from '@/api/price'

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
      editOrNot: [] //显示编辑框
    }
  },
  created() {
    this.fetchData()
    for (var i = 0; i < 100; i++) {
      this.editOrNot[i] = false
      this.$set(this.editOrNot[i], false)
}
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
    handleEdit(index, row) {
      this.editOrNot[index] = true
      this.$set(this.editOrNot, row, true)
      //this.editOrNot = !this.editOrNot
    },
    confirmEdit(data, index) {
      updatePrice(data).then(() => {
        this.editOrNot = false
        //this.editOrNot[index] = false
        this.$message({
          message: 'The ordinaryPrice has been edited',
          type: 'success'
        })
      })

      this.fetchData()
    }
  }
}
</script>

