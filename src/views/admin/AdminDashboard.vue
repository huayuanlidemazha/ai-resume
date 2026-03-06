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
          <div ref="userPieRef" style="height: 260px" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="page-header">
            <div class="page-title">岗位分布</div>
          </div>
          <div ref="jobBarRef" style="height: 260px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as echarts from 'echarts';

const userPieRef = ref(null);
const jobBarRef = ref(null);
let userPieChart;
let jobBarChart;

onMounted(() => {
  if (userPieRef.value) {
    userPieChart = echarts.init(userPieRef.value);
    userPieChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          name: '用户类型',
          type: 'pie',
          radius: '60%',
          data: [
            { value: 56, name: '招聘者' },
            { value: 174, name: '求职者' },
            { value: 3, name: '管理员' }
          ]
        }
      ]
    });
  }

  if (jobBarRef.value) {
    jobBarChart = echarts.init(jobBarRef.value);
    jobBarChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['技术部', '数据部', '产品部']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '岗位数量',
          type: 'bar',
          data: [20, 15, 13],
          itemStyle: { color: '#409EFF' }
        }
      ]
    });
  }
});

onBeforeUnmount(() => {
  if (userPieChart) userPieChart.dispose();
  if (jobBarChart) jobBarChart.dispose();
});
</script>

