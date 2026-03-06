<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">我的简历</div>
      <el-button type="primary" size="small">批量上传简历</el-button>
    </div>
    <el-upload
      drag
      multiple
      :auto-upload="false"
      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.png"
    >
      <el-icon class="el-icon--upload"><ep-upload-filled /></el-icon>
      <div class="el-upload__text">
        将简历文件拖到此处，或
        <em>点击选择文件</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          支持照片、PDF、Word、Excel 等格式。上传后由后端解析并调用 AI 完成岗位匹配与风险分析。
        </div>
      </template>
    </el-upload>

    <el-table :data="resumeList" size="small" style="margin-top: 16px">
      <el-table-column prop="name" label="姓名" width="120" />
      <el-table-column prop="bestMatchJob" label="匹配岗位" />
      <el-table-column prop="bestMatchScore" label="匹配度" width="140">
        <template #default="scope">
          <el-progress :percentage="scope.row.bestMatchScore" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" />
      <el-table-column label="操作" width="140">
        <template #default="scope">
          <el-button type="primary" link @click="openDetail(scope.row)">
            查看匹配详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 匹配详情弹窗（结构与招聘者端类似，但从求职者视角） -->
    <el-dialog
      v-model="detailVisible"
      title="匹配详情"
      width="720px"
    >
      <template v-if="currentResume">
        <div style="margin-bottom: 12px">
          <strong>我的简历：</strong>{{ currentResume.name }}
        </div>

        <el-tabs v-model="activeJobId" type="card">
          <el-tab-pane
            v-for="job in currentResume.matchedJobs"
            :key="job.id"
            :label="job.jobName + '（' + job.score + '%）'"
            :name="job.id"
          />
        </el-tabs>

        <div v-for="job in currentResume.matchedJobs" :key="job.id" v-show="job.id === activeJobId">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="匹配岗位">{{ job.jobName }}</el-descriptions-item>
            <el-descriptions-item label="匹配度">{{ job.score }}%</el-descriptions-item>
            <el-descriptions-item label="匹配关键词" :span="2">
              {{ job.keywords.join('、') }}
            </el-descriptions-item>
            <el-descriptions-item label="专业术语" :span="2">
              {{ job.terms.join('、') }}
            </el-descriptions-item>
            <el-descriptions-item label="匹配依据" :span="2">
              {{ job.reason }}
            </el-descriptions-item>
            <el-descriptions-item label="风险提示" :span="2">
              <span v-if="job.risks.length === 0">暂无明显风险</span>
              <ul v-else style="padding-left: 18px; margin: 0">
                <li v-for="(risk, idx) in job.risks" :key="idx">
                  {{ risk }}
                </li>
              </ul>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </template>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

// TODO: 接入后端 /api/jobseeker/resumes 与 /api/jobseeker/matching
const resumeList = ref([
  {
    id: 1,
    name: '张三',
    bestMatchJob: 'Java 开发工程师',
    bestMatchScore: 90,
    status: '已匹配',
    matchedJobs: [
      {
        id: 'job1',
        jobName: 'Java 开发工程师',
        score: 90,
        keywords: ['Java', 'Spring Boot', 'MySQL'],
        terms: ['微服务', '分布式'],
        reason: '你拥有 3 年 Java 后端经验，技术栈与岗位要求高度一致。',
        risks: ['最近一次跳槽间隔较短，建议在面试中说明原因。']
      },
      {
        id: 'job2',
        jobName: '后端开发工程师',
        score: 80,
        keywords: ['REST API', 'Redis'],
        terms: ['高并发', '缓存'],
        reason: '具备通用后端开发能力，可胜任该岗位核心职责。',
        risks: []
      }
    ]
  }
]);

const detailVisible = ref(false);
const currentResume = ref(null);
const activeJobId = ref('');

const openDetail = (row) => {
  currentResume.value = row;
  activeJobId.value = row.matchedJobs[0]?.id || '';
  detailVisible.value = true;
};
</script>


