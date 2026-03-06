import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';

import RecruiterLayout from '@/views/recruiter/RecruiterLayout.vue';
import RecruiterDashboard from '@/views/recruiter/RecruiterDashboard.vue';
import RecruiterResumeJob from '@/views/recruiter/RecruiterResumeJob.vue';
import RecruiterJobManage from '@/views/recruiter/RecruiterJobManage.vue';
import RecruiterMatching from '@/views/recruiter/RecruiterMatching.vue';
import RecruiterRisk from '@/views/recruiter/RecruiterRisk.vue';
import RecruiterReports from '@/views/recruiter/RecruiterReports.vue';

import JobSeekerLayout from '@/views/jobseeker/JobSeekerLayout.vue';
import JobSeekerDashboard from '@/views/jobseeker/JobSeekerDashboard.vue';
import JobSeekerResume from '@/views/jobseeker/JobSeekerResume.vue';
import JobSeekerMatching from '@/views/jobseeker/JobSeekerMatching.vue';

import AdminLayout from '@/views/admin/AdminLayout.vue';
import AdminDashboard from '@/views/admin/AdminDashboard.vue';
import AdminUsers from '@/views/admin/AdminUsers.vue';
import AdminJobs from '@/views/admin/AdminJobs.vue';
import AdminResumes from '@/views/admin/AdminResumes.vue';
import AdminLogs from '@/views/admin/AdminLogs.vue';

const routes = [
  {
    path: './',
    redirect: { name: 'Login' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/recruiter',
    component: RecruiterLayout,
    children: [
      { path: '', redirect: { name: 'RecruiterDashboard' } },
      { path: 'dashboard', name: 'RecruiterDashboard', component: RecruiterDashboard },
      { path: 'resume-manage', name: 'RecruiterResumeJob', component: RecruiterResumeJob },
      { path: 'job-manage', name: 'RecruiterJobManage', component: RecruiterJobManage },
      { path: 'matching', name: 'RecruiterMatching', component: RecruiterMatching },
      { path: 'risk', name: 'RecruiterRisk', component: RecruiterRisk },
      { path: 'reports', name: 'RecruiterReports', component: RecruiterReports }
    ]
  },
  {
    path: '/jobseeker',
    component: JobSeekerLayout,
    children: [
      { path: '', redirect: { name: 'JobSeekerDashboard' } },
      { path: 'dashboard', name: 'JobSeekerDashboard', component: JobSeekerDashboard },
      { path: 'matching', name: 'JobSeekerMatching', component: JobSeekerMatching },
      { path: 'resume', name: 'JobSeekerResume', component: JobSeekerResume }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', redirect: { name: 'AdminDashboard' } },
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'users', name: 'AdminUsers', component: AdminUsers },
      { path: 'jobs', name: 'AdminJobs', component: AdminJobs },
      { path: 'resumes', name: 'AdminResumes', component: AdminResumes },
      { path: 'logs', name: 'AdminLogs', component: AdminLogs }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

