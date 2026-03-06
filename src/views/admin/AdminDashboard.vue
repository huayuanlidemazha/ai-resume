<template>
  <div style="padding: 20px">
    <el-row :gutter="20" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card>
          <el-statistic title="用户总数" :value="230" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="招聘者数量" :value="56" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="求职者数量" :value="174" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-statistic title="岗位数量" :value="48" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div class="page-header">
            <div class="page-title">用户构成</div>
          </div>
          <div style="display: flex; gap: 16px; align-items: center">
            <div class="pie" :style="{ background: pieBackground }" />
            <div style="flex: 1">
              <div class="legend">
                <span class="dot recruiter" /> 招聘者：{{ stats.recruiters }}
              </div>
              <div class="legend">
                <span class="dot jobseeker" /> 求职者：{{ stats.jobseekers }}
              </div>
              <div class="legend">
                <span class="dot admin" /> 管理员：{{ stats.admins }}
              </div>
              <el-divider style="margin: 12px 0" />
              <div style="color: #909399; font-size: 12px">
                图表为原型展示（纯前端渲染），后续接入后端接口后可替换为真实数据。
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="page-header">
            <div class="page-title">岗位分布</div>
          </div>
          <div style="height: 260px; display: flex; flex-direction: column; gap: 14px; justify-content: center">
            <div v-for="item in deptJobs" :key="item.name" class="bar-row">
              <div class="bar-label">{{ item.name }}</div>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: item.percent + '%' }" />
              </div>
              <div class="bar-value">{{ item.value }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const stats = {
  recruiters: 56,
  jobseekers: 174,
  admins: 3
};

const total = stats.recruiters + stats.jobseekers + stats.admins;

const pieBackground = computed(() => {
  const r = (stats.recruiters / total) * 100;
  const j = (stats.jobseekers / total) * 100;
  const a = (stats.admins / total) * 100;
  // 颜色与 legend dot 保持一致
  return `conic-gradient(#67C23A 0 ${r}%, #409EFF ${r}% ${r + j}%, #E6A23C ${r + j}% 100%)`;
});

const deptJobs = computed(() => {
  const raw = [
    { name: '技术部', value: 20 },
    { name: '数据部', value: 15 },
    { name: '产品部', value: 13 }
  ];
  const max = Math.max(...raw.map((x) => x.value), 1);
  return raw.map((x) => ({ ...x, percent: Math.round((x.value / max) * 100) }));
});
</script>

<style scoped>
.pie {
  width: 220px;
  height: 220px;
  border-radius: 999px;
  box-shadow: inset 0 0 0 10px rgba(255, 255, 255, 0.9);
  border: 1px solid #ebeef5;
}

.legend {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.8;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}
.dot.recruiter {
  background: #67C23A;
}
.dot.jobseeker {
  background: #409EFF;
}
.dot.admin {
  background: #E6A23C;
}

.bar-row {
  display: grid;
  grid-template-columns: 64px 1fr 36px;
  gap: 12px;
  align-items: center;
}
.bar-label {
  color: #606266;
  font-size: 13px;
}
.bar-track {
  height: 10px;
  background: #f2f6fc;
  border-radius: 999px;
  overflow: hidden;
}
.bar-fill {
  height: 10px;
  background: linear-gradient(90deg, #409EFF, #67C23A);
  border-radius: 999px;
}
.bar-value {
  text-align: right;
  color: #303133;
  font-weight: 600;
}
</style>

