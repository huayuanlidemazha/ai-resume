<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">AI 智能匹配</div>
      <el-tag type="warning">当前为前端占位页面，AI 能力后续接入</el-tag>
    </div>
    <el-row :gutter="16" style="margin-bottom: 16px">
      <el-col :span="8">
        <el-select v-model="selectedJob" placeholder="选择岗位">
          <el-option
            v-for="job in jobOptions"
            :key="job.id"
            :label="job.name"
            :value="job.id"
          />
        </el-select>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :disabled="!selectedJob" @click="runMatching">
          执行智能匹配
        </el-button>
      </el-col>
    </el-row>
    <el-table :data="matchedResumes" stripe>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="position" label="当前/最近职位" />
      <el-table-column prop="score" label="匹配度" width="120">
        <template #default="scope">
          <el-progress
            :percentage="scope.row.score"
            :status="scope.row.score > 80 ? 'success' : scope.row.score < 50 ? 'exception' : ''"
          />
        </template>
      </el-table-column>
      <el-table-column prop="highlights" label="匹配要点" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const selectedJob = ref('');

const jobOptions = [
  { id: '1', name: 'Java 开发工程师' },
  { id: '2', name: '数据分析师' }
];

const matchedResumes = ref([]);

const runMatching = () => {
  if (!selectedJob.value) return;
  // TODO: 将来调用后端 /api/recruiter/matching/{jobId}，由 AI 模型完成简历与岗位匹配
  ElMessage.info('已模拟执行匹配，后续会接入真实 AI 能力');
  matchedResumes.value = [
    {
      name: '张三',
      position: 'Java 开发工程师',
      score: 92,
      highlights: 'Java / Spring Boot / MySQL，5 年互联网后台经验'
    },
    {
      name: '李四',
      position: '后端开发工程师',
      score: 78,
      highlights: '熟悉分布式架构与消息队列，有金融行业项目经验'
    }
  ];
};
</script>

