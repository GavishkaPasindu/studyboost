'use client';

import { useState } from 'react';
import Link from 'next/link';
import { callGemini, PROMPTS } from '@/lib/gemini';
import { Zap, BookOpen, Target, ClipboardList, Settings2, Sparkles, Trophy, ShieldCheck, Smartphone, Globe, RefreshCw, BadgeDollarSign, Rocket, Check, CheckCircle2, Library, Download, Radio, AlertTriangle, TrendingUp, Star, MessageSquare } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import styles from './HomePage.module.css';

const UNIVERSITIES = ['SLIIT', 'IIT', 'NSBM', 'KDU', 'UoM', 'UoK', 'UoP', 'UoJ', 'OUSL', 'CINEC'];

const FEATURES = [
  {
    icon: <Zap size={28} />,
    badge: 'Most Popular',
    badgeColor: 'badge-purple',
    title: 'AI Note Summariser',
    desc: 'Transform 50 pages of dense lecture notes into a clean, bullet-pointed summary in under 30 seconds. Our AI understands academic language from biology to business law.',
    stats: [{ val: '80%', label: 'Time saved' }, { val: '30s', label: 'Average time' }],
    color: '#818cf8',
  },
  {
    icon: <BookOpen size={28} />, // Added icon for consistency
    badge: 'Study Smart',
    badgeColor: 'badge-sky',
    title: 'Flashcard Generator',
    desc: 'Convert complex topics into bite-sized questions and answers. Perfect for reviewing medicine, engineering or long historical timelines.',
    stats: [{ val: '100+', label: 'Cards/min' }, { val: '2x', label: 'Retention rate' }],
    color: '#60a5fa',
  },
  {
    icon: <Target size={28} />,
    badge: 'Exam Ready',
    badgeColor: 'badge-green',
    title: 'Exam Question Generator',
    desc: 'Generate realistic exam-style questions from your own notes - multiple choice, short answer and analytical. Know exactly where your knowledge gaps are before the exam.',
    stats: [{ val: '92%', label: 'Pass rate boost' }, { val: '4 types', label: 'Question formats' }],
    color: '#34d399',
  },
];

const STEPS = [
  { num: '01', icon: <ClipboardList size={32} strokeWidth={1.5} />, title: 'Paste Your Notes', desc: 'Copy any lecture notes, textbook passages, or study material directly into the AI input.' },
  { num: '02', icon: <Settings2 size={32} strokeWidth={1.5} />, title: 'Choose Your Tool', desc: 'Select from Summariser, Flashcard Generator, or Exam Questions based on what you need to study.' },
  { num: '03', icon: <Sparkles size={32} strokeWidth={1.5} />, title: 'Generate Instantly', desc: 'Our advanced AI analyses your content and generates study material in under 10 seconds.' },
  { num: '04', icon: <Trophy size={32} strokeWidth={1.5} />, title: 'Study & Ace It', desc: 'Use your personalised AI study content to revise with confidence and walk into your exam prepared.' },
];

const getAvatar = (initials: string, color1: string, color2: string) => (
  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${color1}, ${color2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>
    {initials}
  </div>
);

const TESTIMONIALS = [
  {
    avatar: getAvatar('GC', '#818cf8', '#38bdf8'), name: 'Ganusha Chadika', year: 'Software Engineering Support', uni: 'IIT',
    quote: 'I used to spend my entire Sunday making flashcards. Now I paste my lecture slides in on Sunday morning and my cards are done in 2 minutes. I can\'t imagine going back.',
    stars: 5,
  },
  {
    avatar: getAvatar('HA', '#34d399', '#059669'), name: 'Hasala Abilasha', year: 'Computer Science Student', uni: 'IIT',
    quote: 'The exam question generator is incredible. It predicted several key topics that actually came up in my algorithm final. My grades have improved significantly.',
    stars: 5,
  },
  {
    avatar: getAvatar('C', '#fb923c', '#ea580c'), name: 'Chamindu', year: 'Management Information Systems', uni: 'IIT',
    quote: 'Complex business modules have thousands of details to memorise. StudyBoost AI summarises each slide into a structured format. My note quality has improved massively.',
    stars: 5,
  },
];

const MINI_FEATURES = [
  { icon: <ShieldCheck size={28} />, title: 'Zero Data Storage', desc: 'Your notes are never saved on our servers. Your flashcards and summaries are processed in real-time.' },
  { icon: <Smartphone size={28} />, title: 'Any Device', desc: 'Fully responsive: Use our AI flashcard generator and note summariser on your laptop, tablet, or phone.' },
  { icon: <Globe size={28} />, title: 'All Subjects', desc: 'Medicine, Law, Engineering - our AI adapts to any academic subject for summaries and practice exams.' },
  { icon: <RefreshCw size={28} />, title: 'Spaced Repetition', desc: 'Our AI flashcard generator mimics the Leitner system to optimize your long-term memory retention.' },
  { icon: <Zap size={28} />, title: 'Instant Results', desc: 'No waiting. Get AI-generated study content, summaries, and revision cards in under 10 seconds.' },
  { icon: <BadgeDollarSign size={28} />, title: 'Free Access', desc: 'Full access to all AI tools completely free. No hidden barriers. No financial commitment.' },
];

export default function HomePage() {
  useScrollReveal();

  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  async function handleSummarise() {
    if (!notes.trim()) { setError('Please paste some notes first.'); return; }
    setLoading(true); setError(''); setSummary('');
    try {
      const res = await callGemini(PROMPTS.summarize(notes), apiKey);
      setSummary(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.page}>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.blob1} />
          <div className={styles.blob2} />
          <div className={styles.blob3} />
          <div className={styles.grid} />
          <div className={styles.scanline} />
        </div>
        <div className="container">
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <div className={styles.heroBadge} data-reveal>
                <span className={styles.badgeDot} />
                Powered by Advanced Study AI
              </div>
              <h1 className={styles.heroTitle} data-reveal data-delay="100">
                Master <span className="gradient-text-anim">Academic Efficiency</span><br />
                with AI That Actually<br />
                <span className="gradient-text">Synthesizes Your Knowledge</span>
              </h1>
              <p className={styles.heroSub} data-reveal data-delay="200">
                StudyBoost AI transforms complex lecture materials into structured AI summaries, cognitive flashcards, and predictive practice assessments. Trusted by students at top universities worldwide.
              </p>
              <div className={styles.heroCtas} data-reveal data-delay="300">
                <Link href="/ai-tools" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Rocket size={18} /> Use StudyBoost AI Free</Link>
                <Link href="/features" className="btn-ghost">See All Features</Link>
              </div>
              <div className={styles.heroTrust} data-reveal data-delay="400">
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> Free tier available</div>
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> Instant tool access</div>
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> Secure & Private</div>
              </div>
            </div>

            <div className={styles.heroRight} data-reveal="right" data-delay="200">
              <div className={styles.mockupCard}>
                <div className={styles.mockupHeader}>
                  <div className={styles.mockupDots}>
                    <span style={{ background: '#ff5f57' }} />
                    <span style={{ background: '#febc2e' }} />
                    <span style={{ background: '#28c840' }} />
                  </div>
                  <span className={styles.mockupTitle}>StudyBoost AI: Summariser</span>
                </div>
                <div className={styles.mockupBody}>
                  <div className={styles.mockupInput}>
                    <div className={styles.mockupLabel} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ClipboardList size={14} /> Your Notes</div>
                    <div className={styles.mockupText}>
                      &ldquo;Photosynthesis is the process by which plants use sunlight, water and CO₂ to produce glucose...&rdquo;
                    </div>
                  </div>
                  <div className={styles.mockupArrow} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Zap size={14} /> AI Processing...</div>
                  <div className={styles.mockupOutput}>
                    <div className={styles.mockupLabel} style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} /> AI Summary</div>
                    <div className={styles.mockupResult}>
                      <div className={styles.mockupLine}>• Plants convert sunlight → glucose + oxygen</div>
                      <div className={styles.mockupLine}>• Occurs in chloroplasts via chlorophyll</div>
                      <div className={styles.mockupLine}>• Equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</div>
                      <div className={styles.mockupLine}>• Two stages: light reactions + Calvin cycle</div>
                      <div className={styles.mockupCursor} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.floatingBadge1} style={{ top: '10%', right: '-12%' }}>
                <span><Trophy size={16} color="#fbbf24" style={{ display: 'block' }} /></span> Top Rated
              </div>
              <div className={styles.floatingBadge2} style={{ bottom: '15%', left: '-10%' }}>
                <span><CheckCircle2 size={16} color="#34d399" style={{ display: 'block' }} /></span> Student Trusted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── UNIVERSITY TRUST BAR ────────────────────────────────── */}
      <section className={styles.trustBar}>
        <div className="container">
          <p className={styles.trustLabel} data-reveal>Trusted by students studying at</p>
          <div className={styles.uniList} data-reveal data-delay="100">
            {UNIVERSITIES.map((u) => (
              <span key={u} className={styles.uniChip}>{u}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE FEATURES ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center" data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> AI Tools</div>
            <h2 className="section-title">Three Powerful AI Modalities.<br /><span className="gradient-text">One Elite Learning Path.</span></h2>
            <p className="section-subtitle mx-auto">Every tool is engineered for cognitive retention and academic precision, far beyond basic note-taking.</p>
          </div>
          <div className={styles.featGrid}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`glass-card ${styles.featCard}`} data-reveal data-delay={`${i * 150}`}>
                <div className={styles.featTop}>
                  <div className={styles.featIconWrap} style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                    <span className={styles.featIcon}>{f.icon}</span>
                  </div>
                  <span className={f.badgeColor}>{f.badge}</span>
                </div>
                <h3 className={styles.featTitle}>{f.title}</h3>
                <p className={styles.featDesc}>{f.desc}</p>
                <div className={styles.featStats}>
                  {f.stats.map((s) => (
                    <div key={s.label} className={styles.featStat}>
                      <span className={styles.featStatVal} style={{ color: f.color }}>{s.val}</span>
                      <span className={styles.featStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
                <Link href="/ai-tools" className={styles.featLink} style={{ color: f.color }}>
                  Use this AI tool
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────── */}
      <section className={`section ${styles.howSection}`}>
        <div className={styles.howBg} />
        <div className="container">
          <div className="text-center" data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Settings2 size={14} /> Process</div>
            <h2 className="section-title">From Raw Materials to <span className="gradient-text">Academic Mastery</span> in 4 Steps</h2>
            <p className="section-subtitle mx-auto">A seamless workflow designed for immediate application and rapid knowledge internalisation.</p>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.num} className={styles.step} data-reveal data-delay={`${i * 150}`}>
                <div className={styles.stepTop}>
                  <div className={styles.stepNum}>{s.num}</div>
                  {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                </div>
                <div className={styles.stepIconWrap}>{s.icon}</div>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEMO ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center" data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Radio size={14} color="#ef4444" /> Live Demo</div>
            <h2 className="section-title">Try AI Summarisation <span className="gradient-text">Right Now</span></h2>
            <p className="section-subtitle mx-auto">Paste any text below: lecture notes, a paragraph from a textbook, anything. Watch the AI work.</p>
          </div>
          <div className={styles.demoWrap}>
            <div className={styles.demoLeft} data-reveal="left">
              <div className={styles.demoCard}>
                <div className={styles.demoCardHeader} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ClipboardList size={16} /> <span>Paste your lecture notes</span>
                </div>
                <textarea
                  className={`input-field ${styles.demoTextarea}`}
                  placeholder="Copy and paste any lecture notes, textbook extract, or study material here..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={10}
                />
                {error && <div className={styles.errorMsg} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={16} /> {error}</div>}
                <button className={`btn-primary ${styles.demoBtn}`} onClick={handleSummarise} disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {loading ? <><span className="spinner" /> Generating...</> : <><Zap size={18} /> Generate AI Summary</>}
                </button>
                {!apiKey && (
                  <p className={styles.keyNote} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> API key not set: <Link href="/contact">contact us</Link> or add key to .env.local</p>
                )}
              </div>
            </div>

            <div className={styles.demoRight} data-reveal="right">
              <div className={styles.outputCard}>
                <div className={styles.outputHeader}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#34d399" /> AI Summary Output</span>
                  <span className={styles.outputBadge}>AI Analysis</span>
                </div>
                {summary ? (
                  <div className={`output-box ${styles.outputContent}`}>{summary}</div>
                ) : (
                  <div className={styles.outputPlaceholder}>
                    <div className={styles.placeholderIcon}>
                      <Zap size={48} strokeWidth={1} />
                    </div>
                    <p>Your AI-generated summary will appear here. It will be structured with <strong className={styles.glowText}>bullet points</strong>, <strong className={styles.glowText}>key definitions</strong>, and <strong className={styles.glowText}>main concepts</strong> clearly separated.</p>
                    <div className={styles.placeholderLines}>
                      <div className={styles.fakeLine} style={{ width: '85%' }} />
                      <div className={styles.fakeLine} style={{ width: '70%' }} />
                      <div className={styles.fakeLine} style={{ width: '90%' }} />
                      <div className={styles.fakeLine} style={{ width: '60%' }} />
                    </div>
                  </div>
                )}
              </div>
              <Link href="/ai-tools" className={styles.demoMoreLink}>
                Use the StudyBoost AI Flashcard Generator and Exam Question Generator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MINI FEATURES GRID ──────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className="text-center" data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> Everything Included</div>
            <h2 className="section-title">Built for Serious <span className="gradient-text">Student Success</span></h2>
          </div>
          <div className="grid-3" style={{ marginTop: '48px' }}>
            {MINI_FEATURES.map((f, i) => (
              <div key={f.title} className={`glass-card ${styles.miniCard}`} data-reveal data-delay={`${i * 100}`}>
                <span className={styles.miniIcon}>{f.icon}</span>
                <h3 className={styles.miniTitle}>{f.title}</h3>
                <p className={styles.miniDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ───────────────────────────────────────────── */}
      <section className={styles.statsSection}>
        <div className="container">
          <div className={styles.statsGrid} data-reveal>
            {[
              { val: '1,000+', label: 'Active Students', icon: <Trophy size={24} /> },
              { val: '10,000+', label: 'AI Summaries Created', icon: <Zap size={24} /> },
              { val: 'Ace', label: 'Your Exam Goals', icon: <TrendingUp size={24} /> },
              { val: 'High', label: 'Student Satisfaction', icon: <Star size={24} fill="currentColor" /> },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statIcon}>{s.icon}</span>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center" data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={14} /> Student Reviews</div>
            <h2 className="section-title">Real Students. <span className="gradient-text">Real Results.</span></h2>
            <p className="section-subtitle mx-auto">Don&apos;t take our word for it. See what students at top universities are saying.</p>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className={`glass-card ${styles.testimonialCard}`} data-reveal data-delay={`${i * 150}`}>
                <div className={styles.stars} style={{ display: 'flex', gap: '2px', color: '#fbbf24' }}>
                  {Array(t.stars).fill(0).map((_, i) => <Star key={i} size={16} fill="currentColor" stroke="none" />)}
                </div>
                <p className={styles.tQuote}>&ldquo;{t.quote}&rdquo;</p>
                <div className={styles.tAuthor}>
                  <div className={styles.tAvatar}>{t.avatar}</div>
                  <div>
                    <div className={styles.tName}>{t.name}</div>
                    <div className={styles.tInfo}>{t.year}</div>
                    <div className={styles.tUni}>{t.uni}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT EXPLAINER / SEO CONTENT ─────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }} data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> How Our AI Tools Work</div>
            <h2 className="section-title">Three Powerful Tools. <span className="gradient-text">One Smart Workflow.</span></h2>
            <p className="section-subtitle mx-auto">
              StudyBoost AI gives every student access to a professional-grade <strong>AI note summariser</strong>, an intelligent <strong>flashcard generator</strong>, and a predictive <strong>exam question generator</strong>. All in one place.
            </p>
          </div>

          <div className="grid-3" style={{ gap: '32px', marginBottom: '64px' }}>
            {/* Card 1: Note Summariser */}
            <div className={`glass-card`} style={{ padding: '32px' }} data-reveal>
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📝</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}>AI Note Summariser</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '16px' }}>
                Our <strong>AI note summariser</strong> compresses hours of lecture content into structured, bullet-pointed summaries in seconds. Paste any set of lecture notes and the summariser extracts key definitions, formulas, and concepts while removing all filler text.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Works on any lecture notes or textbook chapter</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Structured summaries with headings &amp; bullets</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Reduces 50-page notes to a 5-minute read</li>
              </ul>
            </div>

            {/* Card 2: Flashcard Generator */}
            <div className={`glass-card`} style={{ padding: '32px' }} data-reveal data-delay="100">
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🃏</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}>AI Flashcard Generator</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '16px' }}>
                Our <strong>AI flashcard generator</strong> automatically converts your study notes into question-and-answer revision cards. Each AI study flashcard targets a single key concept, making them perfect for spaced repetition and active recall revision sessions.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Auto-generates Q&amp;A study flashcards from notes</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Ideal for medical, law, and engineering subjects</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Spaced-repetition-ready revision decks</li>
              </ul>
            </div>

            {/* Card 3: Exam Question Generator */}
            <div className={`glass-card`} style={{ padding: '32px' }} data-reveal data-delay="200">
              <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📋</div>
              <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}>Exam Question Generator</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.7', marginBottom: '16px' }}>
                Our <strong>exam question generator</strong> creates realistic practice exam questions directly from your uploaded study notes. Unlike generic question banks, each AI-generated exam question is tailored to your exact lecture content, helping you study smarter.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Multiple choice, short answer &amp; analytical questions</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Tailored to your specific study material</li>
                <li style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: 'var(--text-2)' }}><CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} /> Identifies knowledge gaps before the real exam</li>
              </ul>
            </div>
          </div>

          {/* FAQ Block */}
          <div className="text-center" style={{ marginBottom: '40px' }} data-reveal>
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><MessageSquare size={14} /> Quick Answers</div>
            <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '760px', margin: '0 auto' }} data-reveal>
            {[
              {
                q: 'How does the AI note summariser work?',
                a: 'Our AI note summariser uses large language model technology to analyse the semantic structure of your lecture notes. It identifies key themes, important definitions, and critical formulas, then produces a clean, hierarchical summary. It typically condenses notes by 80 to 90%.',
              },
              {
                q: 'Can the flashcard generator handle technical subjects?',
                a: 'Yes. Our AI flashcard generator is designed to handle complex academic content including medicine, law, engineering, computer science, and economics. The AI extracts technical terminology and creates accurate Q&A study flashcards even for highly specialised lecture notes.',
              },
              {
                q: 'How is the exam question generator better than a generic question bank?',
                a: 'Generic question banks offer pre-written questions unrelated to your specific lecture content. Our exam question generator analyses your own study notes and creates targeted practice exam questions based directly on what you have studied, so every question is relevant to your upcoming test.',
              },
              {
                q: 'Are my summarised notes stored on your servers?',
                a: 'No. Our note summariser processes your lecture notes in real-time and never stores them on our servers. Once your AI summary, revision flashcards, or practice exam questions are generated, your input is cleared. Your academic data remains completely private.',
              },
            ].map((item) => (
              <div key={item.q} className="glass-card" style={{ padding: '24px 28px' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>{item.q}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.75' }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── FINAL CTA ───────────────────────────────────────────── */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaBox} data-reveal>
            <div className={styles.ctaGlow} />
            <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Rocket size={14} /> Get Started</div>
            <h2 className={styles.ctaTitle}>
              Your Next Exam. <span className="gradient-text">Your Best Result.</span>
            </h2>
            <p className={styles.ctaSub}>
              Join thousands of students already using our AI flashcard generator and note summarization tools to study smarter. Complete academic mastery is one click away.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/ai-tools" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Rocket size={18} /> Access AI Tools Free</Link>
              <Link href="/pricing" className="btn-ghost">Access Plans →</Link>
            </div>
            <p className={styles.ctaNote}>Free tier • Instant access • Professional Academic AI</p>
          </div>
        </div>
      </section>

    </main >
  );
}
