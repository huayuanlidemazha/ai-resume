<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">岗位管理</div>
      <div style="display: flex; gap: 8px">
        <el-input
          v-model="keyword"
          placeholder="搜索岗位名称 / 部门"
          size="small"
          style="width: 260px"
          clearable
        >
          <template #append>
            <el-button @click="onSearch" size="small">检索</el-button>
          </template>
        </el-input>
        <el-button type="primary" size="small">新增岗位</el-button>
      </div>
    </div>
    <el-table :data="filteredJobs" border>
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="department" label="部门" width="140" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetail(scope.row)">查看详情</el-button>
          <el-button type="danger" link @click="remove(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="detailVisible" title="岗位详情" width="520px">
      <el-descriptions v-if="current" :column="1" border>
        <el-descriptions-item label="岗位名称">{{ current.name }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{ current.department }}</el-descriptions-item>
        <el-descriptions-item label="状态">{{ current.status }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { computed, ref } from 'vue';

const list = ref([
  { name: 'Java 开发工程师', department: '技术部', status: '招聘中' },
  { name: '数据分析师', department: '数据部', status: '招聘中' }
]);

const keyword = ref('');

const filteredJobs = computed(() => {
  if (!keyword.value) return list.value;
  return list.value.filter((j) =>
    [j.name, j.department].some((field) => field.includes(keyword.value))
  );
});

const detailVisible = ref(false);
const current = ref(null);

const onSearch = () => {
  // 占位：后续可接入后端检索
};

const viewDetail = (row) => {
  current.value = row;
  detailVisible.value = true;
};

const remove = (index) => {
  list.value.splice(index, 1);
};
</script>


