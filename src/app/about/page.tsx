import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Target, Lightbulb, Users, Star, GraduationCap, Unlock, ShieldCheck, Rocket } from 'lucide-react';
import styles from './AboutPage.module.css';

export const metadata: Metadata = {
    title: 'About – StudyBoost AI',
    description:
        'Learn about StudyBoost AI: our mission to help every student study smarter with AI, meet our team, and read student reviews.',
    keywords: [
        'about AI study assistant',
        'AI learning platform',
        'student study support',
        'StudyBoost AI mission',
    ],
};

const team = [
    {
        name: 'Dr. Priya Sharma',
        role: 'Co-Founder & CEO',
        avatar: 'PS',
        bio: 'Former AI researcher and software engineer. Priya has spent 10 years studying how students learn and applying AI to improve academic outcomes.',
        color: '#6366f1',
    },
    {
        name: 'James O\'Connor',
        role: 'Co-Founder & CTO',
        avatar: 'JO',
        bio: 'Ex-Google engineer with a passion for building tools that matter. James architected the Gemini API integration powering all StudyBoost AI tools.',
        color: '#8b5cf6',
    },
    {
        name: 'Amara Osei',
        role: 'Head of Product & Education',
        avatar: 'AO',
        bio: 'Former secondary school teacher turned edtech product lead. Amara ensures every feature actually improves learning outcomes for real students.',
        color: '#06b6d4',
    },
];

const testimonials = [
    {
        name: 'Ganusha Chadika',
        university: 'IIT',
        subject: 'Software Engineering',
        quote: 'StudyBoost AI completely changed how I revise. I used to spend 4 hours making notes; now a 10-minute AI session gives me better summaries than I could write myself.',
        stars: 5,
        avatar: 'GC',
    },
    {
        name: 'Hasala Abilasha',
        university: 'IIT',
        subject: 'Computer Science',
        quote: 'The flashcard generator is genius. I paste in my lecture slides and get 20 practice cards in seconds. My recall in exams has improved dramatically.',
        stars: 5,
        avatar: 'HA',
    },
    {
        name: 'Chamindu',
        university: 'IIT',
        subject: 'Business Analytics',
        quote: 'As a student, I have thousands of pages to cover. StudyBoost AI helps me identify the key principles quickly. I genuinely don\'t know how I studied without it.',
        stars: 5,
        avatar: 'C',
    },
];

const values = [
    { icon: <GraduationCap size={28} />, title: 'Education First', desc: 'Every decision starts with one question: does this help students learn better?' },
    { icon: <Unlock size={28} />, title: 'Accessible to All', desc: 'Quality education tools should not be reserved for those who can afford expensive tutors.' },
    { icon: <ShieldCheck size={28} />, title: 'Privacy by Design', desc: 'Your notes are never stored. We built privacy into the architecture from day one.' },
    { icon: <Rocket size={28} />, title: 'Continuous Innovation', desc: 'We ship new features every month, guided by student feedback and educational research.' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            {/* Mission hero */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Sparkles size={14} /> Our Story</div>
                        <h1 className={styles.heroTitle}>
                            We Built the Study Assistant <br />
                            <span className="gradient-text">We Wished We Had at University</span>
                        </h1>
                        <p className={styles.heroText}>
                            StudyBoost AI was founded in 2024 by three former students who experienced firsthand
                            the inefficiency of traditional studying. Thousands of hours spent re-reading the same notes.
                            Mountains of flashcards made by hand. Last-minute cramming that never worked.
                        </p>
                        <p className={styles.heroText}>
                            We knew AI could change this. So we built it. Today, StudyBoost AI is used by
                            <strong> thousands of students</strong> across universities worldwide - and we&apos;re
                            just getting started.
                        </p>
                        <div className={styles.heroCtas}>
                            <Link href="/ai-tools" className="btn-primary">🚀 Try StudyBoost AI Free</Link>
                            <Link href="/contact" className="btn-outline">Get in Touch</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission statement */}
            <section className="section-sm">
                <div className="container">
                    <div className={styles.missionBox}>
                        <div className={styles.missionEmoji} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Target size={40} color="#6366f1" /></div>
                        <div>
                            <h2 className={styles.missionTitle}>Our Mission</h2>
                            <p className={styles.missionText}>
                                To democratise AI-powered studying and give every university student (regardless of background, budget, or prior knowledge) the tools they need to achieve their academic potential.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Lightbulb size={14} /> What We Stand For</div>
                        <h2 className="section-title">Our Core <span className="gradient-text">Values</span></h2>
                    </div>
                    <div className="grid-4">
                        {values.map((v) => (
                            <div key={v.title} className={`glass-card ${styles.valueCard}`}>
                                <span className={styles.valueIcon}>{v.icon}</span>
                                <h3 className={styles.valueTitle}>{v.title}</h3>
                                <p className={styles.valueDesc}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Users size={14} /> The Team</div>
                        <h2 className="section-title">Meet the People <span className="gradient-text">Behind the AI</span></h2>
                    </div>
                    <div className="grid-3">
                        {team.map((m) => (
                            <div key={m.name} className={`glass-card ${styles.teamCard}`}>
                                <div className={styles.teamAvatar} style={{ background: `${m.color}18`, border: `2px solid ${m.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className={styles.avatarEmoji} style={{ fontSize: '2rem', fontWeight: 600, color: m.color, opacity: 0.8 }}>{m.avatar}</span>
                                </div>
                                <h3 className={styles.teamName}>{m.name}</h3>
                                <span className={styles.teamRole} style={{ color: m.color }}>{m.role}</span>
                                <p className={styles.teamBio}>{m.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Star size={14} /> Student Reviews</div>
                        <h2 className="section-title">
                            Loved by Students at <span className="gradient-text">Top Universities</span>
                        </h2>
                    </div>
                    <div className="grid-3">
                        {testimonials.map((t) => (
                            <div key={t.name} className={`glass-card ${styles.testimonial}`}>
                                <div className={styles.stars}>{[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                                <div className={styles.reviewer}>
                                    <div className={styles.reviewerAvatar} style={{ background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 600, color: '#64748b' }}>{t.avatar}</div>
                                    <div>
                                        <div className={styles.reviewerName}>{t.name}</div>
                                        <div className={styles.reviewerInfo}>{t.subject} · {t.university}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className={`section-sm ${styles.statsSection}`}>
                <div className="container">
                    <div className={styles.stats}>
                        {[
                            { num: 'Top', label: 'Student Support' },
                            { num: 'High', label: 'Satisfaction' },
                            { num: '10K+', label: 'AI Summaries Generated' },
                            { num: 'Elite', label: 'Study Tools' },
                        ].map((s) => (
                            <div key={s.label} className={styles.stat}>
                                <div className={styles.statNum}>{s.num}</div>
                                <div className={styles.statLabel}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
