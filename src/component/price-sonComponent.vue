<template>
  <div>
    <el-dialog :visible.sync="isShow">
    <el-form ref="dataForm" :model="dataPurchasePrice" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="供应商名称" prop="supplierName">
          <el-select v-model="dataPurchasePrice.supplierName" placeholder="请选择您要订购商品的供应商">
            <el-option
               v-for="item in dataSupplier"
             :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="getSupplierId(item.id, item.name)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商编号" prop="id">
          <el-input v-model="dataPurchasePrice.id" disabled />
        </el-form-item>

         <el-form-item label="商品名称" prop="name">
          <el-select v-model="dataPurchasePrice.name" placeholder="请选择您要订购的商品">
            <el-option
               v-for="item in dataGoods"
             :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="getGoodsId(item.id,item.type,item.brand,item.specifications,item.unit)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品编号" prop="goodsId">
          <el-input v-model="dataPurchasePrice.goodsId" disabled />
        </el-form-item>
        <!-- <el-form-item label="商品名称" prop="name">
          <el-input v-model="dataPurchasePrice.name" />
        </el-form-item> -->

        <el-form-item label="品牌" prop="brand">
          <el-input v-model="dataPurchasePrice.brand" disabled />
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="dataPurchasePrice.type" disabled />
        </el-form-item>

        <el-form-item label="单位" prop="unit">
          <el-input v-model="dataPurchasePrice.unit" disabled  />
        </el-form-item>

        <el-form-item label="规格" prop="specifications">
          <el-input v-model="dataPurchasePrice.specifications" disabled />
        </el-form-item>

        <el-form-item label="商品采购价" prop="goodsPrice">
          <el-input v-model="dataPurchasePrice.goodsPrice" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" cancel()">
          取消
        </el-button>

        <el-button type="primary" @click="createData()">
          确定
        </el-button>


      </div>
    </el-dialog>

  </div>
</template>
<script>

import { addPurchasePrice, updatePurchasePrice } from '@/api/purchase'
import { } from '@/api/purchase'
import { getList as getListSupplier } from '@/api/supplier'
import { getList as getListGoods } from '@/api/material'
export default {
  //子组件接收父组件的传值
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
 data() {
    return {

//      dialogVisible: false,
      search: '',
     currentPage: 1,
     pageSize: 10,
      //total: 0,
      //tableData: [],
      //listLoading: true,
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
      dataSupplier: [],
      dataGoods: [],
      addPurchasePriceData: {
        goodsId: '',
        goodsPrice: '',
        supplierName: ''

      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getListSupplier({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
      }).then(response => {
        this.dataSupplier = response.data.records
        console.log(this.dataSupplier[0])
        this.total = response.data.total
        this.listLoading = false
      }
      )
      console.log(this.dataSupplier[0] + 'sssssssssss')
      getListGoods({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
      }).then(response => {
        this.dataGoods = response.data.records
        console.log(this.dataSupplier)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    //编辑数据
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataPurchasePrice = data
    },
    editData() {
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
    },
    createData() {
      this.addPurchasePriceData.goodsId = this.dataPurchasePrice.goodsId
      this.addPurchasePriceData.goodsPrice = this.dataPurchasePrice.goodsPrice
      this.addPurchasePriceData.supplierName = this.dataPurchasePrice.supplierName

      console.log('kckckc')
      console.log(this.addPurchasePriceData.supplierName+'sssssss')
      console.log(this.addPurchasePriceData.goodsId)
      console.log(this.addPurchasePriceData.goodsPrice)

      addPurchasePrice(this.addPurchasePriceData).then(() => {
        this.isShow = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
       // this.fetchData()
        this.$emit("addCaiGou")
        this.resetADD()
        // cons
      })
    },
    //价格 供应商
    getSupplierId(d, n) {
      this.SuId = d
      this.dataPurchasePrice.supplierName = n
      this.dataPurchasePrice.id = this.SuId
    },
   // getGoodsId(item.id,item.type,item.brand,item.specifications,item.unit)
    getGoodsId(GoId, Gotype, Gobrand, Gospecifications, Gounit) {
      this.dataPurchasePrice.goodsId = GoId
      // console.log('kkkkk' + this.GoId)
      // getListGoods({
      //   search: this.GoId
      // }).then(response => {
      //   this.tempGood = response.data.records
      //  // console.log(this.tempGood)
      //   this.total = response.data.total
      //   this.listLoading = false
      // })
    //  console.log(this.tempGood)
      //console.log('aaaaaaaasaaaaa' + this.tempGood[0].brand)
      this.dataPurchasePrice.brand = Gobrand
      this.dataPurchasePrice.type = Gotype
      this.dataPurchasePrice.unit = Gounit
      this.dataPurchasePrice.specifications = Gospecifications
    },
    cancel() {
      this.$emit("addCaiGou")
    }
  }
}
</script>
