<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">岗位检索</div>
      <span style="color: #909399">根据岗位名称、技能、工作经验等关键词搜索岗位信息</span>
    </div>
    <el-form :inline="true" :model="form" style="margin-bottom: 16px">
      <el-form-item label="关键词">
        <el-input v-model="form.keyword" clearable />
      </el-form-item>
      <el-form-item label="经验">
        <el-select v-model="form.experience" placeholder="不限" clearable style="width: 140px">
          <el-option label="1 年以内" value="<1" />
          <el-option label="1-3 年" value="1-3" />
          <el-option label="3-5 年" value="3-5" />
          <el-option label="5 年以上" value=">5" />
        </el-select>
      </el-form-item>
      <el-form-item label="排序">
        <el-select v-model="form.sort" style="width: 160px">
          <el-option label="按匹配度从高到低" value="matchDesc" />
          <el-option label="按发布时间从近到远" value="timeDesc" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="jobs" stripe>
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="company" label="公司" />
      <el-table-column prop="experience" label="经验要求" width="140" />
      <el-table-column prop="matchScore" label="匹配度" width="160">
        <template #default="scope">
          <el-tag v-if="scope.row.matchScore !== null" type="success">
            {{ scope.row.matchScore }}%
          </el-tag>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const form = reactive({
  keyword: '',
  experience: '',
  sort: 'matchDesc'
});

const jobs = ref([]);

const onSearch = () => {
  // TODO: 调用后端 /api/jobseeker/search，按匹配度等条件排序与筛选
  jobs.value = [
    {
      name: 'Java 开发工程师',
      company: '某互联网公司',
      experience: '3-5 年',
      matchScore: 86
    },
    {
      name: '后端开发工程师',
      company: '某科技企业',
      experience: '1-3 年',
      matchScore: 72
    }
  ];
};

onMounted(() => {
  if (route.query.q) {
    form.keyword = route.query.q;
    onSearch();
  }
});
</script>

