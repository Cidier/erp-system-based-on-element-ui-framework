<template>
    <div class="app-container">
      <div style="margin-top: 15px;">
        <!--    搜索区域-->
        <div style="margin: 10px 0">
          <el-input v-model="search" placeholder="请输入类型/买方名称" style="width: 20%" clearable />
          <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
          <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="planADD">
          新增采购计划</el-button> -->
          <!-- <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="porderADD">
          生成采购订单</el-button>
     -->
        </div>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :cell-class-name="addClass"
        @cell-click="listoutstocktext"
        border
        stripe
      >

        <el-table-column
          width="120"
          prop="id"
          label="出仓单ID"
        />
        <el-table-column
          prop="saleId"
          label="销售单号ID"
          width="120"
        />
        <el-table-column
        prop="buyer"
        label="买方名称"
        width="120"
      />
        <el-table-column
        prop="date"
        label="出仓日期"
        width="160"
        sortable
        />
        <el-table-column
        width="80"
        prop="sumQuantity"
        label="出仓数量"
        />
        <el-table-column
        width="80"
        prop="curPrice"
        label="分切费"
        />
        <el-table-column
        width="100"
        prop="sumPrice"
        label="总价"
        />
      <el-table-column
        prop="freight"
        label="运费"
        width="80"
      />
      <el-table-column
        prop="statue"
        label="审核状态"
        width="100"
      />
      <el-table-column
        prop="outTime"
        label="出仓日期"
        width="100"
      />
      <el-table-column
        prop="signTime"
        label="签收时间"
        width="100"
      />
      <el-table-column
      prop="type"
      label="出仓类型"
      width="100"
    />
    <el-table-column label="审核操作" width="150">
      <template slot-scope="scope">
        <el-button v-if="scope.row.statue === '未审核'" type="text" @click="Check(scope.row)">审核</el-button>
      </template>
    </el-table-column>
        <!-- <el-table-column label="操作" width="200">
          <template slot-scope="{row,$index}">
            <el-button size="mini" @click="handleEdit(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="审核" width="220">
          <template slot-scope="{row,$index}">
            <el-button type="primary" @click="porderADD(row,$index)">生成采购订单</el-button>
          </template>
        </el-table-column> -->
      </el-table>
  
      <!-- <el-dialog :visible.sync="addVisible">
        <el-form ref="dataForm" :model="dataPlan" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
          <el-form-item label="采购计划ID" prop="id">
            <el-input v-model="dataPlan.id" readonly />
          </el-form-item>
  
          <el-form-item label="供应商名称" prop="supplier">
            <el-input v-model="dataPlan.supplier" readonly />
          </el-form-item>
  
          <el-form-item label="制定时间" prop="date">
            <el-input v-model="dataPlan.date" />
          </el-form-item>
  
          <el-form-item label="制定者" prop="maker">
            <el-input v-model="dataPlan.maker" readonly/>
          </el-form-item>
  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">
            取消
          </el-button>
          <el-button  type="primary" @click="editData()">
            确定
          </el-button>
  
        </div>
      </el-dialog> -->
  
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
  import { getList,SetCheck } from '@/api/outstock'
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
        // dialogVisible: false,
        search: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        listLoading: true
        // addVisible: false,
        // dataPlan: {
        //   id: '',
        //   supplier: '',
        //   date: '',
        //   maker: '',
        
        // }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      addClass({row,column,rowIndex,columnIndex}){
              if(columnIndex === 0){
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
    //   planADD() {
    //     this.$router.replace({name:'planmainadd_manage'})
    //   },
    //   porderADD(row,index) {
    //     this.$notify({
    //       title: 'Success',
    //       message: 'Add to POrder Successfully',
    //       type: 'success',
    //       duration: 2000
    //     })
    //     this.tableData.splice(index, 1)

    //     addPOrderByPlan(row.id)
    //     this.fetchData()
    //     this.$router.push({name:'porder_manage'})
    //   },
    listoutstocktext(row,column,event,cell){
        if(column.label=="出仓单ID"){
            this.$router.push({name:'outstocktext',query:{id:row.id}})
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
      Check(row){
        SetCheck(row.id).then(response => {
        this.$notify({
          title: 'Success',
          message: '审核成功！',
          type: 'success',
          duration: 2000
        })
        this.fetchData()
      })
      }
    //   handleEdit(data) {
    //     this.addVisible = true
    //     this.dataPlan = data
    //   },
    //   editData() {
    //     this.$refs['dataForm'].validate((valid) => {
    //       updatePlan(this.dataPlan).then(() => {
    //         this.addVisible = false
    //         this.$notify({
    //           title: 'Success',
    //           message: 'updateSuccessfully',
    //           type: 'success',
    //           duration: 2000
    //         })
    //         this.fetchData()
    //       })
    //     })
    //   },
    //   Delete(row, index) {
    //     this.$notify({
    //       title: 'Success',
    //       message: 'Delete Successfully',
    //       type: 'success',
    //       duration: 2000
    //     })
    //     this.tableData.splice(index, 1)

    //     deletePlan(row.id)
    //     this.handleDelete()
    //     this.fetchData()
    //   },
    //   handleDelete(id) {
    //     this.fetchData() // 删除之后重新加载表格的数据
    //   }
  
    }
  }
  </script>
  <style>
    .cell-blue{
        color: blue!important;
        cursor: pointer;
    }
</style>
  