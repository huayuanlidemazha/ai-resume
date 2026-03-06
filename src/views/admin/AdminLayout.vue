<template>
  <el-container style="height: 100vh">
    <el-aside width="220px" style="border-right: 1px solid #ebeef5">
      <div style="padding: 16px; display: flex; align-items: center; gap: 8px">
        <el-icon><ep-collection /></el-icon>
        <span style="font-weight: 600">管理员端</span>
      </div>
      <el-menu :default-active="activeMenu" router>
        <el-menu-item index="/admin/dashboard">
          <el-icon><ep-data-analysis /></el-icon>
          <span>系统概览</span>
        </el-menu-item>
        <el-menu-item index="/admin/users">
          <el-icon><ep-user /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/jobs">
          <el-icon><ep-briefcase /></el-icon>
          <span>岗位管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/resumes">
          <el-icon><ep-document /></el-icon>
          <span>简历管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/logs">
          <el-icon><ep-tickets /></el-icon>
          <span>操作记录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header
        height="56px"
        style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #ebeef5"
      >
        <div class="page-title">智能简历获取与匹配系统 · 管理员端</div>
        <div style="display: flex; align-items: center; gap: 12px">
          <el-tag size="small" type="info">当前角色：管理员</el-tag>
          <el-button type="text" @click="logout">退出登录</el-button>
        </div>
      </el-header>
      <el-main style="padding: 20px; background-color: #f5f7fa">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const activeMenu = computed(() => route.path);

const logout = () => {
  router.push({ name: 'Login', query: { role: 'admin' } });
};
</script>

