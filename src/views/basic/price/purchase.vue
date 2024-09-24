<template>
  <div class="app-container">
    <div style="margin-top: 15px;">
      <!--    搜索区域-->
      <div style="margin: 10px 0">
        <el-input v-model="search" placeholder="请输入id/名称" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleADD()">
        新增采购价格</el-button>
        <!-- 父传子 -->
        <son-price :isShow="addVisible" @addCaiGou="receiveCG"></son-price>

      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      stripe
    >

      <el-table-column
        width="160"
        prop="id"
        label="id"
      />
      <el-table-column
        prop="supplierName"
        label="供应商名称"
      />
      <el-table-column
        prop="goodsId"
        label="商品编号"
        width="100"
      />
      <el-table-column
        prop="name"
        label="商品名称"
        width="100"
      />
      <el-table-column
        prop="brand"
        label="品牌"
        width="100"
      />
      <el-table-column
        prop="type"
        label="类型"
        width="100"
      />
      <el-table-column
        prop="unit"
        label="单位"
        width="100"
      />
      <el-table-column
        prop="specifications"
        label="规格"
        width="100"
      />

        <el-table-column prop="goodsPrice" label="商品采购价" width="120">
        <template slot-scope="{row,$index}">
            <span v-if="!editOrNot[$index]">{{ row.goodsPrice }}</span>
            <el-input v-else v-model="row.goodsPrice " class="edit-input" size="small" />
           </template>
      </el-table-column>

      <el-table-column label="操作" width="240">
        <template slot-scope="{row,$index}">
           <el-button
            v-if="editOrNot[$index]"
            type="success"
            size="mini"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit($index,row.id,row.goodsId,row.goodsPrice,row.supplierName)"
          >

            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
           size="mini"
            icon="el-icon-edit"
            @click="handleEdit($index,row)"
          >
            Edit
          </el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="Delete(row,$index)">
            <template #reference>
              <el-button size="mini" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>

      </el-table-column>
    </el-table>
<!--
    // dataSupplier: [],
      // dataGoods: [],
      // addPurchasePriceData: {
      //   goodsId: '',
      //   goodsPrice: '',
      //   supplierName: ''

      // } -->

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
import { getList, deletePurchasePrice, updatePurchasePrice } from '@/api/purchase'
import { } from '@/api/purchase'
import SonPrice from '@/component/price-sonComponent.vue'

export default {
  components: {
    'son-price': SonPrice
  },
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
      dataPurchasePrice: {
        id: '',
        supplierName: '',
        goodsId: '',
        name: '',
        brand: '',
        type: '',
        unit: '',
        specifications: '',
        goodsPrice: ''
      },

      temp: {
        goodsId: '',
        goodsPrice: '',
        supplierName: ''
      },
      SpecialPrice: '',
      editOrNot: [] //显示编辑框
      // dataSupplier: [],
      // dataGoods: [],
      // addPurchasePriceData: {
      //   goodsId: '',
      //   goodsPrice: '',
      //   supplierName: ''

      // }

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
      // getListSupplier({
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize,
      //   search: this.search
      // }).then(response => {
      //   this.dataSupplier = response.data.records
      //   console.log(this.dataSupplier[0])
      //   this.total = response.data.total
      //   this.listLoading = false
      // }
      // )
      // console.log(this.dataSupplier[0] + 'sssssssssss')
      // getListGoods({
      //   pageNum: this.currentPage,
      //   pageSize: this.pageSize,
      //   search: this.search
      // }).then(response => {
      //   this.dataGoods = response.data.records
      //   console.log(this.dataSupplier)
      //   this.total = response.data.total
      //   this.listLoading = false
      // })
    },
    // //编辑数据
    // handleEdit(data) {
    //   this.judger = 'edit'
    //   this.addVisible = true
    //   this.dataPurchasePrice = data
    // },
    editData() {
      this.$refs['dataForm'].validate((valid) => {
        updatePurchasePrice(this.dataPurchasePrice).then(() => {
          this.addVisible = false
          this.$notify({
            title: 'Success',
            message: 'updateSuccessfully',
            type: 'success',
            duration: 2000
          })
          this.judger = ''
          this.fetchData()
        })
      })
    },

    handleSizeChange(pageSize) { // 改变当前每页的个数触发
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(pageNum) { // 改变当前页码触发
      this.currentPage = pageNum
      this.fetchData()
    },
    //新增
    resetADD() {
      this.dataPurchasePrice = {
        id: '',
        supplierName: '',
        goodsId: '',
        name: '',
        brand: '',
        type: '',
        unit: '',
        specifications: '',
        goodsPrice: ''
      }
    },
    handleADD() {
      this.resetADD()
      this.addVisible = true
      this.judger = 'add'
      this.$nextTick(() => {
        this.$refs['dataPurchasePrice'].clearValidate()
      })
    },
    handleEdit(index, row) {
      this.editOrNot[index] = true
      this.$set(this.editOrNot, row, true)
      //this.editOrNot = !this.editOrNot
    },

    confirmEdit(index, id, goodsId, goodsPrice, supplierName) {
      this.temp.id=id
      this.temp.goodsId = goodsId
      this.temp.goodsPrice = goodsPrice
      this.temp.supplierName = supplierName

      updatePurchasePrice(this.temp).then(() => {
        this.editOrNot[index] = false
        this.$message({
          message: '采购价更新成功',
          type: 'success'
        })
      })
      this.fetchData()
    },
    // //删除
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

      deletePurchasePrice(row.id)
      this.handleDelete()
      this.fetchData()
    },
    receiveCG() {
      this.addVisible = false
      this.fetchData()
    }

  }

}
</script>

