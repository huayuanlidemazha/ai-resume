<template>
  <div class="full-height-layout">
    <el-container style="height: 100vh">
      <el-header height="64px" style="display: flex; align-items: center; justify-content: space-between">
        <div style="display: flex; align-items: center; gap: 10px">
          <el-icon><ep-collection /></el-icon>
          <span style="font-size: 20px; font-weight: 600">智能简历获取与匹配系统</span>
        </div>
      </el-header>
      <el-main>
        <el-row justify="center" style="margin-top: 40px">
          <el-col :span="20">
            <div class="page-header">
              <div class="page-title">请选择登录入口</div>
              <div style="color: #909399">根据你的角色选择对应端入口，支持管理员、招聘者、求职者三端分离访问。</div>
            </div>
            <div class="card-grid">
              <el-card class="role-card" @click="goLogin('recruiter')">
                <template #header>
                  <div style="display: flex; justify-content: space-between; align-items: center">
                    <span>招聘者端</span>
                    <el-tag type="success">核心端</el-tag>
                  </div>
                </template>
                <p>面向 HR/招聘负责人，提供简历与岗位管理、全局检索、智能匹配、风险提示和数据报表等能力。</p>
                <el-button type="primary" text>进入招聘者登录</el-button>
              </el-card>

              <el-card class="role-card" @click="goLogin('jobseeker')">
                <template #header>
                  <span>求职者端</span>
                </template>
                <p>支持上传简历、查看岗位匹配度以及按岗位名称、技能、经验等关键字检索岗位。</p>
                <el-button type="primary" text>进入求职者登录</el-button>
              </el-card>

              <el-card class="role-card" @click="goLogin('admin')">
                <template #header>
                  <span>管理员端</span>
                </template>
                <p>用于管理用户、岗位与简历数据，并查看系统内的用户操作记录与整体运行情况。</p>
                <el-button type="primary" text>进入管理员登录</el-button>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goLogin = (role) => {
  router.push({ name: 'Login', query: { role } });
};
</script>

