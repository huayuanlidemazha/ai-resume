<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">全局检索</div>
      <span style="color: #909399">支持跨简历库、岗位库的统一搜索及高级筛选</span>
    </div>
    <el-form :inline="true" :model="form" label-width="80px" style="margin-bottom: 16px">
      <el-form-item label="关键词">
        <el-input v-model="form.keyword" placeholder="姓名 / 职位 / 技能 / 关键字" clearable />
      </el-form-item>
      <el-form-item label="学历">
        <el-select v-model="form.education" placeholder="不限" clearable style="width: 140px">
          <el-option label="大专及以上" value="college" />
          <el-option label="本科及以上" value="bachelor" />
          <el-option label="研究生及以上" value="master" />
        </el-select>
      </el-form-item>
      <el-form-item label="检索范围">
        <el-select v-model="form.scope" style="width: 160px">
          <el-option label="简历 + 岗位" value="all" />
          <el-option label="仅简历库" value="resume" />
          <el-option label="仅岗位库" value="job" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">检索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="results" stripe>
      <el-table-column prop="type" label="类型" width="80">
        <template #default="scope">
          <el-tag :type="scope.row.type === 'resume' ? 'success' : 'info'" size="small">
            {{ scope.row.type === 'resume' ? '简历' : '岗位' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题 / 姓名" />
      <el-table-column prop="subtitle" label="职位 / 期望岗位" />
      <el-table-column prop="education" label="学历" width="100" />
      <el-table-column prop="highlight" label="命中关键字片段" />
      <el-table-column prop="createdAt" label="更新时间" width="160" />
    </el-table>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  keyword: '',
  education: '',
  scope: 'all'
});

const results = ref([]);

const mockData = [
  {
    type: 'resume',
    title: '张三',
    subtitle: 'Java 开发工程师',
    education: '本科',
    highlight: '熟悉 Spring Boot、MySQL，参与智能匹配系统开发……',
    createdAt: '2026-03-01 10:20'
  },
  {
    type: 'job',
    title: '智能匹配算法工程师',
    subtitle: 'AI / NLP',
    education: '硕士',
    highlight: '负责简历与岗位智能匹配算法设计与实现……',
    createdAt: '2026-03-02 09:15'
  }
];

const onSearch = () => {
  // TODO: 接入后端 /api/recruiter/search，实现全文检索 + 高级筛选
  results.value = mockData;
};

const reset = () => {
  form.keyword = '';
  form.education = '';
  form.scope = 'all';
  results.value = [];
};
</script>

