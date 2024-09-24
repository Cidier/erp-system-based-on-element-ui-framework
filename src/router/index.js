import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 系统管理
  {
    path: '/system',
    component: Layout,
    name: 'System',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user_manage',
        name: 'User_manage',
        component: () => import('@/views/system/user_manage'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/system/log'),
        meta: { title: '系统操作日志', icon: 'tree' }
      }
    ]
  },
  //  基本资料管理
  {
    path: '/basic',
    component: Layout,
    name: 'Basic',
    meta: {
      title: '基本资料管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'meterial',
        component: () => import('@/views/basic/material'),
        name: 'Metarial',
        meta: { title: '物料管理' }
      },
      {
        path: 'warehouse',
        component: () => import('@/views/basic/warehouse'),
        name: 'Warehouse',
        meta: { title: '仓库管理' }
      },
      {
        path: '/staff',
        name: 'Staff',
        component: () => import('@/views/second'),
        meta: { title: '员工管理' },
        children: [
          {
            path: 'department',
            component: () => import('@/views/basic/staff/department'),
            name: 'Department',
            meta: { title: '部门' }
          },
          {
            path: 'employee',
            component: () => import('@/views/basic/staff/employee'),
            name: 'Employee',
            meta: { title: '雇员' }
          }
        ]
      },
      {
        path: 'business',
        name: 'Business',
        component: () => import('@/views/second'),
        meta: { title: '业务公司管理' },
        children: [
          {
            path: 'supplier',
            component: () => import('@/views/basic/business/supplier'),
            name: 'Supplier',
            meta: { title: '供应商' }
          },
          {
            path: 'client',
            component: () => import('@/views/basic/business/client'),
            name: 'Client',
            meta: { title: '客户' }
          }
        ]
      },
      {
        path: 'price',
        name: 'price',
        meta: { title: '价格管理' },
        component: () => import('@/views/second'),
        children: [
          {
            path: 'basic',
            component: () => import('@/views/basic/price/basic'),
            name: 'Basic_price',
            meta: { title: '商品基础价格' }
          },
          {
            path: 'purchase_price',
            component: () => import('@/views/basic/price/purchase'),
            name: 'PurchasePrice',
            meta: { title: '采购价' }
          },
          {
            path: 'special_offer',
            component: () => import('@/views/basic/price/special_offer'),
            name: 'Special_offer',
            meta: { title: '特价' }
          }
        ]
      }
    ]
  },
  // 采购管理
  {
    path: '/purchase',
    component: Layout,
    name: 'Purchase',
    meta: { title: '采购管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'planmain_manage',
        name: 'planmain_manage',
        component: () => import('@/views/purchase/planmain_manage'),
        meta: { title: '采购计划管理', icon: 'table' }
      },
      {
        path: 'planmainadd_manage',
        name: 'planmainadd_manage',
        component: () => import('@/views/purchase/planmainadd_manage'),
        meta: { title: '采购计划新增', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'plantext_manage',
        name: 'plantext_manage',
        component: () => import('@/views/purchase/plantext_manage'),
        meta: { title: '采购计划详单查询', icon: 'table' }
      },
      {
        path: 'porder_manage',
        name: 'porder_manage',
        component: () => import('@/views/purchase/porder_manage'),
        meta: { title: '采购订单管理', icon: 'tree' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'pordertext_manage',
        name: 'pordertext_manage',
        component: () => import('@/views/purchase/pordertext_manage'),
        meta: { title: '采购订单详单查询', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'inchecktext',
        name: 'inchecktext',
        component: () => import('@/views/purchase/inchecktext'),
        meta: { title: '进仓验货单详单查询', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'check',
        name: 'check',
        component: () => import('@/views/purchase/check'),
        meta: { title: '客诉单', icon: 'table' }
      },
      {
        path: 'tocheckmain',
        name: 'Tocheckmain',
        component: () => import('@/views/purchase/incheck'),
        meta: { title: '采购进仓验货单列表', icon: 'tree' }
      }
    ]
  },
  // 销售管理
  {
    path: '/sell',
    component: Layout,
    name: 'Sell',
    meta: { title: '销售管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'sellmain_manage',
        name: 'sellmain_manage',
        component: () => import('@/views/sell/sellmain_manage'),
        meta: { title: '销售订单管理', icon: 'tree' }
      },
      {
        path: 'selladd_manage',
        name: 'selladd_manage',
        component: () => import('@/views/sell/selladd_manage'),
        meta: { title: '销售订单新增', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'selltext_manage',
        name: 'selltext_manage',
        component: () => import('@/views/sell/selltext_manage'),
        meta: { title: '销售订单详单查询', icon: 'table' }
      },
      {
        path: 'produce',
        name: 'Produce',
        component: () => import('@/views/sell/produce'),
        meta: { title: '分切出仓单查询', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'producetext',
        name: 'producetext',
        component: () => import('@/views/sell/producetext'),
        meta: { title: '分切出仓单详单查询', icon: 'table' }
      }
    ]
  },
  // 库存管理
  {
    path: '/inventory',
    component: Layout,
    name: 'Inventory',
    meta: { title: '库存管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/inventory/inventory'),
        meta: { title: '基本库存管理', icon: 'table' }
      },
      {
        path: 'dan',
        name: 'Dan',
        component: () => import('@/views/inventory/dan_inventory'),
        meta: { title: '危险库存报表', icon: 'tree' }
      },
      {
        path: 'tostock',
        name: 'Tostock',
        component: () => import('@/views/inventory/tostock'),
        meta: { title: '进仓单', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'tostocktext',
        name: 'tostocktext',
        component: () => import('@/views/inventory/tostocktext'),
        meta: { title: '进仓单详单', icon: 'tree' }
      },
      {
        path: 'outstock',
        name: 'Outstock',
        component: () => import('@/views/inventory/outstock'),
        meta: { title: '出仓单', icon: 'table' }
      },
      {
        hidden: true, // 不在侧边栏显示
        path: 'outstocktext',
        name: 'outstocktext',
        component: () => import('@/views/inventory/outstocktext'),
        meta: { title: '出仓单详单', icon: 'tree' }
      },
      {
        path: 'report',
        name: 'Report',
        component: () => import('@/views/inventory/inoutreport'),
        meta: { title: '库存进出报表', icon: 'tree' }
      }
    ]
  },
  // 财务管理
  {
    path: '/finance',
    component: Layout,
    name: 'Finance',
    meta: { title: '财务管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'report',
        name: 'report',
        component: () => import('@/views/finance/report'),
        meta: { title: '查看财务报表', icon: 'tree' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
