<template>
    <div class="app-container" style="background-color: #dcdcdc;">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item>
          <el-button size="small" type="primary" @click="createData()" style='position: absolute;right:80px;'>保存</el-button>
          <el-button size="small" @click="onCancel" style='position: absolute;right:10px;'>取消</el-button>
        </el-form-item>
        <br>
        <el-card :body-style="{ padding: '0px' }">
        <br>
        <h3 style="margin-left: 50px;">基本信息</h3>
        <el-form-item label="采购计划ID">
          <el-input v-model="form.id"  readonly/>
        </el-form-item>
        <el-form-item label="采购计划供应商">
          <el-input v-model="form.supplier" readonly/>
        </el-form-item>
        <el-form-item label="制定时间">
          <el-input v-model="form.date"  readonly/>
          <!-- <el-col :span="11">
            <el-date-picker v-model="form.date" type="datetime" placeholder="请选择一个日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-col> -->
        </el-form-item>
        <el-form-item label="制定者">
          <el-input v-model="form.maker"  readonly />
        </el-form-item>
        </el-card>
        <br>
    <el-card :body-style="{ padding: '0px' }">
      <h3 style="margin-left: 50px;">商品信息</h3>
      <div style="margin: 10px 0">
        <!-- <el-input v-model="search" placeholder="请输入商品id" style="width: 20%" clearable /> -->
        <!-- <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button> -->
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD">
        新增商品</el-button>
      </div>

        <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      stripe
    >
      <el-table-column
        width="100"
        prop="goodId"
        label="商品编号"
      />
      <el-table-column
        width="120"
        prop="name"
        label="商品名称"
      />
      <el-table-column
      width="80"
      prop="brand"
      label="商品品牌"
    />
    <el-table-column
      prop="type"
      label="纸种"
      width="80"
    />
    <el-table-column
      prop="level"
      label="商品级别"
      width="80"
    />
    <el-table-column
    width="120"
    prop="specifications"
    label="商品规格"
  />
  <el-table-column
    prop="gramWeight"
    label="商品克重"
    width="80"
  />
  <el-table-column
    prop="unit"
    label="商品单位"
    width="80"
  />
      <el-table-column
        width="110"
        prop="factoryPrice"
        label="出厂价"
      />
      <el-table-column
        prop="freight"
        label="运费"
        width="110"
      />
      <el-table-column
        prop="totalPrice"
        label="总价"
        width="110"
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
    </el-card>
    </el-form>
    <el-dialog :visible.sync="addVisible">
      <el-form ref="dataForm" :model="dataForm" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">
        <el-form-item label="商品编号"   prop="goodId">
          <el-input v-model="dataForm.goodId" />
        </el-form-item>

        <el-form-item label="出厂价" prop="factoryPrice">
          <el-input-number :controls="false" v-model="dataForm.factoryPrice"  :precision="2"/>
        </el-form-item>

        <el-form-item label="运费" prop="freight">
          <el-input-number :controls="false" v-model="dataForm.freight" :precision="2"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">
          取消
        </el-button>
        <el-button v-if="judger == 'add' " type="primary" @click="createGood()">
          确定
        </el-button>
        <el-button  v-else type="primary" @click="editData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <el-card :body-style="{ padding: '0px' }">
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
    </el-card>
    </div>
  </template>
  
  <script>
import { addPlan,getList} from '@/api/planmain'
import { addPlanText, getListTest,updatePlanText,deletePlanText } from '@/api/plantext'

  export default {
    data() {
      return {
        search: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        tableData: [],
        listLoading: false,
        addVisible: false,
        judger: '',  //判断是新增还是编辑
        form:{
          id: '',
          supplier:'',
          date:'',
          maker:'',
        },
        dataForm: {
          planId:'',
          goodId: '',
          name: '',
          brand: '',
          type: '',
          level: '',
          specifications: '',
          gramWeight: 0,
          unit: '',
          factoryPrice: 0,
          freight: 0,
          totalPrice:0
        }
      }
    },
    created() {
      this.form.id = this.$route.query.id  //接收参数
      this.getInfo()
      this.fetchData()
      },
    methods: {
      createData() {
      this.$refs['form'].validate((valid) => {
        addPlan(this.form).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    getInfo(){
      getList({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          search: this.form.id
        }).then(response => {
          console.log(response)
          this.form = response.data.records[0]
          this.total = response.data.total
        })
    },
    fetchData() {
      this.listLoading = true
      getListTest({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.form.id
      }).then(response => {
        console.log(response)
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    createGood() {
      this.$refs['dataForm'].validate((valid) => {
        this.dataForm.planId=this.form.id
        this.dataForm.totalPrice=this.dataForm.factoryPrice+this.dataForm.freight
        addPlanText(this.dataForm).then(() => {
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
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
        this.$router.push({name:'planmain_manage'})
      },
      handleSizeChange(pageSize) { // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNum) { // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    },
    handleADD() {
      this.resetADD()
      this.judger = 'add'
      this.addVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetADD() {
      this.dataForm = {
        goodId: '',
        factoryPrice:0,
        freight: 0,
      }
    },
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataForm = data
    },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updatePlanText(this.dataForm).then(() => {
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
    handleDelete(id) {
      this.fetchData() // 删除之后重新加载表格的数据
    },
    Delete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.tableData.splice(index, 1)
      deletePlanText(row)
      this.handleDelete()
      this.fetchData()
    }
    }
  }
  </script>
  
  <style scoped>
  .line{
    text-align: center;
  }
  </style>
  
  
 