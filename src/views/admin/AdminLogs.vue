<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">用户操作记录</div>
    </div>
    <el-table :data="logs" border>
      <el-table-column prop="time" label="时间" width="180" />
      <el-table-column prop="username" label="用户" width="140" />
      <el-table-column prop="action" label="操作" />
    </el-table>
  </el-card>
</template>

<script setup>
const logs = [
  { time: '2026-03-01 10:20', username: 'hr001', action: '批量上传 50 份简历' },
  { time: '2026-03-01 11:05', username: 'admin', action: '新增岗位：数据分析师' }
];
</script>

