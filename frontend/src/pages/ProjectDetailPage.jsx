import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, Cpu, CheckCircle2, Layers, AlertCircle, FolderGit2 } from 'lucide-react';
import { getProjectBySlug, getProjects } from '../services/api';

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await getProjectBySlug(slug);
        if (isMounted && res && res.success && res.data) {
          setProject(res.data);
          // Fetch related projects
          const allRes = await getProjects();
          if (isMounted && allRes && allRes.data) {
            setRelated(allRes.data.filter(p => p.slug !== slug).slice(0, 2));
          }
        } else {
          if (isMounted) setError('Project specification not found in current registry.');
        }
      } catch (err) {
        if (isMounted) setError('Error retrieving project specification.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
    return () => { isMounted = false; };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-36 pb-24 bg-[#F5F0E8] flex flex-col items-center justify-center gap-3 text-center">
        <div className="inline-block w-6 h-6 border-2 border-[#244638] border-t-transparent rounded-full animate-spin" />
        <span className="text-mono text-xs text-[#686B61] tracking-wider">
          LOADING ARCHITECTURAL SPECIFICATION...
        </span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen pt-36 pb-24 max-w-xl mx-auto px-6 text-center space-y-5 bg-[#F5F0E8] text-[#252922]">
        <FolderGit2 className="w-10 h-10 text-[#A15E40] mx-auto" />
        <div className="text-mono text-xs text-[#A15E40]">ERROR // NOT FOUND</div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#244638]">
          Specification Not Located
        </h1>
        <p className="text-[#686B61] text-sm leading-relaxed">{error}</p>
        <div className="pt-2">
          <Link to="/projects" className="btn-primary text-xs">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to All Work</span>
          </Link>
        </div>
      </div>
    );
  }

  const projectTitle = project.title || project.name;
  const techList = Array.isArray(project.techStack)
    ? project.techStack
    : typeof project.technology === 'string'
    ? project.technology.split('/').map(t => t.trim())
    : [];

  return (
    <div className="min-h-screen pt-32 sm:pt-36 pb-24 bg-[#F5F0E8] text-[#252922]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Navigation Breadcrumb */}
        <div className="pb-8 border-b border-[#244638]/12 flex items-center justify-between text-xs text-[#686B61]">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 hover:text-[#244638] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-[#A15E40]" />
            <span>RETURN TO WORK</span>
          </Link>
          <div className="flex items-center gap-3 text-mono text-[11px]">
            <span>SPEC // {project.number || '01'}</span>
            <span>•</span>
            <span className="text-[#244638] font-semibold">{project.status || 'ACTIVE'}</span>
          </div>
        </div>

        {/* Hero Section of Project Detail */}
        <div className="py-12 sm:py-16 space-y-6">
          <div className="text-mono text-xs text-[#A15E40] tracking-widest">
            {project.domain || 'SYSTEMS ARCHITECTURE'}
          </div>

          <h1 className="font-serif text-display text-[#244638] tracking-tight font-normal">
            {projectTitle}
          </h1>

          <p className="text-lg sm:text-xl text-[#686B61] max-w-3xl leading-relaxed font-normal">
            {project.shortDescription}
          </p>

          {/* Action Links */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <span>Live Platform</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ArrowUpRight className="w-4 h-4 text-[#A15E40]" />
              </a>
            )}
          </div>
        </div>

        {/* Preview Visual */}
        {project.previewImage && (
          <div className="my-8 rounded-xl overflow-hidden border border-[#244638]/15 bg-[#FFFCF7] shadow-card">
            <img
              src={project.previewImage}
              alt={projectTitle}
              className="w-full h-auto object-cover max-h-[580px]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="p-4 sm:p-5 bg-[#FFFCF7] border-t border-[#244638]/10 flex flex-wrap items-center justify-between gap-3 text-mono text-[11px] text-[#686B61]">
              <div>ARCHITECTURAL TELEMETRY // SYSTEM SPECIFICATION</div>
              <div className="text-[#A15E40]">AUTHENTICATED NEXORA ARTIFACT</div>
            </div>
          </div>
        )}

        {/* Detailed Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-14 border-t border-[#244638]/12">
          
          {/* LEFT: Problem, Solution, Architecture */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Full Synthesis */}
            <div className="space-y-4">
              <div className="text-mono text-xs text-[#A15E40] tracking-widest">
                01 // EXECUTIVE SYNTHESIS
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#244638]">
                System Architecture &amp; Overview
              </h2>
              <p className="text-base sm:text-lg text-[#686B61] leading-relaxed">
                {project.fullDescription || project.shortDescription}
              </p>
            </div>

            {/* Problem & Solution (if specified) */}
            {(project.problem || project.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#244638]/10">
                {project.problem && (
                  <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/12 space-y-3 shadow-soft">
                    <div className="text-mono text-xs text-[#A15E40] font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      PROBLEM IDENTIFICATION
                    </div>
                    <p className="text-sm text-[#686B61] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                )}

                {project.solution && (
                  <div className="bg-[#FFFCF7] p-6 rounded-xl border border-[#244638]/12 space-y-3 shadow-soft">
                    <div className="text-mono text-xs text-[#244638] font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      ENGINEERED SOLUTION
                    </div>
                    <p className="text-sm text-[#686B61] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-[#244638]/10">
                <div className="text-mono text-xs text-[#A15E40] tracking-widest">
                  02 // CAPABILITIES &amp; HIGHLIGHTS
                </div>
                <h2 className="font-serif text-3xl text-[#244638]">
                  Core Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg bg-[#FFFCF7] border border-[#244638]/10 flex items-start gap-3 shadow-soft"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#A15E40] shrink-0 mt-0.5" />
                      <span className="text-sm text-[#252922] leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architecture Details */}
            {project.architecture && (
              <div className="space-y-3 pt-6 border-t border-[#244638]/10">
                <div className="text-mono text-xs text-[#A15E40] tracking-widest">
                  03 // INFRASTRUCTURE
                </div>
                <h2 className="font-serif text-3xl text-[#244638]">
                  Technical Topology
                </h2>
                <p className="text-sm sm:text-base text-[#686B61] leading-relaxed bg-[#FFFCF7] p-5 rounded-lg border border-[#244638]/12">
                  {project.architecture}
                </p>
              </div>
            )}
          </div>

          {/* RIGHT: Tech Stack & Metadata (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#FFFCF7] rounded-xl p-6 border border-[#244638]/15 shadow-card space-y-6">
              <div className="pb-4 border-b border-[#244638]/10 text-mono text-xs text-[#A15E40] tracking-wider">
                SPECIFICATION ATTRIBUTES
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-mono text-[10px] text-[#686B61] block">DOMAIN CLASSIFICATION</span>
                  <span className="font-medium text-[#252922] mt-0.5 block">{project.domain || 'SYSTEMS'}</span>
                </div>

                <div className="pt-3 border-t border-[#244638]/10">
                  <span className="text-mono text-[10px] text-[#686B61] block">CURRENT STATUS</span>
                  <span className="font-medium text-[#244638] mt-0.5 block">{project.status || 'DEPLOYED'}</span>
                </div>

                {techList.length > 0 && (
                  <div className="pt-3 border-t border-[#244638]/10">
                    <span className="text-mono text-[10px] text-[#686B61] block mb-2">TECHNOLOGY STACK</span>
                    <div className="flex flex-wrap gap-1.5">
                      {techList.map(t => (
                        <span
                          key={t}
                          className="text-mono text-[10px] px-2 py-0.5 rounded bg-[#E6DFD3]/60 border border-[#244638]/10 text-[#252922]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Projects */}
            {related.length > 0 && (
              <div className="space-y-3">
                <div className="text-mono text-xs text-[#686B61] tracking-wider">
                  OTHER REPOSITORIES
                </div>
                <div className="space-y-2">
                  {related.map(rel => (
                    <Link
                      key={rel.slug}
                      to={`/projects/${rel.slug}`}
                      className="block p-4 rounded-lg bg-[#FFFCF7] border border-[#244638]/12 hover:border-[#244638] transition-all group shadow-soft"
                    >
                      <div className="text-mono text-[10px] text-[#A15E40]">{rel.domain}</div>
                      <div className="font-serif text-lg text-[#244638] group-hover:text-[#A15E40] transition-colors mt-0.5">
                        {rel.title || rel.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectDetailPage;
