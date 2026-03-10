import type { Metadata } from 'next';
import { Clock, Trophy, BrainCircuit, Bot, Smartphone, ShieldCheck, Sparkles, RefreshCw, BarChart3, Library, Zap, CheckCircle2 } from 'lucide-react';
import styles from './FeaturesPage.module.css';

export const metadata: Metadata = {
    title: 'Advanced Features – StudyBoost AI',
    description:
        'Explore the cognitive science and AI technology behind StudyBoost AI. Optimize your academic performance with structured revision maps and predictive assessments.',
    keywords: [
        'Cognitive Academic Integration',
        'Revision Workflow Automation',
        'Academic Data Security',
        'Intelligent Learning Synthesis',
        'University Productivity Tech',
    ],
};

const features = [
    {
        icon: <Clock size={24} />,
        title: 'Save Study Time',
        desc: 'Condense 3 hours of lecture notes into a 5-minute AI summary. Spend less time reading, more time understanding.',
        color: '#6366f1',
        stat: '80%',
        statLabel: 'Faster note review',
    },
    {
        icon: <Trophy size={24} />,
        title: 'Improve Exam Preparation',
        desc: "AI-generated practice questions mirror real exam formats. Identify gaps in knowledge before it's too late.",
        color: '#8b5cf6',
        stat: '92%',
        statLabel: 'Pass rate improvement',
    },
    {
        icon: <BrainCircuit size={24} />,
        title: 'Increase Learning Productivity',
        desc: 'Smart flashcards use spaced repetition principles to move information into long-term memory. This is scientifically proven.',
        color: '#06b6d4',
        stat: '3×',
        statLabel: 'Better retention rate',
    },
    {
        icon: <Bot size={24} />,
        title: 'Advanced AI Technology',
        desc: "Built on the most advanced AI models, ensuring accurate, relevant, and high-quality study content every time.",
        color: '#f59e0b',
        stat: '99.9%',
        statLabel: 'Uptime reliability',
    },
    {
        icon: <Smartphone size={24} />,
        title: 'Study Anywhere, Anytime',
        desc: 'Fully responsive: use StudyBoost AI on your laptop, tablet, or phone. Your AI study partner is always available.',
        color: '#10b981',
        stat: '24/7',
        statLabel: 'Always available',
    },
    {
        icon: <ShieldCheck size={24} />,
        title: 'Private & Secure',
        desc: 'Your notes are never stored on our servers. All AI processing happens securely via our advanced AI integration directly in your browser.',
        color: '#ef4444',
        stat: '0',
        statLabel: 'Data stored on our end',
    },
];

const steps = [
    { num: '01', title: 'Paste Your Notes', desc: 'Copy and paste any lecture notes, textbook excerpts, or study material.' },
    { num: '02', title: 'Choose Your Tool', desc: 'Select summarise, flashcards, or exam questions based on what you need.' },
    { num: '03', title: 'Get Instant Results', desc: 'AI generates your study material in seconds - ready to use immediately.' },
    { num: '04', title: 'Ace Your Exams', desc: 'Use your AI-generated study content to study efficiently and confidently.' },
];

export default function FeaturesPage() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> Features</div>
                    <h1 className={styles.title}>
                        Elite Tools for <span className="gradient-text">Academic Excellence</span>
                    </h1>
                    <p className={styles.subtitle}>
                        StudyBoost AI integrates cutting-edge cognitive models to make your
                        revision faster, deeper, and more scientifically effective.
                    </p>
                </div>
            </div>

            {/* Feature Grid */}
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {features.map((f) => (
                            <div key={f.title} className={`glass-card ${styles.card}`}>
                                <div className={styles.cardTop}>
                                    <div className={styles.iconWrap} style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}>
                                        <span className={styles.icon}>{f.icon}</span>
                                    </div>
                                    <div className={styles.statBox}>
                                        <span className={styles.stat} style={{ color: f.color }}>{f.stat}</span>
                                        <span className={styles.statLabel}>{f.statLabel}</span>
                                    </div>
                                </div>
                                <h3 className={styles.cardTitle}>{f.title}</h3>
                                <p className={styles.cardDesc}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className={`section ${styles.howSection}`}>
                <div className="container">
                    <div className="text-center">
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><RefreshCw size={14} /> How It Works</div>
                        <h2 className="section-title">
                            From Notes to <span className="gradient-text">Excellence</span> in 4 Steps
                        </h2>
                    </div>
                    <div className={styles.steps}>
                        {steps.map((s, i) => (
                            <div key={s.num} className={styles.step}>
                                <div className={styles.stepNum}>{s.num}</div>
                                {i < steps.length - 1 && <div className={styles.stepLine} />}
                                <h3 className={styles.stepTitle}>{s.title}</h3>
                                <p className={styles.stepDesc}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deep Dive Sections */}
            <section className="section">
                <div className="container">
                    <div className="grid-2" style={{ gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
                        <div>
                            <div className="section-label">Flashcard Generator</div>
                            <h2 className="section-title">Automated <span className="gradient-text">Revision Decks</span></h2>
                            <p className="section-subtitle" style={{ marginLeft: 0 }}>
                                Our AI flashcard generator doesn't just copy-paste; it analyzes your lecture notes to identify key definitions, formulas, and historical dates. It then creates balanced Q&A pairs specifically optimized for active recall.
                            </p>
                            <ul className={styles.detailList} style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Automatic AI extraction of key concepts</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Perfect for medical, law, and engineering notes</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Spaced repetition ready flashcards</li>
                            </ul>
                        </div>
                        <div className={`glass-card ${styles.visualBox}`} style={{ padding: '40px', background: 'var(--card-bg)', border: '1px solid var(--border)' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>AI Revision Card Example</div>
                            <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #818cf8', marginBottom: '16px' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '8px' }}>FRONT (Question)</div>
                                <div>What are the primary stages of the Calvin Cycle in photosynthesis?</div>
                            </div>
                            <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #34d399' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '8px' }}>BACK (Answer)</div>
                                <div>1. Carbon fixation, 2. Reduction phase, 3. Regeneration of Ribulose.</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid-2" style={{ gap: '64px', alignItems: 'center' }}>
                        <div className={`glass-card ${styles.visualBox}`} style={{ padding: '40px', order: 2 }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '20px' }}>AI Summarization Output</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ width: '100%', height: '12px', background: 'var(--border)', borderRadius: '6px' }} />
                                <div style={{ width: '85%', height: '12px', background: 'var(--border)', borderRadius: '6px' }} />
                                <div style={{ width: '90%', height: '12px', background: 'var(--border)', borderRadius: '6px' }} />
                                <div style={{ width: '40%', height: '12px', background: 'var(--border)', borderRadius: '6px', marginBottom: '16px' }} />
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ padding: '6px 12px', background: 'rgba(129, 140, 248, 0.2)', borderRadius: '20px', fontSize: '0.7rem' }}>Key Concept</div>
                                    <div style={{ padding: '6px 12px', background: 'rgba(129, 140, 248, 0.2)', borderRadius: '20px', fontSize: '0.7rem' }}>Definition</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ order: 1 }}>
                            <div className="section-label">Note Summarizer</div>
                            <h2 className="section-title">Automated <span className="gradient-text">Academic Synthesis</span></h2>
                            <p className="section-subtitle" style={{ marginLeft: 0 }}>
                                Our note summarizer turns chaotic lecture notes into structured knowledge maps. It identifies the hierarchical structure of your materials, providing executive summaries that capture 100% of the core value in 10% of the space.
                            </p>
                            <ul className={styles.detailList} style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Intelligent hierarchical summarization</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Context-aware academic analysis</li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={20} color="#34d399" /> Multi-format export for all study notes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison table */}
            <section className={`section-sm ${styles.compareSection}`}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><BarChart3 size={14} /> StudyBoost AI vs Traditional Study</div>
                        <h2 className="section-title">
                            Why AI Beats <span className="gradient-text">Old-School Methods</span>
                        </h2>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableCol}>Study Method</div>
                            <div className={`${styles.tableCol} ${styles.colOld}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Library size={18} /> Traditional</div>
                            <div className={`${styles.tableCol} ${styles.colNew}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} /> StudyBoost AI</div>
                        </div>
                        {[
                            ['Note Summarisation', '2–3 hours', 'Under 30 seconds'],
                            ['Flashcard Creation', '45 minutes', 'Instant, auto-generated'],
                            ['Practice Questions', 'Find online / none', 'Tailored to YOUR notes'],
                            ['Study Availability', 'Limited by resources', '24/7, any device'],
                            ['Cost', 'Textbooks, tutors', 'Free tier available'],
                        ].map(([label, old, neo]) => (
                            <div key={label} className={styles.tableRow}>
                                <div className={styles.tableCol}>{label}</div>
                                <div className={`${styles.tableCol} ${styles.colOld}`}>{old}</div>
                                <div className={`${styles.tableCol} ${styles.colNew}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#34d399" /> {neo}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
