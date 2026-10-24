import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Filter, FolderGit2 } from 'lucide-react';
import { getProjects } from '../services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProjectsList = async () => {
      try {
        const res = await getProjects();
        if (isMounted && res && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        if (isMounted) setProjects([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchProjectsList();
    window.scrollTo(0, 0);
    return () => { isMounted = false; };
  }, []);

  // Derive dynamic filter domains from actual projects
  const availableDomains = ["ALL", ...new Set(projects.map(p => p.domain).filter(Boolean))];

  const filtered = selectedDomain === "ALL" 
    ? projects 
    : projects.filter(p => {
        const dom = (p.domain || '').toLowerCase();
        const tit = (p.title || p.name || '').toLowerCase();
        const sel = selectedDomain.toLowerCase();
        return dom.includes(sel) || tit.includes(sel);
      });

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Header */}
        <div className="pb-12 border-b border-[#244638]/12 space-y-4">
          <div className="flex items-center gap-2 text-mono text-xs text-[#A15E40] tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
            SPECIFICATIONS ARCHIVE // WORK
          </div>
          <h1 className="font-serif text-display text-[#244638] font-normal tracking-tight">
            Selected Projects &amp; Systems
          </h1>
          <p className="text-base sm:text-lg text-[#686B61] max-w-2xl font-normal leading-relaxed">
            Autonomous engineering platforms, computer vision architectures, and distributed systems developed and maintained by the collective.
          </p>
        </div>

        {/* Filter Bar (Only show if multiple domains exist) */}
        {availableDomains.length > 2 && (
          <div className="py-6 flex flex-wrap items-center gap-2 border-b border-[#244638]/12">
            <span className="text-mono text-[10px] text-[#686B61] mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#A15E40]" />
              FILTER:
            </span>
            {availableDomains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`text-xs px-3 py-1.5 rounded transition-all font-medium ${
                  selectedDomain === dom
                    ? 'bg-[#244638] text-[#F5F0E8] shadow-sm'
                    : 'bg-[#FFFCF7] text-[#686B61] hover:text-[#252922] border border-[#244638]/12'
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center space-y-3">
            <div className="inline-block w-6 h-6 border-2 border-[#244638] border-t-transparent rounded-full animate-spin" />
            <p className="text-mono text-xs text-[#686B61]">LOADING REPOSITORY SPECIFICATIONS...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && filtered.length === 0 && (
          <div className="py-20 my-10 bg-[#FFFCF7] border border-[#244638]/15 rounded-xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4 shadow-soft">
            <FolderGit2 className="w-10 h-10 text-[#244638] mx-auto" />
            <h3 className="font-serif text-2xl text-[#244638]">
              No Projects Published
            </h3>
            <p className="text-sm text-[#686B61] leading-relaxed">
              {projects.length === 0
                ? "No project specifications are currently active in the database. When projects are registered via the admin portal, they will automatically appear here."
                : "No projects match the selected domain filter."}
            </p>
            {projects.length === 0 && (
              <div className="pt-2">
                <Link
                  to="/admin"
                  className="btn-primary text-xs"
                >
                  <span>Go to Admin Portal</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Projects List */}
        {!loading && filtered.length > 0 && (
          <div className="divide-y divide-[#244638]/10 mt-6">
            {filtered.map((project, idx) => {
              const projectTitle = project.title || project.name;
              const projectNum = project.number || `0${idx + 1}`;
              const techList = Array.isArray(project.techStack)
                ? project.techStack
                : typeof project.technology === 'string'
                ? project.technology.split('/').map(t => t.trim())
                : [];

              return (
                <div
                  key={project.slug || project.id}
                  className="py-10 group grid grid-cols-1 lg:grid-cols-12 gap-8 items-start hover:bg-[#FFFCF7]/70 transition-all rounded-lg p-4 sm:p-6"
                >
                  {/* Left Column: Number & Domain */}
                  <div className="lg:col-span-2 space-y-2">
                    <span className="font-serif text-3xl text-[#A15E40]">{projectNum}</span>
                    <div className="text-mono text-[11px] text-[#686B61] tracking-wider">
                      {project.domain || 'SYSTEMS'}
                    </div>
                    <div>
                      <span className="text-[10px] text-mono px-2 py-0.5 rounded bg-[#FFFCF7] border border-[#244638]/15 text-[#244638]">
                        {project.status || 'DEPLOYED'}
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Title & Description */}
                  <div className="lg:col-span-6 space-y-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="font-serif text-3xl sm:text-4xl text-[#244638] hover:text-[#A15E40] tracking-tight transition-colors inline-block"
                    >
                      {projectTitle}
                    </Link>
                    <p className="text-sm sm:text-base text-[#686B61] leading-relaxed max-w-xl">
                      {project.shortDescription}
                    </p>
                    {techList.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {techList.map((t) => (
                          <span
                            key={t}
                            className="text-mono text-[10px] px-2 py-0.5 rounded bg-[#E6DFD3]/60 border border-[#244638]/10 text-[#252922]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Preview Thumbnail & Links */}
                  <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-4">
                    {project.previewImage && (
                      <Link
                        to={`/projects/${project.slug}`}
                        className="w-full max-w-[280px] aspect-[16/10] rounded-lg overflow-hidden border border-[#244638]/15 bg-[#E6DFD3] block shadow-soft group-hover:border-[#244638]/30 transition-all"
                      >
                        <img
                          src={project.previewImage}
                          alt={projectTitle}
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </Link>
                    )}

                    <div className="flex items-center gap-3 pt-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-md border border-[#244638]/15 bg-[#FFFCF7] text-[#244638] hover:border-[#244638] transition-colors"
                          title="View GitHub Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-md border border-[#244638]/15 bg-[#FFFCF7] text-[#244638] hover:border-[#244638] transition-colors"
                          title="View Live Platform"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        to={`/projects/${project.slug}`}
                        className="btn-primary text-xs py-2 px-3.5"
                      >
                        <span>Specification</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default ProjectsPage;
