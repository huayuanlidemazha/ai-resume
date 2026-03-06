<template>
  <div class="full-height-layout" style="display: flex; align-items: center; justify-content: center">
    <el-card style="width: 420px">
      <template #header>
        <span>{{ title }}</span>
      </template>

      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="招聘者" value="recruiter" />
            <el-option label="求职者" value="jobseeker" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="current-password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" style="width: 100%" @click="onSubmit">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          <span style="flex: 1; text-align: right">
            还没有账号？
            <el-link type="primary" @click="goRegister">去注册</el-link>
          </span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const role = ref(route.query.role || 'recruiter');

watch(
  () => route.query.role,
  (val) => {
    role.value = val || 'recruiter';
    form.role = role.value;
  }
);

const title = computed(() => {
  if (role.value === 'recruiter') return '招聘者端登录';
  if (role.value === 'jobseeker') return '求职者端登录';
  if (role.value === 'admin') return '管理员端登录';
  return '系统登录';
});

const formRef = ref();
const loading = ref(false);

const form = reactive({
  role: role.value,
  username: '',
  password: ''
});

const rules = {
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const goRegister = () => {
  router.push({ name: 'Register', query: { role: form.role } });
};

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // TODO: 调用后端 /api/auth/login，当前使用模拟逻辑
      await new Promise((resolve) => setTimeout(resolve, 600));
      ElMessage.success('登录成功（当前为前端模拟，后端接入后将真正校验）');
      if (form.role === 'recruiter') {
        router.push({ name: 'RecruiterDashboard' });
      } else if (form.role === 'jobseeker') {
        router.push({ name: 'JobSeekerDashboard' });
      } else if (form.role === 'admin') {
        router.push({ name: 'AdminDashboard' });
      } else {
        router.push({ name: 'RoleSelect' });
      }
    } finally {
      loading.value = false;
    }
  });
};
</script>

