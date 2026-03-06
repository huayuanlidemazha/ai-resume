<template>
  <!-- 最外层容器：与招聘者端保持一致的间距和内边距 -->
  <div style="width: 100%; padding: 20px; box-sizing: border-box;">
    
    <!-- 1. 岗位检索模块 -->
    <el-card
      class="dashboard-card"
      :body-style="{ padding: '16px 20px 20px' }"
      style="margin-bottom: 20px; border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
    >
      <div class="page-header">
        <div class="page-title">岗位检索</div>
        <span style="color: #909399">仅支持查询岗位信息（求职者端不支持检索简历库）</span>
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
            placeholder="岗位名称 / 技能 / 公司"
            clearable
          />
        </el-form-item>
        <el-form-item label="经验">
          <el-select
            v-model="searchForm.experience"
            placeholder="不限"
            clearable
            style="width: 140px"
          >
            <el-option label="1 年以内" value="<1" />
            <el-option label="1-3 年" value="1-3" />
            <el-option label="3-5 年" value="3-5" />
            <el-option label="5 年以上" value=">5" />
          </el-select>
        </el-form-item>
        <el-form-item label="排序">
          <el-select
            v-model="searchForm.sort"
            style="width: 180px"
          >
            <el-option label="按匹配度从高到低" value="matchDesc" />
            <el-option label="按发布时间从近到远" value="timeDesc" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="jobResults"
        style="width: 100%; margin-top: 10px;"
        border
      >
        <el-table-column prop="name" label="岗位名称" />
        <el-table-column prop="company" label="公司" />
        <el-table-column prop="experience" label="经验要求" width="140" />
        <el-table-column prop="matchScore" label="匹配度" width="160">
          <template #default="scope">
            <el-progress :percentage="scope.row.matchScore" />
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="发布时间" width="160" />
      </el-table>
    </el-card>

    <!-- 2. 推荐岗位 + 我的简历（并排布局） -->
    <el-row :gutter="20" style="margin-bottom: 20px;">
      <!-- 左侧：推荐岗位 -->
      <el-col :span="16">
        <el-card
          class="dashboard-card"
          :body-style="{ padding: '16px 20px 20px' }"
          style="border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <div class="card-header">
            <div class="card-title">推荐岗位</div>
            <el-tag size="small" type="warning">匹配度由 AI 模型提供，当前为示例数据</el-tag>
          </div>
          <el-table
            :data="recommendedJobs"
            border
            style="width: 100%;"
          >
            <el-table-column prop="name" label="岗位名称" />
            <el-table-column prop="company" label="公司" />
            <el-table-column prop="matchScore" label="匹配度" width="160">
              <template #default="scope">
                <el-progress :percentage="scope.row.matchScore" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右侧：我的简历 -->
      <el-col :span="8">
        <el-card
          class="dashboard-card"
          :body-style="{ padding: '16px 20px 20px' }"
          style="border: none; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <div class="card-header">
            <div class="card-title">我的简历</div>
          </div>
          <p style="margin-bottom: 8px; color: #606266;">仅可查看与管理本人简历。</p>
          <p style="margin-bottom: 16px; color: #909399;">当前已上传 1 份简历（示例）。</p>
          <el-button
            type="primary"
            size="small"
            style="width: 100%;"
            @click="$router.push({ name: 'JobSeekerResume' })"
          >
            进入简历管理
          </el-button>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// 搜索表单数据
const searchForm = ref({
  keyword: '',
  experience: '',
  sort: 'matchDesc'
})

// 岗位检索结果
const jobResults = ref([])

// 推荐岗位数据
const recommendedJobs = ref([
  { name: 'Java 开发工程师', company: '某互联网公司', matchScore: 88 },
  { name: '后端开发工程师', company: '某科技企业', matchScore: 76 }
])

// 搜索方法
const onSearch = () => {
  // TODO: 接入后端 /api/jobseeker/search（仅岗位库），支持排序与筛选
  const mockJobs = [
    { name: 'Java 开发工程师', company: '某互联网公司', experience: '3-5 年', matchScore: 86, createdAt: '2026-03-02' },
    { name: '后端开发工程师', company: '某科技企业', experience: '1-3 年', matchScore: 72, createdAt: '2026-03-01' }
  ]
  jobResults.value = mockJobs
}

// 重置方法
const resetSearch = () => {
  searchForm.value = {
    keyword: '',
    experience: '',
    sort: 'matchDesc'
  }
  jobResults.value = []
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

/* 表格样式优化 */
.el-table {
  font-size: 14px;
}
.el-table th {
  background-color: #f5f7fa;
}
</style>