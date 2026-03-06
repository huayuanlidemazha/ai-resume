<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">风险提示</div>
      <span style="color: #909399">自动检测毕业时间与工作时间冲突等逻辑矛盾，并进行醒目提示</span>
    </div>
    <el-table :data="riskList" stripe>
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="issue" label="风险类型" width="200" />
      <el-table-column prop="detail" label="详情说明" />
      <el-table-column prop="level" label="风险等级" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.level === '高' ? 'danger' : 'warning'" size="small">
            {{ scope.row.level }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
const riskList = [
  {
    name: '王五',
    issue: '时间线矛盾',
    detail: '简历中填写 2020 年毕业，但工作经历显示 2018 年即开始全职工作，需重点核实。',
    level: '高'
  },
  {
    name: '赵六',
    issue: '项目经历重叠异常',
    detail: '同一时间段内存在三个全职岗位记录，可能存在虚假或夸大描述。',
    level: '中'
  }
];
</script>

