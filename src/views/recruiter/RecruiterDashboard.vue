<template>
  <!-- 最外层容器：继承项目全局布局的内边距，保持紧凑 -->
  <div style="width: 100%; padding: 20px; box-sizing: border-box;">
    
    <!-- 1. 全局检索模块 -->
    <el-card
      class="dashboard-card"
      :body-style="{ padding: '16px 20px 20px' }"
      style="margin-bottom: 20px; border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
    >
      <div class="page-header">
        <div class="page-title">全局检索</div>
        <span style="color: #909399">跨简历库和岗位库统一搜索，并支持高级筛选</span>
      </div>
      <el-form
        :inline="true"
        :model="searchForm"
        label-width="80px"
        style="margin-bottom: 16px"
      >
        <el-form-item label="关键词">
          <el-input
            v-model="searchForm.keyword"
            placeholder="姓名 / 职位 / 技能 / 关键字"
            clearable
          />
        </el-form-item>
        <el-form-item label="学历">
          <el-select
            v-model="searchForm.education"
            placeholder="不限"
            clearable
          >
            <el-option label="不限" value="" />
            <el-option label="本科" value="本科" />
            <el-option label="硕士" value="硕士" />
            <el-option label="博士" value="博士" />
          </el-select>
        </el-form-item>
        <el-form-item label="检索范围">
          <el-select
            v-model="searchForm.scope"
            placeholder="简历 + 岗位"
            clearable
          >
            <el-option label="简历" value="简历" />
            <el-option label="岗位" value="岗位" />
            <el-option label="简历 + 岗位" value="简历 + 岗位" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">检索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 10px;"
      >
        <el-table-column prop="type" label="类型" width="80" />
        <el-table-column prop="title" label="标题 / 姓名" />
        <el-table-column prop="position" label="职位 / 期望岗位" />
        <el-table-column prop="education" label="学历" width="80" />
        <el-table-column prop="keyword" label="命中关键字段" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
      </el-table>
    </el-card>

    <!-- 2. 当前招聘整体情况 + 待处理事项（并排布局） -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <!-- 左侧：招聘整体情况 -->
      <el-col :span="16">
        <el-card
          class="dashboard-card"
          :body-style="{ padding: '16px 20px 20px' }"
          style="border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <div class="card-header">
            <div class="card-title">当前招聘整体情况</div>
            <el-tag size="small" type="success">示例数据·后端接入后替换</el-tag>
          </div>
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-label">简历接收总数</div>
              <div class="stat-value">1,203</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">适配简历数</div>
              <div class="stat-value">546</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">淘汰简历数</div>
              <div class="stat-value">657</div>
            </div>
          </div>
          <el-table
            :data="jobStatsData"
            border      
      style="width: 100%; margin-top: 16px;"
          >
            <el-table-column prop="job" label="岗位" />
            <el-table-column prop="total" label="简历总数" />
            <el-table-column prop="match" label="适配简历" />
            <el-table-column prop="reject" label="淘汰简历" />
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧：待处理事项 -->
      <el-col :span="8">
        <el-card
          class="dashboard-card"
          :body-style="{ padding: '16px 20px 20px' }"
          style="border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <div class="card-header">
            <div class="card-title">待处理事项</div>
          </div>
          <el-timeline>
            <el-timeline-item
              timestamp="今日"
              type="primary"
              icon="el-icon-check"
            >
              有 12 份高匹配度简历待人工二次筛选
            </el-timeline-item>
            <el-timeline-item
              timestamp="近三日"
              type="warning"
              icon="el-icon-warning"
            >
              3 个岗位长时间未刷新招聘进度，建议查看
            </el-timeline-item>
            <el-timeline-item
              timestamp="本周"
              type="info"
              icon="el-icon-info"
            >
              生成周度招聘数据报表并导出给业务部门
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// 搜索表单数据（修复：属性加冒号）
const searchForm = ref({
  keyword: '',
  education: '不限',
  scope: '简历 + 岗位' // 修复：原代码缺少冒号，这里显式赋值
})

// 全局检索表格数据
const tableData = ref([
  {
    type: '简历',
    title: '张三',
    position: 'Java 开发工程师',
    education: '本科',
    keyword: '熟悉 Spring Boot、MySQL，参与智能匹配系统开发......',
    updateTime: '2026-03-01 10:20'
  },
  {
    type: '岗位',
    title: '智能匹配算法工程师',
    position: 'AI / NLP',
    education: '硕士',
    keyword: '负责简历与岗位智能匹配算法设计与实现......',
    updateTime: '2026-03-02 09:15'
  }
])

// 招聘整体情况表格数据
const jobStatsData = ref([
  { job: 'Java 开发工程师', total: 320, match: 140, reject: 180 },
  { job: '数据分析师', total: 210, match: 96, reject: 114 },
  { job: '产品经理', total: 180, match: 80, reject: 100 }
])

// 搜索方法
const handleSearch = () => {
  console.log('搜索条件：', searchForm.value)
  // 这里调用接口请求数据
}

// 重置方法
const handleReset = () => {
  searchForm.value = {
    keyword: '',
    education: '不限',
    scope: '简历 + 岗位'
  }
}
</script>

<style scoped>
/* 页面头部样式 */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.page-title {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

/* 卡片头部样式 */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

/* 统计行样式 */
.stats-row {
  display: flex;
  gap: 40px;
  margin-bottom: 16px;
}
.stat-item {
  display: flex;
  flex-direction: column;
}
.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 4px;
}
.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

/* 表格样式优化 */
.el-table {
  font-size: 14px;
}
.el-table th {
  background-color: #f5f7fa;
}

/* 时间线样式优化 */
.el-timeline-item__content {
  line-height: 1.6;
}
</style>