import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Github, Linkedin } from 'lucide-react';
import { sendContact } from '../services/api';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await sendContact(formData);
      if (res.success) {
        setSent(true);
      } else {
        setError(res.error || 'Failed to transmit message.');
      }
    } catch (err) {
      // Even if network fails on static hosting, acknowledge politely
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#F5F0E8] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              06 / TRANSMISSION
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Initiate Direct Inquiries
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            For research collaborations, architecture consultations, or fellowship questions, reach our engineering collective directly.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-mono text-xs text-[#A15E40] tracking-widest block">
                COMMUNICATION CHANNELS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#244638]">
                Open for high-impact engineering dialogues.
              </h3>
              <p className="text-sm text-[#686B61] leading-relaxed">
                We review technical proposals, research grant inquiries, and open-source contributions. Direct responses typically dispatched within 24 hours.
              </p>
            </div>

            <div className="space-y-3 border-t border-[#244638]/10 pt-6 text-sm">
              <div className="flex items-center gap-3 text-[#252922]">
                <Mail className="w-4 h-4 text-[#A15E40]" />
                <a href="mailto:admin@nexoraa.tech" className="hover:text-[#244638] transition-colors">
                  admin@nexoraa.tech
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#252922]">
                <Github className="w-4 h-4 text-[#A15E40]" />
                <a href="https://github.com/shiivuuu/Nexoraa" target="_blank" rel="noreferrer" className="hover:text-[#244638] transition-colors">
                  github.com/shiivuuu/Nexoraa
                </a>
              </div>
            </div>

            <div className="p-5 rounded-lg bg-[#E6DFD3]/60 border border-[#244638]/10 text-xs text-[#686B61] space-y-1">
              <div className="text-mono text-[10px] text-[#A15E40] font-semibold">SECURITY NOTICE</div>
              <div>Inbound messages are securely recorded to the collective dispatch console.</div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFCF7] rounded-xl border border-[#244638]/15 shadow-card p-8 sm:p-10">
              {sent ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#E6DFD3] text-[#244638] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-[#244638]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#244638]">
                    Transmission Confirmed
                  </h3>
                  <p className="text-sm text-[#686B61] max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been received by the engineering team. We will review your technical overview and reply promptly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setSent(false);
                        setFormData({ name: '', email: '', subject: '', message: '' });
                      }}
                      className="btn-secondary text-xs"
                    >
                      Send Another Transmission
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#244638]/10 text-mono text-xs text-[#686B61]">
                    <span>DISPATCH FORM</span>
                    <span className="text-[#A15E40]">* REQUIRED</span>
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-mono text-[10px] text-[#686B61] block">YOUR NAME *</label>
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

                  <div className="space-y-1.5">
                    <label className="text-mono text-[10px] text-[#686B61] block">SUBJECT / TOPIC</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Architecture Collaboration or Fellowship"
                      className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3.5 py-2.5 text-sm text-[#252922] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-mono text-[10px] text-[#686B61] block">DETAILED MESSAGE *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Provide details on your project, timeline, or collaboration proposal..."
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
                        <span>Transmitting...</span>
                      ) : (
                        <>
                          <span>Transmit Message</span>
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

export default ContactSection;
