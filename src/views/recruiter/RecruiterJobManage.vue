<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">岗位管理</div>
      <el-button type="primary" size="small">批量上传岗位</el-button>
    </div>
    <el-upload
      drag
      multiple
      :auto-upload="false"
      accept=".xls,.xlsx,.csv"
    >
      <el-icon class="el-icon--upload"><ep-upload-filled /></el-icon>
      <div class="el-upload__text">
        将岗位文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          支持 Excel/CSV 批量导入岗位信息（岗位名称、部门、城市、薪资、岗位描述等，实际解析由后端完成）。
        </div>
      </template>
    </el-upload>

    <el-table :data="jobList" size="small" style="margin-top: 16px">
      <el-table-column prop="name" label="岗位名称" />
      <el-table-column prop="department" label="部门" width="120" />
      <el-table-column prop="city" label="城市" width="120" />
      <el-table-column prop="salary" label="薪资" width="120" />
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button type="primary" link @click="openEdit(scope.row)">查看 / 修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 岗位详情与修改弹窗 -->
    <el-dialog
      v-model="editVisible"
      title="岗位详情与修改"
      width="640px"
    >
      <el-form
        v-if="editJob"
        :model="editJob"
        label-width="90px"
      >
        <el-form-item label="岗位名称">
          <el-input v-model="editJob.name" />
        </el-form-item>
        <el-form-item label="岗位描述">
          <el-input
            v-model="editJob.description"
            type="textarea"
            :rows="4"
          />
        </el-form-item>
        <el-form-item label="城市">
          <el-input v-model="editJob.city" />
        </el-form-item>
        <el-form-item label="薪资">
          <el-input v-model="editJob.salary" placeholder="如：15-25K·14 薪" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editJob.status" style="width: 160px">
            <el-option label="招聘中" value="招聘中" />
            <el-option label="暂停招聘" value="暂停招聘" />
            <el-option label="已关闭" value="已关闭" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

// TODO: 接入后端 /api/recruiter/jobs 批量上传与查询/更新
const jobList = ref([
  {
    id: 1,
    name: 'Java 开发工程师',
    department: '技术部',
    city: '深圳',
    salary: '18-25K·14 薪',
    status: '招聘中',
    description: '负责公司核心业务后台服务开发，参与需求评审、系统设计与性能优化。'
  },
  {
    id: 2,
    name: '数据分析师',
    department: '数据部',
    city: '上海',
    salary: '15-20K·14 薪',
    status: '招聘中',
    description: '负责业务数据分析、指标体系建设与可视化报表输出，为业务决策提供支持。'
  }
]);

const editVisible = ref(false);
const editJob = ref(null);

const openEdit = (row) => {
  // 简单克隆一份，避免直接修改表格数据引用
  editJob.value = { ...row };
  editVisible.value = true;
};

const saveEdit = () => {
  // 将编辑后的内容同步回列表（真实项目中这里应调用后端更新接口）
  const index = jobList.value.findIndex((j) => j.id === editJob.value.id);
  if (index !== -1) {
    jobList.value[index] = { ...editJob.value };
  }
  editVisible.value = false;
};
</script>


