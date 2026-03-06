<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">智能匹配</div>
      <el-tag type="warning">当前为前端占位页面，AI 匹配能力后续接入</el-tag>
    </div>

    <el-alert
      title="这里将展示：根据你的简历智能匹配的岗位列表、匹配度与推荐理由。"
      type="info"
      show-icon
      :closable="false"
      style="margin-bottom: 16px"
    />

    <el-table :data="matchedJobs" stripe>
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="company" label="公司" />
      <el-table-column prop="matchScore" label="匹配度" width="160">
        <template #default="scope">
          <el-progress :percentage="scope.row.matchScore" />
        </template>
      </el-table-column>
      <el-table-column prop="reason" label="推荐理由" />
    </el-table>
  </el-card>
</template>

<script setup>
// TODO: 后续接入后端 + 大模型：/api/jobseeker/matching
const matchedJobs = [
  { name: 'Java 开发工程师', company: '某互联网公司', matchScore: 90, reason: 'Java/Spring Boot 技能匹配度高，项目经历贴合' },
  { name: '后端开发工程师', company: '某科技企业', matchScore: 78, reason: '具备分布式与数据库优化经验，符合岗位要求' }
];
</script>

