<template>
  <div>
    <el-dialog :visible.sync="isShow">
    <el-form ref="dataForm" :model="dataSpecialPrice" label-position="left" label-width="120px" style="width: 400px; margin-left:50px;">

        <el-form-item label="顾客名称" prop="customerName">
          <el-select v-model="dataSpecialPrice.customerName" placeholder="请选择您要订购商品的供应商">
            <el-option
               v-for="item in dataCustomer"
             :key="item.id"
            :label="item.name"
            :value="item.id"
            @click.native="getCustomerId(item.id, item.name)"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商编号" prop="id">
          <el-input v-model="dataSpecialPrice.id" disabled />
        </el-form-item>

         <el-form-item label="商品名称" prop="name">
          <el-select v-model="dataSpecialPrice.name" placeholder="请选择您要订购的商品">
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
          <el-input v-model="dataSpecialPrice.goodsId" disabled />
        </el-form-item>
        <!-- <el-form-item label="商品名称" prop="name">
          <el-input v-model="dataSpecialPrice.name" />
        </el-form-item> -->

        <el-form-item label="品牌" prop="brand">
          <el-input v-model="dataSpecialPrice.brand" disabled />
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="dataSpecialPrice.type" disabled />
        </el-form-item>

        <el-form-item label="单位" prop="unit">
          <el-input v-model="dataSpecialPrice.unit" disabled  />
        </el-form-item>

        <el-form-item label="规格" prop="specifications">
          <el-input v-model="dataSpecialPrice.specifications" disabled />
        </el-form-item>

        <el-form-item label="商品采购价" prop="goodsPrice">
          <el-input v-model="dataSpecialPrice.goodsPrice" />
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

import { addSpecialPrice, updateSpecialPrice } from '@/api/specialPrice'
import { getList as getListCustomer } from '@/api/customer'
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
      dataSpecialPrice: {
        id: '',
        customerName: '',
        goodsId: '',
        name: '',
        brand: '',
        type: '',
        unit: '',
        specifications: '',
        goodsPrice: ''
      },
      dataCustomer: [],
      dataGoods: [],
      addSpecialPriceData: {
        goodsId: '',
        goodsPrice: '',
        customerName: ''

      }

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getListCustomer({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
      }).then(response => {
        this.dataCustomer = response.data.records
        console.log(this.dataCustomer[0])
        this.total = response.data.total
        this.listLoading = false
      }
      )
      console.log(this.dataCustomer[0] + 'sssssssssss')
      getListGoods({
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: this.search
      }).then(response => {
        this.dataGoods = response.data.records
        console.log(this.dataCustomer)
        this.total = response.data.total
        this.listLoading = false
      })
    },
    //编辑数据
    handleEdit(data) {
      this.judger = 'edit'
      this.addVisible = true
      this.dataSpecialPrice = data
    },
    editData() {
      updateSpecialPrice(this.dataSpecialPrice).then(() => {
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
      this.dataSpecialPrice = {
        id: '',
        customerName: '',
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
      this.addSpecialPriceData.goodsId = this.dataSpecialPrice.goodsId
      this.addSpecialPriceData.goodsPrice = this.dataSpecialPrice.goodsPrice
      this.addSpecialPriceData.customerName = this.dataSpecialPrice.customerName

      console.log('kckckc')
      console.log(this.addSpecialPriceData.customerName+'sssssss')
      console.log(this.addSpecialPriceData.goodsId)
      console.log(this.addSpecialPriceData.goodsPrice)

      addSpecialPrice(this.addSpecialPriceData).then(() => {
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
    getCustomerId(d, n) {
      this.SuId = d
      this.dataSpecialPrice.customerName = n
      this.dataSpecialPrice.id = this.SuId
    },
   // getGoodsId(item.id,item.type,item.brand,item.specifications,item.unit)
    getGoodsId(GoId, Gotype, Gobrand, Gospecifications, Gounit) {
      this.dataSpecialPrice.goodsId = GoId
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
      this.dataSpecialPrice.brand = Gobrand
      this.dataSpecialPrice.type = Gotype
      this.dataSpecialPrice.unit = Gounit
      this.dataSpecialPrice.specifications = Gospecifications
    },
    cancel() {
      this.$emit("addCaiGou")
    }
  }
}
</script>



