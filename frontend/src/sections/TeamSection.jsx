import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTeam } from '../services/api';

const defaultMember = {
  num: "01",
  name: "Shivam Upendra Yadav",
  role: "FOUNDER / LEAD ARCHITECT",
  bio: "Core software engineer and full stack architect. Skilled in Java, C++, Python, JavaScript, and distributed engineering. Leading Nexora's AI research, distributed system architectures, and autonomous platform engineering.",
  skills: ["Full Stack Systems", "Core Java", "Python", "DSA & Algorithms", "System Architecture", "AI Automation"],
  github: "https://github.com/shiivuuu",
  linkedin: "https://linkedin.com/in/shivam-yadav",
  portfolio: "https://github.com/shiivuuu"
};

const TeamSection = () => {
  const [member, setMember] = useState(defaultMember);

  useEffect(() => {
    let isMounted = true;
    const fetchTeam = async () => {
      try {
        const res = await getTeam();
        if (isMounted && res && res.success && res.data && res.data.length > 0) {
          const lead = res.data[0];
          setMember({
            num: "01",
            name: lead.name,
            role: lead.role,
            bio: lead.bio,
            skills: Array.isArray(lead.skills) ? lead.skills : ['Architecture', 'Full Stack'],
            github: lead.githubUrl || defaultMember.github,
            linkedin: lead.linkedinUrl || defaultMember.linkedin,
            portfolio: lead.portfolioUrl || defaultMember.portfolio
          });
        }
      } catch (err) {
        // Retain defaultMember
      }
    };
    fetchTeam();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="team" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              04 / LEADERSHIP
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Architectural Leadership
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            Leading the core systems architecture, foundational AI systems, and engineering standards at Nexora.
          </div>
        </div>

        {/* Member Editorial Card */}
        <div className="mt-12 bg-[#FFFCF7] rounded-xl border border-[#244638]/15 shadow-card p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 4 Cols: Index & Title */}
            <div className="lg:col-span-4 space-y-3">
              <span className="font-serif text-4xl text-[#A15E40]">01</span>
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#244638] font-normal">
                  {member.name}
                </h3>
                <div className="text-mono text-xs text-[#A15E40] tracking-wider mt-1.5">
                  {member.role}
                </div>
              </div>
              <div className="pt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#244638]" />
                <span className="text-mono text-[11px] text-[#686B61]">FOUNDING MEMBER</span>
              </div>
            </div>

            {/* Middle 5 Cols: Biography & Focus */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-sm sm:text-base text-[#686B61] leading-relaxed">
                {member.bio}
              </p>
              <div className="pt-2">
                <div className="text-mono text-[10px] text-[#A15E40] tracking-widest mb-2">
                  DISCIPLINES &amp; COMPETENCIES:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map(s => (
                    <span
                      key={s}
                      className="text-mono text-[10px] px-2.5 py-1 rounded bg-[#F5F0E8] border border-[#244638]/10 text-[#252922]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 3 Cols: Links & Profiles */}
            <div className="lg:col-span-3 flex lg:flex-col flex-wrap gap-2.5 justify-start lg:justify-center">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between p-3 rounded-lg border border-[#244638]/12 bg-[#F5F0E8] hover:border-[#244638] text-xs font-medium text-[#244638] transition-colors w-full"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-[#A15E40]" />
                    <span>GitHub Profile</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between p-3 rounded-lg border border-[#244638]/12 bg-[#F5F0E8] hover:border-[#244638] text-xs font-medium text-[#244638] transition-colors w-full"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-[#A15E40]" />
                    <span>LinkedIn Network</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Section Footer: Fellowship link */}
        <div className="pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#244638] hover:text-[#A15E40] transition-colors"
          >
            <span>View Complete Collective Directory</span>
            <span>→</span>
          </Link>
          <Link
            to="/join"
            className="text-mono text-xs text-[#A15E40] hover:underline"
          >
            APPLY TO JOIN THE COLLECTIVE →
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
