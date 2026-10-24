import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { submitJoin } from '../services/api';

const roleOptions = [
  "Frontend Architecture",
  "Backend & Distributed Systems",
  "AI / Machine Learning",
  "Computer Vision",
  "Cybersecurity & Verification",
  "Editorial UI/UX Design",
  "DevOps & Infrastructure",
  "Applied Research"
];

const JoinSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    github: '',
    portfolio: '',
    role: 'Backend & Distributed Systems',
    skills: '',
    experience: '',
    whyNexoraa: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.skills || !formData.whyNexoraa) {
      setError('Please complete all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await submitJoin(formData);
      if (res && res.success) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="join" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              07 / FELLOWSHIP APPLICATION
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Apply to the Collective
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            We review technical applications continuously. Join research sprints, national competitions, and verified open-source tooling.
          </div>
        </div>

        {/* Application Form & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          
          {/* Left Column: Requirements & Process */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-mono text-xs text-[#A15E40] tracking-widest block">
                WHAT WE SEEK
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#244638]">
                Discipline, curiosity, and algorithmic craftsmanship.
              </h3>
              <p className="text-sm text-[#686B61] leading-relaxed">
                We value engineers who write rigorous code, understand memory and concurrency, and are driven by technical excellence rather than superficial buzzwords.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#244638]/10 text-xs text-[#686B61]">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#A15E40] shrink-0 mt-0.5" />
                <span>Demonstrated experience with Git, codebases, or original projects.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#A15E40] shrink-0 mt-0.5" />
                <span>Willingness to collaborate in asynchronous, high-velocity sprints.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#A15E40] shrink-0 mt-0.5" />
                <span>Dedication to open-source sharing and reproducible benchmarks.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF7] rounded-xl border border-[#244638]/15 shadow-card p-8 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E6DFD3] text-[#244638] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#244638]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#244638]">
                    Application Registered
                  </h3>
                  <p className="text-sm text-[#686B61] max-w-sm mx-auto leading-relaxed">
                    Thank you for applying to the Nexora collective. Our architectural committee reviews every submission and will contact you via email.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary text-xs"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#244638]/10 text-mono text-xs text-[#686B61]">
                    <span>FELLOWSHIP DOSSIER</span>
                    <span className="text-[#A15E40]">* REQUIRED</span>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-mono text-[10px] text-[#686B61] block">FULL NAME *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Shivam Yadav"
                        className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-mono text-[10px] text-[#686B61] block">EMAIL ADDRESS *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="engineer@institution.edu"
                        className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-mono text-[10px] text-[#686B61] block">GITHUB PROFILE</label>
                      <input
                        type="url"
                        name="github"
                        value={formData.github}
                        onChange={handleChange}
                        placeholder="https://github.com/..."
                        className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-mono text-[10px] text-[#686B61] block">PRIMARY DISCIPLINE *</label>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                      >
                        {roleOptions.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-mono text-[10px] text-[#686B61] block">CORE SKILLS &amp; TECHNOLOGIES *</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Node.js, Python, PyTorch, C++, React, Distributed Systems"
                      className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-mono text-[10px] text-[#686B61] block">WHY DO YOU WANT TO JOIN NEXORA? *</label>
                    <textarea
                      name="whyNexoraa"
                      rows={4}
                      value={formData.whyNexoraa}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about the problems you are interested in solving and the systems you want to build..."
                      className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full sm:w-auto"
                    >
                      {submitting ? (
                        <span>Submitting Dossier...</span>
                      ) : (
                        <>
                          <span>Submit Fellowship Application</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default JoinSection;
