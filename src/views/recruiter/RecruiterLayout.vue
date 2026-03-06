<template>
  <el-container style="height: 100vh">
    <el-aside width="220px" style="border-right: 1px solid #ebeef5">
      <div style="padding: 16px; display: flex; align-items: center; gap: 8px">
        <el-icon><ep-collection /></el-icon>
        <span style="font-weight: 600">招聘者端</span>
      </div>
      <el-menu
        :default-active="activeMenu"
        @select="onSelect"
        router
      >
        <el-menu-item index="/recruiter/dashboard">
          <el-icon><ep-data-analysis /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/recruiter/resume-manage">
          <el-icon><ep-folder /></el-icon>
          <span>简历管理</span>
        </el-menu-item>
        <el-menu-item index="/recruiter/job-manage">
          <el-icon><ep-briefcase /></el-icon>
          <span>岗位管理</span>
        </el-menu-item>
        <el-menu-item index="/recruiter/matching">
          <el-icon><ep-connection /></el-icon>
          <span>智能匹配</span>
        </el-menu-item>
        <el-menu-item index="/recruiter/risk">
          <el-icon><ep-warning /></el-icon>
          <span>风险提示</span>
        </el-menu-item>
        <el-menu-item index="/recruiter/reports">
          <el-icon><ep-pie-chart /></el-icon>
          <span>数据报表</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header
        height="56px"
        style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; border-bottom: 1px solid #ebeef5"
      >
        <div class="page-title">智能简历获取与匹配系统 · 招聘者端</div>
        <div style="display: flex; align-items: center; gap: 12px">
          <el-tag size="small" type="info">当前角色：招聘者</el-tag>
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

const onSelect = () => {};

const logout = () => {
  router.push({ name: 'Login', query: { role: 'recruiter' } });
};
</script>

