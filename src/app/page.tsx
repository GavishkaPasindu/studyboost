'use client';

import { useState } from 'react';
import Link from 'next/link';
import { callGemini, PROMPTS } from '@/lib/gemini';
import { Zap, BookOpen, Target, ClipboardList, Settings2, Sparkles, Trophy, ShieldCheck, Smartphone, Globe, RefreshCw, BadgeDollarSign, Rocket, Check, CheckCircle2, Library, Download, Radio, AlertTriangle, TrendingUp, Star, MessageSquare } from 'lucide-react';
import useScrollReveal from '@/hooks/useScrollReveal';
import styles from './HomePage.module.css';

const UNIVERSITIES = ['Oxford', 'Cambridge', 'LSE', 'UCL', 'Imperial', 'Edinburgh', 'Manchester', 'Bristol', 'Durham', 'Warwick'];

const FEATURES = [
  {
    icon: <Zap size={28} />,
    badge: 'Most Popular',
    badgeColor: 'badge-purple',
    title: 'AI Note Summariser',
    desc: 'Transform 50 pages of dense lecture notes into a clean, bullet-pointed summary in under 30 seconds. Our AI understands academic language — from biology to business law.',
    stats: [{ val: '80%', label: 'Time saved' }, { val: '30s', label: 'Average time' }],
    color: '#818cf8',
  },
  {
    icon: <BookOpen size={28} />,
    badge: 'Fan Favourite',
    badgeColor: 'badge-sky',
    title: 'Smart Flashcard Generator',
    desc: 'Automatically generate quiz-ready flashcards with questions on one side and detailed answers on the other. Based on spaced-repetition science for maximum retention.',
    stats: [{ val: '3×', label: 'Better retention' }, { val: '5 cards', label: 'In seconds' }],
    color: '#38bdf8',
  },
  {
    icon: <Target size={28} />,
    badge: 'Exam Ready',
    badgeColor: 'badge-green',
    title: 'Exam Question Generator',
    desc: 'Generate realistic exam-style questions from your own notes — multiple choice, short answer and analytical. Know exactly where your knowledge gaps are before the exam.',
    stats: [{ val: '92%', label: 'Pass rate boost' }, { val: '4 types', label: 'Question formats' }],
    color: '#34d399',
  },
];

const STEPS = [
  { num: '01', icon: <ClipboardList size={32} strokeWidth={1.5} />, title: 'Paste Your Notes', desc: 'Copy any lecture notes, textbook passages, or study material directly into the AI input.' },
  { num: '02', icon: <Settings2 size={32} strokeWidth={1.5} />, title: 'Choose Your Tool', desc: 'Select from Summariser, Flashcard Generator, or Exam Questions based on what you need to study.' },
  { num: '03', icon: <Sparkles size={32} strokeWidth={1.5} />, title: 'Generate Instantly', desc: 'Our Gemini-powered AI analyses your content and generates study material in under 10 seconds.' },
  { num: '04', icon: <Trophy size={32} strokeWidth={1.5} />, title: 'Study & Ace It', desc: 'Use your personalised AI study content to revise with confidence and walk into your exam prepared.' },
];

const getAvatar = (initials: string, color1: string, color2: string) => (
  <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg, ${color1}, ${color2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1rem', fontWeight: 'bold', flexShrink: 0 }}>
    {initials}
  </div>
);

const TESTIMONIALS = [
  {
    avatar: getAvatar('ET', '#818cf8', '#38bdf8'), name: 'Emily T.', year: '3rd Year Medicine', uni: 'University of Manchester',
    quote: 'I used to spend my entire Sunday making flashcards. Now I paste my lecture slides in on Sunday morning and my cards are done in 2 minutes. I can\'t imagine going back.',
    stars: 5,
  },
  {
    avatar: getAvatar('MK', '#34d399', '#059669'), name: 'Marcus K.', year: 'MSc Economics', uni: 'London School of Economics',
    quote: 'The exam question generator is incredible. It predicted 3 out of 5 topics that actually came up in my macro exam. My grade jumped from a 2:2 to a First.',
    stars: 5,
  },
  {
    avatar: getAvatar('ZA', '#fb923c', '#ea580c'), name: 'Zara A.', year: '2nd Year Law', uni: 'University of Edinburgh',
    quote: 'Law has thousands of cases to memorise. StudyBoost AI summarises each case into a structured 5-bullet format. My note quality has improved beyond recognition.',
    stars: 5,
  },
];

const MINI_FEATURES = [
  { icon: <ShieldCheck size={28} />, title: 'Zero Data Storage', desc: 'Your notes are never saved on our servers. Everything is processed via the Gemini API in real-time.' },
  { icon: <Smartphone size={28} />, title: 'Any Device', desc: 'Fully responsive design. Use StudyBoost on your laptop, tablet, or phone — anywhere, any time.' },
  { icon: <Globe size={28} />, title: 'All Subjects', desc: 'Medicine, Law, Engineering, Economics, History — the AI adapts to any academic subject instantly.' },
  { icon: <RefreshCw size={28} />, title: 'Spaced Repetition', desc: 'Flashcard structure based on the proven Leitner spaced repetition system for long-term memory.' },
  { icon: <Zap size={28} />, title: 'Instant Results', desc: 'No waiting. No queuing. AI-generated study content delivered in under 10 seconds every time.' },
  { icon: <BadgeDollarSign size={28} />, title: 'Free to Start', desc: 'Full access to all three AI tools completely free. No credit card. No commitment.' },
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
                Powered by Google Gemini AI
              </div>
              <h1 className={styles.heroTitle} data-reveal data-delay="100">
                Study <span className="gradient-text-anim">10× Smarter</span><br />
                with AI That Actually<br />
                <span className="gradient-text">Understands Your Notes</span>
              </h1>
              <p className={styles.heroSub} data-reveal data-delay="200">
                Transform any lecture notes into AI summaries, smart flashcards, and exam-ready practice questions — in seconds. Trusted by <strong>50,000+ university students</strong> worldwide.
              </p>
              <div className={styles.heroCtas} data-reveal data-delay="300">
                <Link href="/ai-tools" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Rocket size={18} /> Try It Free — No Signup</Link>
                <Link href="/features" className="btn-ghost">See All Features →</Link>
              </div>
              <div className={styles.heroTrust} data-reveal data-delay="400">
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> Free tier available</div>
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> No credit card</div>
                <div className={styles.trustItem}><span className={styles.trustCheck}><Check size={16} strokeWidth={3} /></span> Your data stays private</div>
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
                  <span className={styles.mockupTitle}>StudyBoost AI — Summariser</span>
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
                <span><Trophy size={16} color="#fbbf24" style={{ display: 'block' }} /></span> 50K+ Students
              </div>
              <div className={styles.floatingBadge2} style={{ bottom: '15%', left: '-10%' }}>
                <span><CheckCircle2 size={16} color="#34d399" style={{ display: 'block' }} /></span> 4.9 Rating
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
            <h2 className="section-title">Three Powerful AI Tools.<br /><span className="gradient-text">One Smarter Student.</span></h2>
            <p className="section-subtitle mx-auto">Every tool is designed around how students actually study — not how textbooks think you should study.</p>
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
                  Try this tool →
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
            <h2 className="section-title">From Lecture Notes to <span className="gradient-text">Exam Confidence</span> in 4 Steps</h2>
            <p className="section-subtitle mx-auto">No setup. No learning curve. Built to work immediately the moment you paste your first note.</p>
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
            <p className="section-subtitle mx-auto">Paste any text below — lecture notes, a paragraph from a textbook, anything. Watch the AI work.</p>
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
                  <p className={styles.keyNote} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> API key not set — <Link href="/contact">contact us</Link> or add key to .env.local</p>
                )}
              </div>
            </div>

            <div className={styles.demoRight} data-reveal="right">
              <div className={styles.outputCard}>
                <div className={styles.outputHeader}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#34d399" /> AI Summary Output</span>
                  <span className={styles.outputBadge}>Gemini AI</span>
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
                → Try Flashcard Generator & Exam Questions on the AI Tools page
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
              { val: '50,000+', label: 'Active Students', icon: <Trophy size={24} /> },
              { val: '2M+', label: 'AI Summaries Created', icon: <Zap size={24} /> },
              { val: '92%', label: 'Pass Rate Improvement', icon: <TrendingUp size={24} /> },
              { val: '4.9 ★', label: 'Average Student Rating', icon: <Star size={24} fill="currentColor" /> },
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
            <p className="section-subtitle mx-auto">Don&apos;t take our word for it. See what students at top UK universities are saying.</p>
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

      {/* ── LEAD MAGNET ─────────────────────────────────────────── */}
      <section className="section-sm">
        <div className="container">
          <div className={`glass-card ${styles.magnetBox}`} data-reveal>
            <div className={styles.magnetGlow} />
            <div className={styles.magnetLeft}>
              <div className={styles.magnetEmoji}><Library size={48} color="#818cf8" strokeWidth={1.5} /></div>
              <div>
                <div className="section-label" style={{ marginBottom: '12px' }}>Free Download</div>
                <h3 className={styles.magnetTitle}>Get the Ultimate AI Study Guide — Free</h3>
                <p className={styles.magnetSub}>Our 28-page PDF covers the best AI study techniques, exam prep strategies, and exactly how to use StudyBoost AI to maximise your grades. Downloaded by 12,000+ students.</p>
              </div>
            </div>
            <Link href="/contact" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Download Free Guide</Link>
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
              Join 50,000 students already using AI to study smarter. Free tier always available. No credit card. No excuses.
            </p>
            <div className={styles.ctaBtns}>
              <Link href="/ai-tools" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Rocket size={18} /> Start Free Now</Link>
              <Link href="/pricing" className="btn-ghost">View Pricing →</Link>
            </div>
            <p className={styles.ctaNote}>Free tier • No signup required • Powered by Google Gemini</p>
          </div>
        </div>
      </section>

    </main>
  );
}
