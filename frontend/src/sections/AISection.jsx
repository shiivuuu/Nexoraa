import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CornerDownLeft, MessageSquareQuote } from 'lucide-react';
import { askAI } from '../services/api';

const suggestedPrompts = [
  "What is Nexora Collective?",
  "What engineering disciplines do you focus on?",
  "Who is the lead architect?",
  "What research tracks are currently active?",
  "How can an engineer join the fellowship?",
  "What is your approach to system architecture?"
];

const AISection = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (textToAsk) => {
    const question = textToAsk || query;
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await askAI(question);
      if (res.success && res.data) {
        setResponse({
          question,
          answer: res.data.answer,
          category: res.data.category || 'ASSISTANT',
          confidence: res.data.confidence || 0.95,
          pageReference: res.data.pageReference
        });
      } else {
        setResponse({
          question,
          answer: "The collective's neural uplink processed your inquiry. For specific technical collaborations or research questions, please contact the engineering team directly.",
          category: 'COLLECTIVE',
          confidence: 0.9
        });
      }
    } catch (err) {
      setResponse({
        question,
        answer: "Nexora is an independent technology collective and research lab founded by Shivam Upendra Yadav, dedicated to AI architectures, distributed systems, and edge computer vision. We build verified software from first principles.",
        category: 'COLLECTIVE',
        confidence: 0.9
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="relative py-24 sm:py-32 bg-[#E6DFD3] text-[#252922] border-t border-[#244638]/12">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#244638]/12">
          <div>
            <div className="flex items-center gap-2 mb-3 text-mono text-xs text-[#A15E40] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A15E40]" />
              03 / NEURAL INTERFACE
            </div>
            <h2 className="font-serif text-title text-[#244638] font-normal leading-none tracking-tight">
              Interactive Systems Assistant
            </h2>
          </div>
          <div className="text-sm text-[#686B61] max-w-sm leading-relaxed">
            Inquire directly regarding Nexora's research initiatives, architectural paradigms, operational team structure, and fellowship opportunities.
          </div>
        </div>

        {/* Terminal Card */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#FFFCF7] rounded-xl p-6 sm:p-10 border border-[#244638]/15 shadow-card space-y-6">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#244638]/10 text-mono text-[11px] text-[#686B61]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#A15E40]" />
              <span className="text-[#244638] font-semibold">NEXORA TELEMETRY ASSISTANT</span>
            </div>
            <span className="text-[#A15E40]">INDEXED // V1.0</span>
          </div>

          {/* Form Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAsk();
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about our architecture, team, or research..."
                className="w-full bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-lg px-4 py-3.5 pr-28 text-sm text-[#252922] focus:outline-none placeholder:text-[#686B61]/60 transition-colors"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 px-4 bg-[#244638] hover:bg-[#1B362B] disabled:opacity-50 text-[#F5F0E8] rounded-md text-xs font-medium flex items-center gap-1.5 transition-all"
              >
                {loading ? (
                  <span className="inline-block w-3.5 h-3.5 border-2 border-[#F5F0E8] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Submit</span>
                    <Send className="w-3 h-3 text-[#A15E40]" />
                  </>
                )}
              </button>
            </div>

            {/* Suggested Prompts */}
            <div className="space-y-2 pt-2">
              <span className="text-mono text-[10px] text-[#686B61]">
                SUGGESTED INQUIRIES:
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setQuery(prompt);
                      handleAsk(prompt);
                    }}
                    className="text-xs px-2.5 py-1 rounded bg-[#F5F0E8] hover:bg-[#E6DFD3] border border-[#244638]/10 text-[#252922] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Response Box */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-[#244638]/10 bg-[#F5F0E8] p-5 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between text-mono text-[10px] text-[#686B61]">
                <div className="flex items-center gap-1.5 text-[#244638] font-semibold">
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#A15E40]" />
                  <span>SYNTHESIZED RESPONSE // {response.category}</span>
                </div>
                <span>CONFIDENCE: {(response.confidence * 100).toFixed(0)}%</span>
              </div>

              <div className="text-xs text-[#A15E40] font-medium text-mono">
                Q: {response.question}
              </div>

              <p className="text-sm text-[#252922] leading-relaxed">
                {response.answer}
              </p>

              {response.pageReference && (
                <div className="pt-2 text-right">
                  <a
                    href={response.pageReference}
                    className="text-xs text-[#244638] hover:text-[#A15E40] font-medium text-mono"
                  >
                    View Documented Reference →
                  </a>
                </div>
              )}
            </motion.div>
          )}

        </div>

      </div>
    </section>
  );
};

export default AISection;
