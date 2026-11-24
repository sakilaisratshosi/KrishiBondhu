import { FormEvent, useEffect, useRef, useState } from 'react';
import { Info, MessageSquare, Send, Sprout, User } from 'lucide-react';
import {
  INITIAL_CHAT_MESSAGES,
  SUGGESTED_QUESTIONS,
} from '../data/krishiData';
import { ChatMessage, Language, PageRoute } from '../types/krishi';
import { ExpertSupportCard } from './ExpertSupportCard';
import { SourceQualityNotice } from './SourceQualityNotice';
import { WorkspaceHeader } from './WorkspaceHeader';

interface FarmingAssistantProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (page: PageRoute) => void;
}

export function FarmingAssistant({
  language,
  onToggleLanguage,
  onNavigate,
}: FarmingAssistantProps) {
  const bn = language === 'bn';
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages]);

  const buildLocalSampleReply = (query: string): { bn: string; en: string } => {
    const normalized = query.toLowerCase();

    const matched = SUGGESTED_QUESTIONS.find((q) =>
      q.keywords.some((kw) => normalized.includes(kw.toLowerCase()))
    );

    if (matched) {
      return matched.answer;
    }

    return {
      bn: 'আপনার প্রশ্নের জন্য ধন্যবাদ! এটি একটি অফলাইন প্রোটোটাইপ ডেমো—তাই কেবল পূর্বনির্ধারিত নমুনা কৃষি তথ্য থেকে উত্তর দেওয়া হচ্ছে। নির্দিষ্ট ফসলের রোগ বা সারের মাত্রা জানতে নিচের প্রস্তাবিত প্রশ্নগুলো চেষ্টা করুন অথবা সরকারি কৃষি কল সেন্টার ১৬১২৩ ও উপজেলা কৃষি অফিসে যোগাযোগ করুন।',
      en: 'Thank you for your question! Because this is an offline Round 1 static prototype with no live AI backend, replies are drawn from curated sample knowledge. Try one of the suggested crop topics below or contact 16123 / your local Upazila Agriculture Office for field-specific advice.',
    };
  };

  const appendConversation = (
    promptBn: string,
    promptEn: string,
    reply?: { bn: string; en: string }
  ) => {
    const nowTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'farmer',
      text: { bn: promptBn, en: promptEn },
      timestamp: { bn: nowTime, en: nowTime },
    };

    const resolvedReply = reply || buildLocalSampleReply(promptBn);

    const assistantMessage: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'assistant',
      category: {
        bn: 'নমুনা স্থানীয় উত্তর (অফলাইন ডেমো)',
        en: 'Sample Local Reply (Offline Demo)',
      },
      text: resolvedReply,
      timestamp: { bn: nowTime, en: nowTime },
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    appendConversation(trimmed, trimmed);
    setInputText('');
  };

  const handleResetChat = () => {
    setMessages(INITIAL_CHAT_MESSAGES);
    setInputText('');
  };

  return (
    <div className="bg-[var(--kb-canvas-alt)] min-h-screen">
      <WorkspaceHeader
        breadcrumbLabel={bn ? 'বাংলা কৃষি সহায়ক' : 'Bangla Farming Assistant'}
        title={
          bn
            ? 'বাংলা কৃষি সহায়ক (নমুনা চ্যাট প্রদর্শনী)'
            : 'Bangla Farming Assistant (Sample Chat Demo)'
        }
        subtitle={
          bn
            ? 'প্রস্তাবিত প্রশ্ন নির্বাচন করে বা প্রশ্ন লিখে ধান, আলু, টমেটো ও আবহাওয়া সম্পর্কিত নমুনা পরামর্শ দেখুন।'
            : 'Interact with a local, offline-ready sample chat demonstrating Bangla-first agricultural Q&A.'
        }
        language={language}
        onToggleLanguage={onToggleLanguage}
        onNavigate={onNavigate}
        backRoute="dashboard"
        backLabel={bn ? 'ড্যাশবোর্ড' : 'Dashboard'}
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Offline Demo Disclaimer */}
        <div className="bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[var(--kb-brand-text)] shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--kb-ink)]">
              <strong className="font-semibold">
                {bn
                  ? 'সিমুলেটেড ডেমো সহায়ক — এটি কোনো লাইভ AI সার্ভিস নয়: '
                  : 'Simulated Assistant — Not a live AI service: '}
              </strong>
              <span className="text-[var(--kb-ink-muted)]">
                {bn
                  ? 'সকল উত্তর ব্রাউজারে থাকা পূর্বনির্ধারিত নমুনা কৃষি ডেটা থেকে প্রদর্শিত হয়।'
                  : 'All responses are simulated locally inside your browser using predefined sample guidance.'}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetChat}
            className="px-3.5 py-1.5 text-xs font-semibold text-[var(--kb-brand-text)] bg-[var(--kb-surface)] hover:bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {bn ? 'চ্যাট রিসেট করুন' : 'Reset Chat'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Suggested Questions Panel */}
          <aside className="lg:col-span-4 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--kb-border-subtle)]">
              <MessageSquare className="w-4 h-4 text-[var(--kb-accent)]" />
              <h2 className="text-base font-bold text-[var(--kb-ink)]">
                {bn ? 'প্রস্তাবিত কৃষি প্রশ্ন' : 'Suggested Farming Questions'}
              </h2>
            </div>
            <p className="text-xs text-[var(--kb-ink-muted)]">
              {bn
                ? 'যেকোনো প্রশ্নে ক্লিক করলে চ্যাটে নমুনা উত্তর যুক্ত হবে:'
                : 'Click any question below to add a sample answer to the conversation:'}
            </p>

            <div className="space-y-2.5">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() =>
                    appendConversation(q.prompt.bn, q.prompt.en, q.answer)
                  }
                  className="w-full text-left p-3.5 rounded-lg bg-[var(--kb-surface-muted)] hover:bg-[var(--kb-surface-sage)] border border-[var(--kb-border)] hover:border-[var(--kb-accent)] text-sm font-medium text-[var(--kb-ink)] transition-colors cursor-pointer"
                >
                  {bn ? q.prompt.bn : q.prompt.en}
                </button>
              ))}
            </div>
          </aside>

          {/* Right Chat Window */}
          <section className="lg:col-span-8 bg-[var(--kb-surface)] border border-[var(--kb-border)] rounded-xl flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 bg-[#113520] dark:bg-[#0F2C1B] dark:border-b dark:border-[#1E5133] text-white flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#1E5133] flex items-center justify-center text-[#6EE7B7]">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {bn
                      ? 'কৃষিবন্ধু বাংলা সহায়ক (নমুনা)'
                      : 'KrishiBondhu Assistant (Sample)'}
                  </h2>
                  <p className="text-xs text-[#A7F3D0]">
                    {bn
                      ? 'পূর্বনির্ধারিত কৃষি পরামর্শ ডেমো'
                      : 'Predefined Crop & Weather Guidance Demo'}
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#A7F3D0] tabular-nums">
                {bn ? '১৬১২৩ রেফারেন্স' : 'Helpline: 16123'}
              </span>
            </div>

            {/* Messages Thread */}
            <div
              ref={threadRef}
              className="p-5 sm:p-6 space-y-5 max-h-[520px] overflow-y-auto bg-[var(--kb-canvas)]"
            >
              {messages.map((msg) => {
                const isFarmer = msg.sender === 'farmer';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${
                      isFarmer ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isFarmer
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface)] text-[var(--kb-brand-text)] border-[var(--kb-border)]'
                      }`}
                    >
                      {isFarmer ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Sprout className="w-4 h-4" />
                      )}
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-4 space-y-1.5 border ${
                        isFarmer
                          ? 'bg-[var(--kb-brand)] text-white border-[var(--kb-brand)]'
                          : 'bg-[var(--kb-surface)] text-[var(--kb-ink)] border-[var(--kb-border)]'
                      }`}
                    >
                      {msg.category && !isFarmer && (
                        <p className="text-xs font-semibold text-[var(--kb-accent)]">
                          {bn ? msg.category.bn : msg.category.en}
                        </p>
                      )}
                      <p className="text-sm leading-relaxed">
                        {bn ? msg.text.bn : msg.text.en}
                      </p>
                      <p
                        className={`text-[11px] font-mono tabular-nums ${
                          isFarmer ? 'text-[#A7F3D0]' : 'text-[var(--kb-ink-muted)]'
                        }`}
                      >
                        {bn ? msg.timestamp.bn : msg.timestamp.en}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 sm:p-5 bg-[var(--kb-surface)] border-t border-[var(--kb-border)] flex items-center gap-3"
            >
              <label htmlFor="assistant-input" className="sr-only">
                {bn ? 'আপনার প্রশ্ন লিখুন' : 'Type your farming question'}
              </label>
              <input
                id="assistant-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  bn
                    ? 'ধান, আলু, টমেটো, বৃষ্টি বা স্প্রে নিয়ে প্রশ্ন লিখুন...'
                    : 'Ask about rice, potato, tomato, rain, or spraying...'
                }
                className="flex-1 min-w-0 min-h-[44px] px-4 py-2.5 text-sm bg-[var(--kb-surface-muted)] border border-[var(--kb-border)] rounded-lg text-[var(--kb-ink)] placeholder:text-[var(--kb-ink-muted)]/75"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 text-sm font-semibold text-white bg-[var(--kb-brand)] hover:bg-[var(--kb-brand-hover)] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{bn ? 'পাঠান' : 'Send'}</span>
              </button>
            </form>
          </section>
        </div>

        <ExpertSupportCard language={language} context="assistant" compact />

        <SourceQualityNotice
          language={language}
          verifiedSource={{
            bn: 'কৃষি কল সেন্টার (১৬১২৩), DAE এবং BRRI/BARI প্রচলিত ফসল সুরক্ষা ও সুষম সার ব্যবস্থাপনা নির্দেশিকা।',
            en: 'Common Bangladesh crop hygiene, AWD irrigation, and split-fertilizer practices aligned with DAE and 16123 guidance.',
          }}
          demoScope={{
            bn: 'চ্যাট উত্তরসমূহ ব্রাউজারের পূর্বনির্ধারিত নমুনা প্রশ্নোত্তর ডেটা থেকে প্রদর্শিত হয়—এতে কোনো লাইভ AI মডেল বা ব্যাকএন্ড নেই।',
            en: 'Assistant replies come from curated local sample Q&A data inside the browser—no live LLM or external API is connected.',
          }}
        />
      </div>
    </div>
  );
}
