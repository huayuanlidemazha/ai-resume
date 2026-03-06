<template>
  <div class="full-height-layout" style="display: flex; align-items: center; justify-content: center">
    <el-card style="width: 460px">
      <template #header>
        <span>{{ title }}</span>
      </template>

      <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
        <el-form-item label="角色" prop="role">
          <el-select v-model="role" placeholder="请选择角色">
            <el-option label="招聘者" value="recruiter" />
            <el-option label="求职者" value="jobseeker" />
            <el-option label="管理员" value="admin" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" autocomplete="new-password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" show-password />
        </el-form-item>
        <el-form-item v-if="role === 'recruiter'" label="公司名称" prop="company">
          <el-input v-model="form.company" />
        </el-form-item>
        <el-form-item v-if="role === 'jobseeker'" label="姓名" prop="fullName">
          <el-input v-model="form.fullName" />
        </el-form-item>
        <el-form-item v-if="role === 'admin'" label="工号/备注">
          <el-input v-model="form.remark" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" style="width: 100%" @click="onSubmit">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          <span style="flex: 1; text-align: right">
            已有账号？
            <el-link type="primary" @click="goLogin">去登录</el-link>
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
  }
);

const title = computed(() => {
  if (role.value === 'recruiter') return '招聘者端注册';
  if (role.value === 'jobseeker') return '求职者端注册';
  if (role.value === 'admin') return '管理员端注册';
  return '系统注册';
});

const formRef = ref();
const loading = ref(false);

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  company: '',
  fullName: '',
  remark: ''
});

const validateConfirm = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请再次输入密码'));
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'));
  } else {
    callback();
  }
};

const rules = {
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  confirmPassword: [{ validator: validateConfirm, trigger: 'blur' }]
};

const goLogin = () => {
  router.push({ name: 'Login', query: { role: role.value } });
};

const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      // TODO: 调用后端 /api/auth/register，当前使用模拟逻辑
      await new Promise((resolve) => setTimeout(resolve, 600));
      ElMessage.success('注册成功（当前为前端模拟，后端接入后将真正落库）');
      goLogin();
    } finally {
      loading.value = false;
    }
  });
};
</script>

