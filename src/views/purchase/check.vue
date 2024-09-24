<template>
  <div class="app-container" style="background-color: #dcdcdc;">
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item>
        <el-button size="small" style="position: absolute;right:10px;" @click="onCancel">取消</el-button>
      </el-form-item>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <br>
        <h3 style="margin-left: 50px;">基本信息</h3>
        <el-col :span="10">
          <el-form-item label="进仓单号" :span="8">
            <el-input v-model="form.id" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="采购订单号" :span="8">
            <el-input v-model="form.poId" readonly />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="订单日期">
            <el-input v-model="form.date" readonly />
          <!-- <el-col :span="11">
            <el-date-picker v-model="form.date" type="datetime" placeholder="请选择一个日期" style="width: 100%;" value-format="yyyy-MM-dd HH:mm:ss" />
          </el-col> -->
          </el-form-item>
        </el-col>
      </el-card>
      <br>
      <el-card :body-style="{ padding: '0px' }">
        <h3 style="margin-left: 50px;">抽检具体信息</h3>
        <div style="margin: 10px 0">
        <!-- <el-input v-model="search" placeholder="请输入商品id" style="width: 20%" clearable />
        <el-button type="primary" style="margin-left: 5px" @click="fetchData">查询</el-button> -->
        </div>

        <el-table
          v-loading="listLoading"
          :data="tableData"
          border
          stripe
        >
          <el-table-column
            width="100"
            prop="caseNo"
            label="件号"
          />
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
            width="80"
            prop="quantity"
            label="数量"
          />
          <el-table-column
            prop="aquantity"
            label="每件数量"
            width="50"
          />
          <el-table-column
            prop="shippingName"
            label="仓库位置"
            width="50"
          />
          <el-table-column
            prop="sumLost"
            label="损失重量/kg"
            width="80"
          />

          <el-table-column label="操作" width="240">
            <template slot-scope="{row,$index}">
              <el-button type="text" size="mini" @click="handleEdit(row)">填写客诉</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-form>

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

    <!-- 查看客诉 -->
    <el-dialog title="查看问题" :visible.sync="showone" width="350">
      <el-button type="primary" style="margin-left: 5px" @click="toAdd">新增</el-button>
      <el-table
        v-loading="loadtwo"
        :data="problems"
        border
        stripe
      >
        <el-table-column
          prop="problem"
          label="问题"
          sortable
        />
        <el-table-column
          prop="lostWeight"
          label="损失重量"
        />
        <el-table-column label="操作">
          <template slot-scope="{row,$index}">
            <el-button size="mini" @click="toUpdate(row)">编辑</el-button>
            <el-popconfirm title="确定删除吗？" @onConfirm="toDelete(row)">
              <template #reference>
                <el-button size="mini" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showAgain()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 填写客诉 -->
    <el-dialog title="新增" :visible.sync="showtwo" style="width:50%;margin-left:400px">
      <el-form ref="tocheck" :model="tocheck">
        <el-form-item label="问题" label-width="100px">
          <el-select
            v-model="tocheck.problem"
            placeholder="输入问题"
            clearable
            filterable
            allow-create
            style="width: 100%"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="损失重量" label-width="100px">
          <el-input-number v-model="tocheck.lostWeight" :controls="false" class="factoryPrice" :precision="2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="toCancel()">取 消</el-button>
        <el-button v-if="judger == 'add'" type="primary" @click="createData()">确 定</el-button>
        <el-button v-else type="primary" @click="realUpdate()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getById } from '@/api/incheck'
import { getListTest, getProblem, deleteById, updateProblem, createProblem } from '@/api/inchecktext'

export default {
  data() {
    return {
      search: '',
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      caseno: '',
      problems: [],
      listLoading: false,
      addVisible: false,
      loadtwo: false,
      judger: '',
      form: {
      },
      tocheck: {},
      showone: false,
      showtwo: false,
      options: [{
        value: '筒芯重量',
        label: '筒芯重量'
      }, {
        value: '克重',
        label: '克重'
      }, {
        value: '短重',
        label: '短重'
      }, {
        value: '幅宽',
        label: '幅宽'
      }, {
        value: '水分',
        label: '水分'
      },
      {
        value: '外包装损耗',
        label: '外包装损耗'
      },
      {
        value: '纸张破损',
        label: '纸张破损'
      }]
    }
  },
  created() {
    this.form.id = this.$route.query.id // 接收参数
    this.getInfo()
    this.fetchData()
  },
  methods: {
    getInfo() {
      getById(
        this.form.id
      ).then(response => {
        this.form = response.data
      })
    },
    fetchData() {
      this.listLoading = true
      getListTest({
        id: this.form.id,
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        search: '抽检'
      }).then(response => {
        this.tableData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
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
    // 点击显示件号对应问题
    handleEdit(data) {
      this.caseno = data.caseNo
      this.getProblems()
      this.showone = true
    },
    // 获取问题列表
    getProblems() {
      getProblem({
        case_no: this.caseno
      }).then(response => {
        this.problems = response.data
      })
    },
    // 点击新增
    toAdd() {
      this.judger = 'add'
      this.showtwo = true
    },
    // 点击编辑
    toUpdate(data) {
      this.judger = 'edit'
      this.tocheck = data
      this.showtwo = true
    },
    // 正式编辑
    realUpdate() {
      updateProblem(this.tocheck).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.getProblems()
        this.tocheck = {}
        this.showtwo = false
      })
    },
    // 删除
    toDelete(row) {
      deleteById(row.id).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.getProblems()
      })
    },
    // 新增问题
    createData() {
      createProblem({
        caseNo: this.caseno,
        toId: this.form.id,
        problem: this.tocheck.problem,
        lostWeight: this.tocheck.lostWeight
      }).then(response => {
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.getProblems()
        this.tocheck = {}
        this.showtwo = false
      })
    },
    // 取消新增
    toCancel() {
      this.tocheck = {}
      this.showtwo = false
    },
    // 重新加载数据
    showAgain() {
      this.problems = {}
      this.fetchData()
      this.showone = false
    }
  }
}
</script>

  <style scoped>
  .line{
    text-align: center;
  }
  </style>

