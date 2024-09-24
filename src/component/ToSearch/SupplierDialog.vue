/* eslint-disable vue/require-prop-types */
<template>
  <el-dialog
    title="物料组件"
    :visible.sync="visible"
    :before-close="Cancel"
  >
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入id/名称" style="width: 20%" readonly />
      <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="tableData"
      border
      stripe
      highlight-current-row
      @current-change="handleCurrentChange"
    >
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
      <el-table-column
        prop="goodsPrice"
        label="商品采购价"
        width="100"
      />

    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel">取 消</el-button>
      <el-button type="primary" @click="Send">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getList } from '@/api/purchase'
export default {
  name: 'SupplierDialog',
  components: {},
  props: {
    showFlag: {
      type: Boolean,
      default: false
    },
    searchMes: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentRow: null,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      listLoading: true,
      visible: false,
      search: ''
    }
  },
  watch: {
    showFlag() {
      this.visible = this.showFlag
    },
    searchMes() {
      this.search = this.searchMes
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
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
    Cancel() {
      this.$emit('resetShow')
    },
    Send() {
      this.$emit('setMes', this.currentRow)
      this.currentRow = null
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentChange(val) {
      this.currentRow = val
    }
  }
}
</script>

