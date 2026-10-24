import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  Users,
  MessageSquare,
  Mail,
  Shield,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  LogOut,
  Bot,
  UserPlus,
  Layers,
  X,
  Lock,
  Cpu
} from 'lucide-react';
import Logo from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import {
  getSystemStats,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getTeam,
  createTeamMember,
  deleteTeamMember,
  getCommunity,
  updateCommunityStatus,
  getJoinRequests,
  updateJoinRequestStatus,
  getChatbotKnowledge,
  createChatbotKnowledge,
  deleteChatbotKnowledge,
  getContactMessages,
  markContactRead
} from '../services/api';

const AdminDashboardPage = () => {
  const { admin, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [team, setTeam] = useState([]);
  const [community, setCommunity] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [knowledge, setKnowledge] = useState([]);
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Modal / Form states
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: '',
    slug: '',
    domain: 'AI / INTELLIGENCE',
    shortDescription: '',
    fullDescription: '',
    problem: '',
    solution: '',
    features: '',
    architecture: '',
    aiDetails: '',
    techStack: 'React, Node.js, Express, MongoDB',
    status: 'ACTIVE',
    githubUrl: '',
    liveUrl: '',
    previewImage: '/assets/projects/nexus.png',
    featured: true
  });

  const [showTeamModal, setShowTeamModal] = useState(false);
  const [teamForm, setTeamForm] = useState({
    name: '',
    username: '',
    role: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    skills: 'Full Stack, AI, Systems'
  });

  const [showKnowledgeModal, setShowKnowledgeModal] = useState(false);
  const [knowledgeForm, setKnowledgeForm] = useState({
    question: '',
    answer: '',
    category: 'GENERAL',
    keywords: 'nexora, system',
    priority: 5,
    pageReference: '/'
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  const loadAllData = async () => {
    setRefreshing(true);
    try {
      const [sRes, pRes, tRes, cRes, jRes, kRes, mRes] = await Promise.all([
        getSystemStats().catch(() => ({ success: false })),
        getProjects().catch(() => ({ success: true, data: [] })),
        getTeam().catch(() => ({ success: false })),
        getCommunity().catch(() => ({ success: false })),
        getJoinRequests().catch(() => ({ success: false })),
        getChatbotKnowledge().catch(() => ({ success: false })),
        getContactMessages().catch(() => ({ success: false }))
      ]);

      if (sRes && sRes.success) setStats(sRes.data);
      if (pRes && pRes.data) setProjects(pRes.data);
      if (tRes && tRes.success) setTeam(tRes.data);
      if (cRes && cRes.success) setCommunity(cRes.data);
      if (jRes && jRes.success) setJoinRequests(jRes.data);
      if (kRes && kRes.success) setKnowledge(kRes.data);
      if (mRes && mRes.success) setMessages(mRes.data);
    } catch (err) {
      console.error('[Admin] Error loading CMS data:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  // Project Handlers
  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...projectForm,
        slug: projectForm.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        features: typeof projectForm.features === 'string' ? projectForm.features.split(',').map(s => s.trim()).filter(Boolean) : projectForm.features,
        techStack: typeof projectForm.techStack === 'string' ? projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean) : projectForm.techStack,
      };
      await createProject(payload);
      setShowProjectModal(false);
      setProjectForm({
        title: '',
        slug: '',
        domain: 'AI / INTELLIGENCE',
        shortDescription: '',
        fullDescription: '',
        problem: '',
        solution: '',
        features: '',
        architecture: '',
        aiDetails: '',
        techStack: 'React, Node.js, Express, MongoDB',
        status: 'ACTIVE',
        githubUrl: '',
        liveUrl: '',
        previewImage: '/assets/projects/nexus.png',
        featured: true
      });
      loadAllData();
    } catch (err) {
      alert('Error creating project: ' + err.message);
    }
  };

  const handleDeleteProject = async (slugOrId) => {
    if (!window.confirm('Delete project specification?')) return;
    try {
      await deleteProject(slugOrId);
      loadAllData();
    } catch (err) {
      alert('Error removing project: ' + err.message);
    }
  };

  // Team Handlers
  const handleSaveTeamMember = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...teamForm,
        username: teamForm.username || teamForm.name.toLowerCase().replace(/[^a-z0-9]+/g, ''),
        skills: typeof teamForm.skills === 'string' ? teamForm.skills.split(',').map(s => s.trim()).filter(Boolean) : teamForm.skills
      };
      await createTeamMember(payload);
      setShowTeamModal(false);
      loadAllData();
    } catch (err) {
      alert('Error creating team member: ' + err.message);
    }
  };

  const handleDeleteTeamMember = async (id) => {
    if (!window.confirm('Remove team member?')) return;
    try {
      await deleteTeamMember(id);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Knowledge Handlers
  const handleSaveKnowledge = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...knowledgeForm,
        keywords: typeof knowledgeForm.keywords === 'string' ? knowledgeForm.keywords.split(',').map(s => s.trim()).filter(Boolean) : knowledgeForm.keywords,
        priority: Number(knowledgeForm.priority) || 5
      };
      await createChatbotKnowledge(payload);
      setShowKnowledgeModal(false);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteKnowledge = async (id) => {
    if (!window.confirm('Remove this Q&A entry from knowledge base?')) return;
    try {
      await deleteChatbotKnowledge(id);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Join Requests Handlers
  const handleUpdateJoinStatus = async (id, status) => {
    try {
      await updateJoinRequestStatus(id, status);
      loadAllData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  // Community Handlers
  const handleUpdateCommunityStatus = async (id, status) => {
    try {
      await updateCommunityStatus(id, status);
      loadAllData();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  // Messages
  const handleMarkMessageRead = async (id) => {
    try {
      await markContactRead(id);
      loadAllData();
    } catch (err) {
      console.error(err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center text-mono text-xs text-[#244638]">
        VERIFYING AUTHENTICATION CONSOLE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-[#252922] flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="border-b border-[#244638]/12 bg-[#FFFCF7] px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="text-mono text-xs text-[#A15E40] tracking-widest pl-3 border-l border-[#244638]/15 hidden sm:inline">
            ENGINEERING CMS // DISPATCH CONSOLE
          </span>
        </div>

        <div className="flex items-center gap-4 text-mono text-xs">
          <button
            onClick={loadAllData}
            disabled={refreshing}
            className="p-2 border border-[#244638]/15 hover:border-[#244638] rounded bg-[#F5F0E8] text-[#244638] transition-colors flex items-center gap-1.5"
            title="Refresh CMS Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-[#A15E40]' : ''}`} />
            <span className="hidden md:inline">SYNC</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[#686B61] px-3 py-1.5 rounded bg-[#F5F0E8] border border-[#244638]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#244638]" />
            <span>{admin?.email || 'normiee.sky@gmail.com'}</span>
          </div>

          <button
            onClick={logout}
            className="px-3 py-1.5 border border-red-300 hover:border-red-600 bg-red-50 text-red-700 rounded transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>EXIT</span>
          </button>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 border-r border-[#244638]/12 bg-[#FFFCF7] p-4 text-mono text-xs space-y-1">
          <div className="text-[10px] text-[#686B61] tracking-widest px-3 py-2">
            MANAGEMENT MODULES
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'dashboard' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <LayoutDashboard className="w-4 h-4" />
              <span>DASHBOARD</span>
            </div>
            <span className="text-[10px] text-[#A15E40]">●</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'projects' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderGit2 className="w-4 h-4" />
              <span>PROJECTS</span>
            </div>
            <span className="text-[10px] bg-[#E6DFD3] text-[#252922] px-1.5 py-0.5 rounded font-semibold">{projects.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('team')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'team' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>TEAM MEMBERS</span>
            </div>
            <span className="text-[10px] bg-[#E6DFD3] text-[#252922] px-1.5 py-0.5 rounded">{team.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('joinRequests')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'joinRequests' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-4 h-4" />
              <span>APPLICATIONS</span>
            </div>
            <span className="text-[10px] bg-[#A15E40] text-white px-1.5 py-0.5 rounded">
              {joinRequests.filter(r => r.status === 'pending').length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('knowledge')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'knowledge' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-4 h-4" />
              <span>ASSISTANT RAG</span>
            </div>
            <span className="text-[10px] bg-[#E6DFD3] text-[#252922] px-1.5 py-0.5 rounded">{knowledge.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
              activeTab === 'messages' ? 'bg-[#244638] text-[#F5F0E8] font-bold' : 'text-[#686B61] hover:text-[#252922] hover:bg-[#F5F0E8]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4" />
              <span>DISPATCHES</span>
            </div>
            <span className="text-[10px] bg-[#E6DFD3] text-[#252922] px-1.5 py-0.5 rounded">{messages.length}</span>
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between pb-6 border-b border-[#244638]/12">
                <div>
                  <h1 className="font-serif text-3xl sm:text-4xl text-[#244638]">
                    System Overview
                  </h1>
                  <p className="text-xs text-[#686B61] text-mono mt-1">
                    TELEMETRY &amp; OPERATIONAL HEALTH // VERIFIED ENGINE
                  </p>
                </div>
                <Link
                  to="/"
                  target="_blank"
                  className="px-3.5 py-2 border border-[#244638]/20 hover:border-[#244638] text-mono text-xs rounded bg-[#FFFCF7] text-[#244638] flex items-center gap-1.5 transition-colors font-medium"
                >
                  <span>LIVE FRONTEND</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#A15E40]" />
                </Link>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-1">
                  <div className="text-mono text-xs text-[#686B61]">TOTAL PROJECTS</div>
                  <div className="font-serif text-4xl text-[#244638]">{projects.length}</div>
                  <div className="text-mono text-[10px] text-[#A15E40]">{projects.length} PUBLISHED SPECIFICATIONS</div>
                </div>

                <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-1">
                  <div className="text-mono text-xs text-[#686B61]">PENDING CANDIDATES</div>
                  <div className="font-serif text-4xl text-[#A15E40]">
                    {joinRequests.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-mono text-[10px] text-[#686B61]">
                    {joinRequests.length} TOTAL INBOUND
                  </div>
                </div>

                <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-1">
                  <div className="text-mono text-xs text-[#686B61]">CHATBOT KNOWLEDGE</div>
                  <div className="font-serif text-4xl text-[#244638]">{knowledge.length}</div>
                  <div className="text-mono text-[10px] text-[#686B61]">INDEXED RAG ENTRIES</div>
                </div>

                <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-1">
                  <div className="text-mono text-xs text-[#686B61]">STORAGE ENGINE</div>
                  <div className="font-serif text-2xl text-[#244638] pt-1">
                    {stats?.database || "ACTIVE"}
                  </div>
                  <div className="text-mono text-[10px] text-[#A15E40]">PERSISTENT SYNCHRONIZATION</div>
                </div>
              </div>

              {/* Recent Join Requests Quick View */}
              <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-4">
                <div className="flex items-center justify-between border-b border-[#244638]/10 pb-3 text-mono text-xs">
                  <span className="font-bold text-[#244638]">RECENT CANDIDATE SUBMISSIONS</span>
                  <button onClick={() => setActiveTab('joinRequests')} className="text-[#A15E40] hover:underline">
                    VIEW ALL →
                  </button>
                </div>
                {joinRequests.length === 0 ? (
                  <div className="text-sm text-[#686B61] py-4">No candidate requests received yet.</div>
                ) : (
                  <div className="divide-y divide-[#244638]/10">
                    {joinRequests.slice(0, 3).map((r) => (
                      <div key={r.id} className="py-3 flex items-center justify-between text-xs text-mono">
                        <div>
                          <span className="font-bold text-[#252922] mr-3">{r.name}</span>
                          <span className="text-[#244638] bg-[#E6DFD3] px-2 py-0.5 rounded text-[10px] mr-2">
                            {r.role}
                          </span>
                          <span className="text-[#686B61]">{r.email}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          r.status === 'pending' ? 'bg-[#A15E40]/15 text-[#A15E40] font-semibold' : 'bg-[#244638]/15 text-[#244638] font-semibold'
                        }`}>
                          {r.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#244638]/12">
                <div>
                  <h1 className="font-serif text-3xl text-[#244638]">Projects CMS</h1>
                  <p className="text-xs text-[#686B61] text-mono mt-1">
                    CREATE, EDIT &amp; DEPLOY ARCHITECTURAL SPECIFICATIONS
                  </p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>NEW PROJECT SPECIFICATION</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div className="bg-[#FFFCF7] p-10 rounded-xl border border-[#244638]/15 text-center space-y-3">
                  <FolderGit2 className="w-8 h-8 text-[#A15E40] mx-auto" />
                  <h3 className="font-serif text-xl text-[#244638]">No Projects In Database</h3>
                  <p className="text-xs text-[#686B61]">Click "New Project Specification" above to publish your first project.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((p) => (
                    <div key={p.slug || p.id} className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-mono text-xs">
                          <span className="text-[#A15E40] font-bold">{p.number || '01'}</span>
                          <span className="text-[#686B61]">{p.domain}</span>
                          <span className="text-[10px] text-[#244638] bg-[#E6DFD3] px-2 py-0.5 rounded font-medium">
                            {p.status || 'ACTIVE'}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl text-[#244638]">
                          {p.title || p.name}
                        </h3>
                        <p className="text-xs text-[#686B61] max-w-2xl line-clamp-2">
                          {p.shortDescription}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 text-mono text-xs self-end md:self-center">
                        <Link
                          to={`/projects/${p.slug}`}
                          target="_blank"
                          className="p-2 border border-[#244638]/15 hover:border-[#244638] rounded bg-[#F5F0E8] text-[#244638]"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(p.slug || p.id)}
                          className="p-2 border border-red-200 hover:border-red-500 bg-red-50 text-red-600 rounded"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: TEAM MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#244638]/12">
                <div>
                  <h1 className="font-serif text-3xl text-[#244638]">Team CMS</h1>
                  <p className="text-xs text-[#686B61] text-mono mt-1">
                    MANAGE CORE ARCHITECTS &amp; ROLES
                  </p>
                </div>
                <button
                  onClick={() => setShowTeamModal(true)}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD MEMBER</span>
                </button>
              </div>

              <div className="space-y-4">
                {team.map((m) => (
                  <div key={m.id || m.username} className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-[#244638]">{m.name}</h3>
                      <div className="text-mono text-xs text-[#A15E40] mt-0.5">{m.role}</div>
                      <p className="text-xs text-[#686B61] mt-2 max-w-xl">{m.bio}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteTeamMember(m.id)}
                      className="p-2 border border-red-200 hover:border-red-500 bg-red-50 text-red-600 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: JOIN REQUESTS */}
          {activeTab === 'joinRequests' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-[#244638]/12">
                <h1 className="font-serif text-3xl text-[#244638]">Applications &amp; Fellowships</h1>
                <p className="text-xs text-[#686B61] text-mono mt-1">
                  INBOUND CANDIDATE DOSSIERS
                </p>
              </div>

              <div className="space-y-4">
                {joinRequests.length === 0 ? (
                  <div className="text-sm text-[#686B61] py-8 text-center bg-[#FFFCF7] rounded-xl border border-[#244638]/15">
                    No join requests logged yet.
                  </div>
                ) : (
                  joinRequests.map((req) => (
                    <div key={req.id} className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#244638]/10 pb-3">
                        <div>
                          <span className="font-bold text-[#244638] text-base mr-3">{req.name}</span>
                          <span className="text-mono text-xs text-[#A15E40] bg-[#E6DFD3] px-2 py-0.5 rounded mr-3">
                            {req.role}
                          </span>
                          <span className="text-xs text-[#686B61]">{req.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleUpdateJoinStatus(req.id, 'accepted')}
                            className="px-2.5 py-1 bg-[#244638] text-white rounded text-xs text-mono"
                          >
                            ACCEPT
                          </button>
                          <button
                            onClick={() => handleUpdateJoinStatus(req.id, 'rejected')}
                            className="px-2.5 py-1 border border-red-300 text-red-600 rounded text-xs text-mono"
                          >
                            REJECT
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-[#252922] space-y-1">
                        <div><strong className="text-[#686B61]">Skills:</strong> {req.skills}</div>
                        <div><strong className="text-[#686B61]">Statement:</strong> {req.whyNexoraa || req.whyJoin}</div>
                        {req.github && <div><strong className="text-[#686B61]">GitHub:</strong> <a href={req.github} target="_blank" rel="noreferrer" className="text-[#244638] hover:underline">{req.github}</a></div>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 5: KNOWLEDGE */}
          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#244638]/12">
                <div>
                  <h1 className="font-serif text-3xl text-[#244638]">Chatbot RAG Knowledge</h1>
                  <p className="text-xs text-[#686B61] text-mono mt-1">
                    INDEXED GROUNDING REPOSITORIES
                  </p>
                </div>
                <button
                  onClick={() => setShowKnowledgeModal(true)}
                  className="btn-primary text-xs py-2 px-3.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD Q&amp;A PAIR</span>
                </button>
              </div>

              <div className="space-y-3">
                {knowledge.map((k) => (
                  <div key={k.id} className="bg-[#FFFCF7] p-5 rounded-xl border border-[#244638]/15 shadow-card flex items-start justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="text-mono text-[#A15E40] font-semibold">{k.category} // PRIORITY {k.priority}</div>
                      <div className="font-semibold text-sm text-[#244638]">Q: {k.question}</div>
                      <p className="text-[#686B61] leading-relaxed">A: {k.answer}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteKnowledge(k.id)}
                      className="p-1.5 border border-red-200 text-red-600 rounded shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: DISPATCH MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-[#244638]/12">
                <h1 className="font-serif text-3xl text-[#244638]">Contact Inquiries</h1>
                <p className="text-xs text-[#686B61] text-mono mt-1">
                  COMMUNICATION ARCHIVE
                </p>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="text-sm text-[#686B61] py-8 text-center bg-[#FFFCF7] rounded-xl border border-[#244638]/15">
                    No dispatches received yet.
                  </div>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/15 shadow-card space-y-2">
                      <div className="flex items-center justify-between text-xs text-mono border-b border-[#244638]/10 pb-2">
                        <span className="font-bold text-[#244638]">{m.name} &lt;{m.email}&gt;</span>
                        <span className="text-[#686B61]">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs font-semibold text-[#A15E40]">Topic: {m.subject || 'General Inquiry'}</div>
                      <p className="text-xs text-[#686B61] leading-relaxed">{m.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showProjectModal && (
        <div className="fixed inset-0 z-50 bg-[#252922]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] p-6 sm:p-8 rounded-xl max-w-2xl w-full border border-[#244638]/20 shadow-elevated max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#244638]/10 pb-3">
              <span className="font-serif text-2xl text-[#244638]">New Project Specification</span>
              <button onClick={() => setShowProjectModal(false)} className="text-[#686B61] hover:text-[#252922]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">PROJECT TITLE *</label>
                <input
                  type="text"
                  required
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  placeholder="e.g. GreenScope AI"
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-mono text-[10px] text-[#686B61] mb-1">DOMAIN *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.domain}
                    onChange={(e) => setProjectForm({ ...projectForm, domain: e.target.value })}
                    className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                  />
                </div>
                <div>
                  <label className="block text-mono text-[10px] text-[#686B61] mb-1">STATUS</label>
                  <input
                    type="text"
                    value={projectForm.status}
                    onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                    className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">SHORT DESCRIPTION *</label>
                <textarea
                  rows={2}
                  required
                  value={projectForm.shortDescription}
                  onChange={(e) => setProjectForm({ ...projectForm, shortDescription: e.target.value })}
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">TECH STACK (comma-separated)</label>
                <input
                  type="text"
                  value={projectForm.techStack}
                  onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-mono text-[10px] text-[#686B61] mb-1">GITHUB URL</label>
                  <input
                    type="url"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                  />
                </div>
                <div>
                  <label className="block text-mono text-[10px] text-[#686B61] mb-1">LIVE DEMO URL</label>
                  <input
                    type="url"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowProjectModal(false)}
                  className="px-4 py-2 border border-[#244638]/20 rounded text-[#686B61] hover:text-[#252922]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  PUBLISH SPECIFICATION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE KNOWLEDGE MODAL */}
      {showKnowledgeModal && (
        <div className="fixed inset-0 z-50 bg-[#252922]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] p-6 sm:p-8 rounded-xl max-w-lg w-full border border-[#244638]/20 shadow-elevated space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#244638]/10 pb-3">
              <span className="font-serif text-2xl text-[#244638]">Add Knowledge Entry</span>
              <button onClick={() => setShowKnowledgeModal(false)} className="text-[#686B61] hover:text-[#252922]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveKnowledge} className="space-y-4">
              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">QUESTION / TRIGGER *</label>
                <input
                  type="text"
                  required
                  value={knowledgeForm.question}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, question: e.target.value })}
                  placeholder="e.g. What is the focus of Nexora?"
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">GROUNDED ANSWER *</label>
                <textarea
                  rows={3}
                  required
                  value={knowledgeForm.answer}
                  onChange={(e) => setKnowledgeForm({ ...knowledgeForm, answer: e.target.value })}
                  placeholder="Provide technical response..."
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowKnowledgeModal(false)}
                  className="px-4 py-2 border border-[#244638]/20 rounded text-[#686B61]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  SAVE KNOWLEDGE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE TEAM MODAL */}
      {showTeamModal && (
        <div className="fixed inset-0 z-50 bg-[#252922]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] p-6 sm:p-8 rounded-xl max-w-lg w-full border border-[#244638]/20 shadow-elevated space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#244638]/10 pb-3">
              <span className="font-serif text-2xl text-[#244638]">Add Team Member</span>
              <button onClick={() => setShowTeamModal(false)} className="text-[#686B61] hover:text-[#252922]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTeamMember} className="space-y-4">
              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">MEMBER NAME *</label>
                <input
                  type="text"
                  required
                  value={teamForm.name}
                  onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">ROLE *</label>
                <input
                  type="text"
                  required
                  value={teamForm.role}
                  onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                  placeholder="e.g. SYSTEMS ARCHITECT"
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div>
                <label className="block text-mono text-[10px] text-[#686B61] mb-1">BIOGRAPHY</label>
                <textarea
                  rows={2}
                  value={teamForm.bio}
                  onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                  className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded p-2.5 text-[#252922]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowTeamModal(false)}
                  className="px-4 py-2 border border-[#244638]/20 rounded text-[#686B61]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2 px-5 text-xs"
                >
                  SAVE MEMBER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
