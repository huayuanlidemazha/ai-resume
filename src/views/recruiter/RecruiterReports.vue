<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">数据报表</div>
      <div>
        <el-button type="primary" size="small" @click="exportExcel">
          导出Excel模板
        </el-button>
      </div>
    </div>
    <el-table :data="reportData" border>
      <el-table-column prop="jobName" label="岗位" />
      <el-table-column prop="resumeTotal" label="接收简历总数" width="150" />
      <el-table-column prop="matched" label="适配简历数" width="130" />
      <el-table-column prop="eliminated" label="淘汰简历数" width="130" />
    </el-table>
  </el-card>
</template>

<script setup>
import { ElMessage } from 'element-plus';

const reportData = [
  { jobName: 'Java 开发工程师', resumeTotal: 320, matched: 140, eliminated: 180 },
  { jobName: '数据分析师', resumeTotal: 210, matched: 96, eliminated: 114 }
];

const exportExcel = () => {
  // TODO: 调用后端 /api/recruiter/reports/export，将姓名、性别、年龄、学历等字段导出为 Excel
  ElMessage.info('当前为前端占位操作，后端接入后将实际导出 Excel 文件');
};
</script>

