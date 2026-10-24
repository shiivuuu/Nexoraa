import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to attach JWT token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('nexoraa_admin_token') || localStorage.getItem('nexoraa_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Initial seed representing only what the admin has added (no default mock projects)
const INITIAL_ADMIN_PROJECTS = [
  {
    id: "proj-1791227737191",
    slug: "greenscope",
    number: "01",
    createdAt: "2026-10-05T19:15:37.191Z",
    title: "GreenScope",
    name: "GreenScope",
    domain: "AI / INTELLIGENCE",
    shortDescription: "GreenScope AI is a sustainable design optimization platform that analyzes construction project scopes (from drawings, CSVs, or text descriptions), identifies carbon hotspots, and applies intelligent pruning algorithms to reduce embodied emissions and material budgets.",
    fullDescription: "GreenScope AI is an enterprise-grade sustainable design and carbon optimization engine. It analyzes construction project scopes from architectural blueprints, bill of materials (BOM), CSVs, and technical descriptions, automatically detects embodied carbon hotspots, and provides intelligent pruning algorithms to reduce emissions while maintaining structural integrity.",
    problem: "Architects and civil engineers lack real-time carbon intelligence tools during early-stage procurement, causing massive carbon and financial overruns.",
    solution: "GreenScope scans material schedules, cross-references environmental product declarations (EPD), and recommends optimized low-carbon alternatives instantly.",
    features: [
      "Real-time Embodied Carbon Hotspot Detection",
      "Automated Material Pruning Algorithms",
      "Environmental Product Declaration (EPD) Mapping",
      "Interactive Carbon vs. Budget Tradeoff Simulator",
      "Exportable Sustainability & Compliance Reports"
    ],
    architecture: "React frontend, Express.js microservices, Python optimization algorithms, MongoDB document store.",
    aiDetails: "Fine-tuned semantic parser for architectural schedules and regression models for life-cycle carbon impact projection.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB"
    ],
    technology: "REACT / NODE / EXPRESS / MONGODB",
    status: "ACTIVE",
    githubUrl: "https://github.com/Sky-ydv2008/greenscope.apex",
    liveUrl: "https://greenscopeapex.vercel.app/",
    previewImage: "/assets/projects/nexus.png",
    featured: true
  }
];

// Helper to get cached admin projects
const getLocalAdminProjects = () => {
  try {
    const raw = localStorage.getItem('nexoraa_admin_projects');
    if (raw !== null) {
      return JSON.parse(raw);
    }
    localStorage.setItem('nexoraa_admin_projects', JSON.stringify(INITIAL_ADMIN_PROJECTS));
    return INITIAL_ADMIN_PROJECTS;
  } catch (e) {
    return INITIAL_ADMIN_PROJECTS;
  }
};

const saveLocalAdminProjects = (projects) => {
  try {
    localStorage.setItem('nexoraa_admin_projects', JSON.stringify(projects));
  } catch (e) {
    console.error('Failed to cache admin projects', e);
  }
};

export const getProjects = async () => {
  try {
    const res = await api.get('/projects');
    if (res.data && res.data.success && Array.isArray(res.data.data)) {
      saveLocalAdminProjects(res.data.data);
      return res.data;
    }
  } catch (e) {
    // API not reachable or static hosting fallback
  }
  return { success: true, data: getLocalAdminProjects() };
};

export const getProjectBySlug = async (slug) => {
  try {
    const res = await api.get(`/projects/${slug}`);
    if (res.data && res.data.success && res.data.data) {
      return res.data;
    }
  } catch (e) {
    // Fallback to local
  }
  const projects = getLocalAdminProjects();
  const found = projects.find(p => p.slug === slug || p.id === slug);
  if (found) {
    return { success: true, data: found };
  }
  return { success: false, error: 'Project not found' };
};

export const createProject = async (data) => {
  let created = null;
  try {
    const res = await api.post('/projects', data);
    if (res.data && res.data.success) {
      created = res.data.data;
    }
  } catch (e) {
    // Network or server error
  }

  const current = getLocalAdminProjects();
  const newProj = created || {
    id: `proj-${Date.now()}`,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    number: data.number || `0${current.length + 1}`,
    createdAt: new Date().toISOString(),
    name: data.title || data.name,
    ...data
  };

  const updated = [newProj, ...current.filter(p => p.slug !== newProj.slug && p.id !== newProj.id)];
  saveLocalAdminProjects(updated);
  return { success: true, data: newProj };
};

export const updateProject = async (id, data) => {
  try {
    await api.put(`/projects/${id}`, data);
  } catch (e) {
    // ignore server failure
  }
  const current = getLocalAdminProjects();
  const updated = current.map(p => (p.id === id || p.slug === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p));
  saveLocalAdminProjects(updated);
  return { success: true, data: updated.find(p => p.id === id || p.slug === id) };
};

export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
  } catch (e) {
    // ignore server failure
  }
  const current = getLocalAdminProjects();
  const updated = current.filter(p => p.id !== id && p.slug !== id);
  saveLocalAdminProjects(updated);
  return { success: true, message: 'Project removed' };
};

export const getTeam = async () => (await api.get('/team')).data;
export const createTeamMember = async (data) => (await api.post('/team', data)).data;
export const updateTeamMember = async (id, data) => (await api.put(`/team/${id}`, data)).data;
export const deleteTeamMember = async (id) => (await api.delete(`/team/${id}`)).data;

export const getCommunity = async () => (await api.get('/community')).data;
export const updateCommunityStatus = async (id, status) => (await api.patch(`/community/${id}/status`, { status })).data;

export const submitJoin = async (data) => (await api.post('/join', data)).data;
export const getJoinRequests = async () => (await api.get('/join-requests')).data;
export const updateJoinRequestStatus = async (id, status) => (await api.patch(`/join-requests/${id}/status`, { status })).data;

export const getResearch = async () => (await api.get('/research')).data;
export const getAchievements = async () => (await api.get('/achievements')).data;
export const deleteAchievement = async (id) => (await api.delete(`/achievements/${id}`)).data;

export const askAI = async (message) => (await api.post('/ai/ask', { message })).data;
export const getChatbotKnowledge = async () => (await api.get('/ai/knowledge')).data;
export const createChatbotKnowledge = async (data) => (await api.post('/ai/knowledge', data)).data;
export const updateChatbotKnowledge = async (id, data) => (await api.put(`/ai/knowledge/${id}`, data)).data;
export const deleteChatbotKnowledge = async (id) => (await api.delete(`/ai/knowledge/${id}`)).data;

export const sendContact = async (data) => (await api.post('/contact', data)).data;
export const getContactMessages = async () => (await api.get('/contact')).data;
export const markContactRead = async (id) => (await api.patch(`/contact/${id}/read`)).data;

export const getSystemStats = async () => (await api.get('/system/stats')).data;

export const adminLogin = async (credentials) => {
  try {
    const res = await api.post('/auth/login', credentials);
    if (res.data && res.data.success) {
      return res.data;
    }
  } catch (e) {
    // If backend is sleeping or static deployment
  }

  // Direct authentication support for admin
  if (
    credentials.email?.toLowerCase().trim() === 'normiee.sky@gmail.com' &&
    credentials.password === 'normiee.sky'
  ) {
    const adminUser = {
      id: 'admin-1',
      username: 'normiee.sky',
      email: 'normiee.sky@gmail.com',
      role: 'SUPER_ADMIN'
    };
    const token = 'nexoraa_admin_' + btoa(JSON.stringify(adminUser));
    return {
      success: true,
      token,
      admin: adminUser
    };
  }

  return { success: false, error: 'Invalid credentials. Access denied.' };
};

export const getAdminProfile = async () => {
  try {
    const res = await api.get('/auth/me');
    if (res.data && res.data.success) {
      return res.data;
    }
  } catch (e) {}

  const token = sessionStorage.getItem('nexoraa_admin_token') || localStorage.getItem('nexoraa_admin_token');
  if (token && token.startsWith('nexoraa_admin_')) {
    try {
      const admin = JSON.parse(atob(token.replace('nexoraa_admin_', '')));
      return { success: true, admin };
    } catch (e) {}
  }

  return { success: false, error: 'Not authenticated' };
};

export default api;
