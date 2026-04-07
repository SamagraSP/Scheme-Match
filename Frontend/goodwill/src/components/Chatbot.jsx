import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';

const initialMessages = [
  {
    role: 'bot',
    text: "Hi there! I'm your SchemeMatch assistant. Ask me about government schemes or eligibility.",
  },
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleOpen = () => {
    setOpen((current) => !current);
    setError('');
  };

  const appendMessage = (role, text) => {
    setMessages((current) => [...current, { role, text }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    appendMessage('user', userMessage);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/chatbot/', { message: userMessage }, { timeout: 5000 });
      const botReply = response?.data?.reply || 'Sorry, I could not fetch a response right now.';
      appendMessage('bot', botReply);
    } catch {
      appendMessage('bot', 'Failed to reach the AI assistant. Please try again later.');
      setError('The chatbot service is currently unavailable.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const lastMessage = useMemo(() => messages[messages.length - 1], [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-[340px] rounded-[32px] border border-slate-200 bg-white/95 shadow-soft shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="rounded-t-[32px] bg-slate-950 px-5 py-4 text-white dark:bg-slate-900">
              <h3 className="text-lg font-semibold">SchemeMatch Chat</h3>
              <p className="mt-1 text-sm text-slate-300">Ask about scheme eligibility, deadlines, and recommendations.</p>
            </div>
            <div className="max-h-80 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-slate-300/50 dark:scrollbar-thumb-slate-700">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-3xl px-4 py-3 ${
                    message.role === 'bot'
                      ? 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100'
                      : 'ml-auto max-w-[80%] bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-950'
                  }`}
                >
                  <p className="text-sm leading-6">{message.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 px-4 py-4 dark:border-slate-800">
              <label className="sr-only" htmlFor="chatbot-input">
                Enter a message
              </label>
              <textarea
                id="chatbot-input"
                rows={2}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="What scheme can I apply for?"
                className="w-full resize-none rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-sky-400 dark:focus:ring-sky-500/20"
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  {loading ? 'Typing…' : 'Send'}
                </button>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {lastMessage?.role === 'bot' ? 'Response ready' : 'Ready to chat'}
                </span>
              </div>
              {error && <p className="mt-3 text-xs text-rose-600 dark:text-rose-300">{error}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleOpen}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-soft shadow-slate-900/30 transition hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
        aria-label="Open chatbot"
      >
        <span className="text-xl font-semibold">💬</span>
      </button>
    </div>
  );
};

export default Chatbot;
