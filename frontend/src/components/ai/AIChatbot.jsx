import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquare } from 'lucide-react';
import { askAI } from '../../services/api';

const initialMessages = [
  {
    sender: 'ai',
    text: "Welcome to the Nexora interface. I can answer inquiries regarding our research tracks, systems architecture, team structure, and fellowship opportunities. How may I assist you?",
    timestamp: "NOW"
  }
];

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput('');

    const newMsg = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setLoading(true);

    try {
      const res = await askAI(userText);
      if (res.success && res.data) {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: res.data.answer,
            category: res.data.category,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: "Thank you for your question. You can explore our documented specifications under the Work section or contact our collective directly via the contact form.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Nexora is an independent technology collective and research lab founded by Shivam Upendra Yadav, dedicated to AI architectures, distributed systems, and verified software architectures.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-3 bg-[#244638] hover:bg-[#1B362B] text-[#F5F0E8] rounded-full shadow-elevated border border-[#244638]/20 transition-all group"
            aria-label="Open AI Assistant"
          >
            <span className="w-2 h-2 rounded-full bg-[#A15E40] group-hover:scale-110 transition-transform" />
            <MessageSquare className="w-4 h-4 text-[#F5F0E8]" />
            <span className="text-xs font-medium tracking-wide">Assistant</span>
          </button>
        )}
      </div>

      {/* Chat Overlay Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] max-h-[560px] h-[85vh] bg-[#FFFCF7] border border-[#244638]/15 rounded-xl shadow-elevated flex flex-col overflow-hidden text-[#252922]"
          >
            {/* Header */}
            <div className="p-4 bg-[#244638] text-[#F5F0E8] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#A15E40]" />
                <span className="font-serif text-lg tracking-normal">Nexora Assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-white/10 text-[#F5F0E8] transition-colors"
                aria-label="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F5F0E8]/40 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#244638] text-[#F5F0E8]'
                        : 'bg-[#FFFCF7] border border-[#244638]/12 text-[#252922] shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-[#686B61] mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-1.5 text-xs text-[#686B61] p-2 bg-[#FFFCF7] rounded border border-[#244638]/10 w-fit">
                  <span className="inline-block w-3 h-3 border-2 border-[#244638] border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-[#244638]/10 bg-[#FFFCF7] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about research or team..."
                className="flex-1 bg-[#F5F0E8] border border-[#244638]/15 focus:border-[#244638] rounded-md px-3 py-2 text-xs text-[#252922] focus:outline-none placeholder:text-[#686B61]/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="p-2 bg-[#244638] hover:bg-[#1B362B] disabled:opacity-50 text-[#F5F0E8] rounded-md transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
