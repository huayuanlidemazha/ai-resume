<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">用户管理</div>
      <el-input
        v-model="keyword"
        placeholder="搜索账号 / 角色"
        size="small"
        style="width: 260px"
        clearable
      >
        <template #append>
          <el-button @click="onSearch" size="small">检索</el-button>
        </template>
      </el-input>
    </div>
    <el-table :data="filteredUsers" border>
      <el-table-column prop="username" label="账号" />
      <el-table-column prop="role" label="角色" width="120" />
      <el-table-column prop="createdAt" label="注册时间" width="160" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button type="primary" link @click="viewDetail(scope.row)">查看详情</el-button>
          <el-button type="danger" link @click="remove(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="detailVisible" title="用户详情" width="480px">
      <el-descriptions v-if="current" :column="1" border>
        <el-descriptions-item label="账号">{{ current.username }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ current.role }}</el-descriptions-item>
        <el-descriptions-item label="注册时间">{{ current.createdAt }}</el-descriptions-item>
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
  { username: 'hr001', role: '招聘者', createdAt: '2026-02-20 10:00' },
  { username: 'js001', role: '求职者', createdAt: '2026-02-21 09:30' },
  { username: 'admin', role: '管理员', createdAt: '2026-02-15 08:20' }
]);

const keyword = ref('');

const filteredUsers = computed(() => {
  if (!keyword.value) return list.value;
  return list.value.filter((u) =>
    [u.username, u.role].some((field) => field.includes(keyword.value))
  );
});

const detailVisible = ref(false);
const current = ref(null);

const onSearch = () => {
  // 计算属性已自动过滤，此处保留入口用于后续接入后端检索
};

const viewDetail = (row) => {
  current.value = row;
  detailVisible.value = true;
};

const remove = (index) => {
  list.value.splice(index, 1);
};
</script>


