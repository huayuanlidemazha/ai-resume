<template>
  <el-card>
    <div class="page-header">
      <div class="page-title">简历管理</div>
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
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          支持照片、PDF、Word、Excel 等常见简历格式。上传后由后端解析并调用 AI 完成岗位匹配与风险分析。
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

    <!-- 匹配详情弹窗 -->
    <el-dialog
      v-model="detailVisible"
      title="匹配详情"
      width="720px"
    >
      <template v-if="currentResume">
        <div style="margin-bottom: 12px">
          <strong>候选人：</strong>{{ currentResume.name }}
        </div>

        <!-- 若一份简历匹配多个岗位，可在这里切换查看 -->
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

// 示例数据：每条简历已经由 AI 匹配到了多个岗位
const resumeList = ref([
  {
    id: 1,
    name: '李四',
    bestMatchJob: 'Java 开发工程师',
    bestMatchScore: 92,
    status: '已匹配',
    matchedJobs: [
      {
        id: 'job1',
        jobName: 'Java 开发工程师',
        score: 92,
        keywords: ['Java', 'Spring Boot', 'MySQL'],
        terms: ['微服务架构', '分布式事务'],
        reason: '候选人有 5 年 Java 后端经验，熟悉 Spring Boot 与微服务实践，项目经历与岗位描述高度重合。',
        risks: ['最近两份工作跨度较短，建议核实离职原因。']
      },
      {
        id: 'job2',
        jobName: '后端开发工程师',
        score: 81,
        keywords: ['REST API', 'Redis'],
        terms: ['高并发', '缓存穿透'],
        reason: '具备 RESTful 接口设计与缓存优化经验，能够胜任通用后端开发工作。',
        risks: []
      }
    ]
  },
  {
    id: 2,
    name: '王五',
    bestMatchJob: '数据分析师',
    bestMatchScore: 88,
    status: '已匹配',
    matchedJobs: [
      {
        id: 'job3',
        jobName: '数据分析师',
        score: 88,
        keywords: ['SQL', 'Python', '可视化'],
        terms: ['A/B 测试', '漏斗分析'],
        reason: '熟练使用 SQL 与 Python 进行数据分析，对业务指标拆解和可视化经验丰富。',
        risks: ['教育经历与工作时间存在 3 个月重叠，建议进一步确认。']
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

