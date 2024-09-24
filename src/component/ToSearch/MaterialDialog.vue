/* eslint-disable vue/require-prop-types */
<template>
  <el-dialog
    title="物料组件"
    :visible.sync="visible"
    :before-close="Cancel"
  >
    <!--    搜索区域-->
    <div style="margin: 10px 0">
      <el-input v-model="search" placeholder="请输入id/名称" style="width: 20%" clearable />
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
        width="120"
        prop="id"
        label="ID"
        sortable
      />
      <el-table-column
        width="180"
        prop="name"
        label="名称"
      />
      <el-table-column
        width="160"
        prop="brand"
        label="品牌"
      />
      <el-table-column
        prop="type"
        label="纸种"
        width="120"
      />
      <el-table-column
        prop="level"
        label="级别"
        width="130"
      />
      <el-table-column
        prop="specifications"
        label="规格"
        width="120"
      />
      <el-table-column
        prop="gramWeight"
        label="克重"
        width="120"
      />
      <el-table-column
        width="120"
        prop="unit"
        label="计量单位"
      />
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="Cancel">取 消</el-button>
      <el-button type="primary" @click="Send">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getList } from '@/api/material'
export default {
  name: 'MaterialDialog',
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

