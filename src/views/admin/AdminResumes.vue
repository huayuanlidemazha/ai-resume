<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">简历管理</div>
      <el-input
        v-model="keyword"
        placeholder="搜索姓名 / 意向岗位 / 用户"
        size="small"
        style="width: 260px"
        clearable
      >
        <template #append>
          <el-button @click="onSearch" size="small">检索</el-button>
        </template>
      </el-input>
    </div>
    <el-table :data="filteredResumes" border>
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="jobName" label="意向岗位" />
      <el-table-column prop="uploader" label="所属用户" width="140" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetail(scope.row)">查看详情</el-button>
          <el-button type="danger" link @click="remove(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="detailVisible" title="简历详情" width="520px">
      <el-descriptions v-if="current" :column="1" border>
        <el-descriptions-item label="姓名">{{ current.name }}</el-descriptions-item>
        <el-descriptions-item label="意向岗位">{{ current.jobName }}</el-descriptions-item>
        <el-descriptions-item label="所属用户">{{ current.uploader }}</el-descriptions-item>
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
  { name: '张三', jobName: 'Java 开发工程师', uploader: 'js001' },
  { name: '李四', jobName: '后端开发工程师', uploader: 'js002' }
]);

const keyword = ref('');

const filteredResumes = computed(() => {
  if (!keyword.value) return list.value;
  return list.value.filter((r) =>
    [r.name, r.jobName, r.uploader].some((field) => field.includes(keyword.value))
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


