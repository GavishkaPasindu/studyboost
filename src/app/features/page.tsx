import type { Metadata } from 'next';
import styles from './FeaturesPage.module.css';

export const metadata: Metadata = {
    title: 'Features – StudyBoost AI',
    description:
        'Discover how StudyBoost AI saves study time, boosts exam preparation, and increases learning productivity with powerful AI-driven tools for students.',
    keywords: [
        'AI study features',
        'productivity tools for students',
        'exam prep AI',
        'study assistant features',
        'AI learning platform',
    ],
};

const features = [
    {
        icon: '⏱️',
        title: 'Save Study Time',
        desc: 'Condense 3 hours of lecture notes into a 5-minute AI summary. Spend less time reading, more time understanding.',
        color: '#6366f1',
        stat: '80%',
        statLabel: 'Faster note review',
    },
    {
        icon: '🏆',
        title: 'Improve Exam Preparation',
        desc: "AI-generated practice questions mirror real exam formats. Identify gaps in knowledge before it's too late.",
        color: '#8b5cf6',
        stat: '92%',
        statLabel: 'Pass rate improvement',
    },
    {
        icon: '🧠',
        title: 'Increase Learning Productivity',
        desc: 'Smart flashcards use spaced repetition principles to move information into long-term memory — scientifically proven.',
        color: '#06b6d4',
        stat: '3×',
        statLabel: 'Better retention rate',
    },
    {
        icon: '🤖',
        title: 'Powered by Google Gemini',
        desc: "Built on Google's most advanced AI model, ensuring accurate, relevant, and high-quality study content every time.",
        color: '#f59e0b',
        stat: '99.9%',
        statLabel: 'Uptime reliability',
    },
    {
        icon: '📱',
        title: 'Study Anywhere, Anytime',
        desc: 'Fully responsive — use StudyBoost AI on your laptop, tablet, or phone. Your AI study partner is always available.',
        color: '#10b981',
        stat: '24/7',
        statLabel: 'Always available',
    },
    {
        icon: '🔒',
        title: 'Private & Secure',
        desc: 'Your notes are never stored on our servers. All AI processing happens securely via the Gemini API directly in your browser.',
        color: '#ef4444',
        stat: '0',
        statLabel: 'Data stored on our end',
    },
];

const steps = [
    { num: '01', title: 'Paste Your Notes', desc: 'Copy and paste any lecture notes, textbook excerpts, or study material.' },
    { num: '02', title: 'Choose Your Tool', desc: 'Select summarise, flashcards, or exam questions based on what you need.' },
    { num: '03', title: 'Get Instant Results', desc: 'AI generates your study material in seconds — ready to use immediately.' },
    { num: '04', title: 'Ace Your Exams', desc: 'Use your AI-generated study content to study efficiently and confidently.' },
];

export default function FeaturesPage() {
    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label">✨ Features</div>
                    <h1 className={styles.title}>
                        Everything You Need to Study <span className="gradient-text">Like a Pro</span>
                    </h1>
                    <p className={styles.subtitle}>
                        StudyBoost AI is packed with features designed to make studying
                        more efficient, effective, and actually enjoyable.
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
                        <div className="section-label">🔄 How It Works</div>
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

            {/* Comparison table */}
            <section className={`section-sm ${styles.compareSection}`}>
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label">📊 StudyBoost AI vs Traditional Study</div>
                        <h2 className="section-title">
                            Why AI Beats <span className="gradient-text">Old-School Methods</span>
                        </h2>
                    </div>
                    <div className={styles.table}>
                        <div className={styles.tableHeader}>
                            <div className={styles.tableCol}>Study Method</div>
                            <div className={`${styles.tableCol} ${styles.colOld}`}>📚 Traditional</div>
                            <div className={`${styles.tableCol} ${styles.colNew}`}>⚡ StudyBoost AI</div>
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
                                <div className={`${styles.tableCol} ${styles.colNew}`}>✅ {neo}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
