import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, FolderGit2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchProjectsData = async () => {
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

    fetchProjectsData();
    return () => { isMounted = false; };
  }, []);

  const activeProject = projects[hoveredIndex] || projects[0];

  return (
    <section id="projects" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              01 / SELECTED WORK
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Case Studies &amp; Architectures
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            Systems designed and deployed by the collective. Each case study documents verified benchmarks, production stacks, and architectural decisions.
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center space-y-3">
            <div className="inline-block w-6 h-6 border-2 border-[#244638] border-t-transparent rounded-full animate-spin" />
            <p className="text-mono text-xs text-[#686B61] tracking-wider">RETRIEVING PRODUCTION SPECIFICATIONS...</p>
          </div>
        )}

        {/* Empty State: ONLY shown when zero projects added via admin */}
        {!loading && projects.length === 0 && (
          <div className="py-20 my-8 bg-[#FFFCF7] border border-[#244638]/15 rounded-xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-4 shadow-soft">
            <div className="w-12 h-12 rounded-full bg-[#E6DFD3] flex items-center justify-center mx-auto text-[#244638]">
              <FolderGit2 className="w-6 h-6 text-[#244638]" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#244638]">
              Project Archive // Standby
            </h3>
            <p className="text-sm text-[#686B61] leading-relaxed">
              No project specifications are currently published. Case studies will be presented dynamically as they are approved and deployed via the engineering administration portal.
            </p>
            <div className="pt-2">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#A15E40] hover:text-[#874E34] text-mono tracking-wider"
              >
                <span>OPEN ADMIN PORTAL TO PUBLISH A PROJECT</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}

        {/* Active Projects Editorial Grid */}
        {!loading && projects.length > 0 && (
          <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* LEFT: Editorial Rows (7 cols) */}
            <div className="lg:col-span-7 divide-y divide-[#244638]/10">
              {projects.map((project, idx) => {
                const isHovered = (projects[hoveredIndex]?.slug || projects[0]?.slug) === project.slug;
                const projectNum = project.number || `0${idx + 1}`;
                const projectTitle = project.title || project.name;
                const techList = Array.isArray(project.techStack)
                  ? project.techStack
                  : typeof project.technology === 'string'
                  ? project.technology.split('/').map(t => t.trim())
                  : ['Full Stack'];

                return (
                  <div
                    key={project.slug || project.id}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    className={`group relative py-8 transition-all duration-200 ${
                      isHovered ? 'pl-4' : 'pl-0'
                    }`}
                  >
                    {/* Left Copper Accent Bar */}
                    <span
                      className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#A15E40] transition-opacity duration-200 ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                      <div className="flex items-baseline gap-4 sm:gap-6">
                        <span className={`text-mono text-sm font-semibold ${
                          isHovered ? 'text-[#A15E40]' : 'text-[#686B61]'
                        }`}>
                          {projectNum}
                        </span>

                        <div>
                          <Link
                            to={`/projects/${project.slug}`}
                            className="font-serif text-3xl sm:text-4xl text-[#244638] hover:text-[#A15E40] tracking-tight transition-colors inline-block"
                          >
                            {projectTitle}
                          </Link>
                          <div className="text-mono text-[10px] text-[#A15E40] tracking-wider mt-1">
                            {project.domain || 'SYSTEMS ARCHITECTURE'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-start sm:self-auto">
                        <span className="text-[10px] text-mono px-2.5 py-1 rounded bg-[#FFFCF7] border border-[#244638]/12 text-[#244638]">
                          {project.status || 'DEPLOYED'}
                        </span>
                        <Link
                          to={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-[#244638] font-medium hover:text-[#A15E40] transition-colors"
                        >
                          <span className="hidden sm:inline">SPEC</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>

                    <div className="mt-3.5 sm:ml-12 sm:pl-2 space-y-3">
                      <p className="text-sm text-[#686B61] leading-relaxed max-w-xl font-normal">
                        {project.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {techList.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="text-mono text-[10px] px-2 py-0.5 rounded bg-[#FFFCF7] border border-[#244638]/10 text-[#686B61]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: Curated Editorial Case Preview (5 cols) */}
            {activeProject && (
              <div className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-[#FFFCF7] rounded-xl p-6 sm:p-7 border border-[#244638]/15 shadow-card space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#244638]/10 text-mono text-[10px] text-[#686B61]">
                    <span>PROJECT CASE TELEMETRY</span>
                    <span className="text-[#A15E40] font-semibold">
                      VERIFIED SPECIFICATION
                    </span>
                  </div>

                  {/* Case Study Image or Visual Card */}
                  <div className="relative rounded-lg overflow-hidden border border-[#244638]/12 bg-[#E6DFD3] aspect-[16/10] flex items-center justify-center">
                    {activeProject.previewImage ? (
                      <img
                        src={activeProject.previewImage}
                        alt={activeProject.title || activeProject.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#244638]/70 via-transparent to-transparent flex items-end p-5">
                      <div className="text-white">
                        <span className="text-mono text-[10px] text-[#F5F0E8]/80 block">
                          {activeProject.domain}
                        </span>
                        <span className="font-serif text-2xl text-white font-normal">
                          {activeProject.title || activeProject.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Case Study Meta & Links */}
                  <div className="space-y-3">
                    <p className="text-xs sm:text-sm text-[#686B61] leading-relaxed">
                      {activeProject.shortDescription}
                    </p>

                    <div className="pt-3 border-t border-[#244638]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        {activeProject.githubUrl && (
                          <a
                            href={activeProject.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#244638] hover:text-[#A15E40] transition-colors"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span className="text-mono text-[11px]">Source</span>
                          </a>
                        )}
                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#244638] hover:text-[#A15E40] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span className="text-mono text-[11px]">Live Preview</span>
                          </a>
                        )}
                      </div>

                      <Link
                        to={`/projects/${activeProject.slug}`}
                        className="inline-flex items-center gap-1 font-medium text-[#244638] hover:text-[#A15E40] text-xs transition-colors"
                      >
                        <span>Full Specification</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Section Footer: Link to All Projects */}
        <div className="pt-14 border-t border-[#244638]/12 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#244638] hover:text-[#A15E40] transition-colors group"
          >
            <span>View All Engineering Projects &amp; Specifications</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-mono text-[11px] text-[#686B61]">
            SHOWING ARCHIVED REPOSITORIES &amp; PLATFORMS
          </span>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
