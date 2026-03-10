import type { Metadata } from 'next';
import Link from 'next/link';
import { Bot, Zap, Trophy, Library, Mail } from 'lucide-react';
import styles from './BlogPage.module.css';

export const metadata: Metadata = {
    title: 'Academic Insights – StudyBoost AI',
    description:
        'Deep dives into cognitive science, latest AI learning trends, and student success strategies. Master your university journey with expert guidance.',
    keywords: [
        'Academic AI Strategy',
        'Cognitive Study Methods',
        'AI Learning Trends 2025',
        'Student Success Resources',
        'Intelligent Revision Guides',
    ],
};

const articles = [
    {
        slug: 'best-ai-tools-for-students',
        emoji: <Bot size={24} />,
        category: 'AI Tools',
        date: 'March 5, 2025',
        readTime: '8 min read',
        title: 'Best AI Tools for Students in 2025',
        excerpt:
            'Discover the top AI tools every university student should be using right now to study smarter, save time, and improve their grades.',
        color: '#6366f1',
        content: `
The landscape of academic study has been completely transformed by artificial intelligence. In 2025, students who leverage AI tools have a significant advantage over those who rely on traditional methods alone.

**1. StudyBoost AI: Note Summarisation & Flashcards**
StudyBoost AI leads the pack as the most comprehensive AI study assistant for university students. With its three-in-one toolkit (note summariser, flashcard generator, and exam question creator) it covers every stage of the study cycle.

**2. Advanced AI: Advanced Question Answering**
Advanced AI multimodal capabilities make it excellent for explaining complex concepts, solving equations, and even interpreting diagrams from textbooks.

**3. Anki with AI Plugins: Optimised Spaced Repetition**
Traditional Anki supercharged with AI plugins can automatically generate cards from your notes and optimise the review schedule based on your performance.

**4. ChatGPT: Essay Planning & Brainstorming**
While not specialised for studying, ChatGPT remains powerful for essay planning, brainstorming arguments, and getting explanations in plain language.

**5. Elicit: Academic Research Assistant**
Elicit helps students find academic papers, extract key claims, and summarise research. This is invaluable for literature reviews.

The key to academic success in 2025 is not choosing one AI tool, but building a personalised AI study stack that covers summarisation, review, research, and practice.
    `.trim(),
    },
    {
        slug: 'how-to-study-faster-with-ai',
        emoji: <Zap size={24} />,
        category: 'Study Strategy',
        date: 'February 20, 2025',
        readTime: '6 min read',
        title: 'How to Study Faster with AI: A Complete Guide',
        excerpt:
            'Learn the exact AI-powered study workflow top students use to cut revision time in half while achieving better exam results.',
        color: '#8b5cf6',
        content: `
Studying faster with AI is not about cutting corners; it's about eliminating inefficiency. Here's the complete workflow used by high-achieving students who leverage artificial intelligence.

**Step 1: The AI Dump (10 minutes)**
At the end of each lecture, paste your raw notes into StudyBoost AI and generate a structured summary. This forces the AI to identify the most important concepts and organises your thoughts immediately after learning (when retention is highest).

**Step 2: Active Recall with AI Flashcards (15 minutes per session)**
Use the flashcard generator to create Q&A pairs from your summarised notes. Then use spaced repetition: review new cards daily for 3 days, then every 3 days, then weekly.

**Step 3: Exam Simulation (30 minutes per topic)**
A week before exams, use the exam question generator on each topic. Attempt to answer each question before revealing the model answer. This closely simulates exam conditions and identifies knowledge gaps.

**Step 4: Gap Filling with AI Explanations**
When you encounter a question you can't answer, use an AI chatbot to explain the concept in plain language. Ask for analogies and real-world examples to solidify understanding.

**The Result**: Students who follow this workflow consistently report studying 40–60% faster while achieving higher grades. The magic is in the compounding: better organisation leads to better recall, which means less time re-reading the same material.
    `.trim(),
    },
    {
        slug: 'ai-exam-preparation-tips',
        emoji: <Trophy size={24} />,
        category: 'Exam Prep',
        date: 'January 15, 2025',
        readTime: '7 min read',
        title: 'AI Exam Preparation Tips: Score Higher This Semester',
        excerpt:
            'Tactical AI strategies to maximise your exam performance, from setting up your AI study system to last-minute revision techniques.',
        color: '#06b6d4',
        content: `
Exam season doesn't have to be stressful when you have AI in your corner. These evidence-based AI exam preparation strategies will help you walk into any exam with confidence.

**Tip 1: Build Your AI Knowledge Base Early**
Start using AI summarisation tools from week one. By exam time, you'll have a structured, AI-organised set of notes for every topic: a significant advantage over students who only start revising weeks before.

**Tip 2: Use AI to Identify Examiner Priorities**
Ask an AI chatbot: "What are the most likely exam topics for [module name]?" or "What questions typically appear in [subject] exams?" While not perfect, this can help you allocate revision time strategically.

**Tip 3: Generate, Not Just Read**
Research consistently shows that active retrieval (testing yourself) is far more effective than passive reading. Use StudyBoost AI's exam question generator to create practice tests from your notes, then check your answers against the AI's model responses.

**Tip 4: The Night-Before Strategy**
The evening before an exam, use the note summariser to condense your already-summarised notes into a 1-page "cheat sheet" of the most critical concepts. This forces prioritisation and provides a perfect final review.

**Tip 5: Post-Exam Analysis**
After each exam or practice test, paste your answers into an AI tool and ask for feedback. Identify patterns in your mistakes to guide future revision sessions.

Combining these strategies with consistent effort will make AI your most powerful exam partner. It is not a shortcut, but a force multiplier.
    `.trim(),
    },
];

export default function BlogPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Library size={14} /> Blog & Resources</div>
                    <h1 className={styles.title}>
                        Study Tips, AI Guides & <span className="gradient-text">Student Resources</span>
                    </h1>
                    <p className={styles.subtitle}>
                        SEO-optimised articles to help you master AI-powered studying and
                        achieve your academic goals.
                    </p>
                </div>
            </div>

            {/* Article cards */}
            <section className="section">
                <div className="container">
                    <div className={styles.articles}>
                        {articles.map((a) => (
                            <article key={a.slug} className={`glass-card ${styles.article}`} id={a.slug}>
                                <div className={styles.articleTop}>
                                    <div className={styles.emojiBox} style={{ background: `${a.color}18`, border: `1px solid ${a.color}30` }}>
                                        <span>{a.emoji}</span>
                                    </div>
                                    <div className={styles.articleMeta}>
                                        <span className="badge badge-purple">{a.category}</span>
                                        <span className={styles.metaInfo}>{a.date} · {a.readTime}</span>
                                    </div>
                                </div>
                                <h2 className={styles.articleTitle}>{a.title}</h2>
                                <p className={styles.articleExcerpt}>{a.excerpt}</p>

                                {/* Full content */}
                                <details className={styles.details}>
                                    <summary className={styles.summary}>Read Full Article ↓</summary>
                                    <div className={styles.fullContent}>
                                        {a.content.split('\n\n').map((para, i) => {
                                            if (para.startsWith('**') && para.endsWith('**')) {
                                                return <h3 key={i} className={styles.contentH3}>{para.slice(2, -2)}</h3>;
                                            }
                                            // Render inline bold
                                            const parts = para.split(/(\*\*[^*]+\*\*)/g);
                                            return (
                                                <p key={i} className={styles.contentP}>
                                                    {parts.map((part, j) =>
                                                        part.startsWith('**') && part.endsWith('**')
                                                            ? <strong key={j}>{part.slice(2, -2)}</strong>
                                                            : part
                                                    )}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </details>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Google Form CTA */}
            <section className={`section-sm ${styles.subscribeSection}`}>
                <div className="container">
                    <div className={`${styles.subscribeBox}`} style={{ textAlign: 'center', padding: '48px 32px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '20px', backdropFilter: 'blur(12px)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📬</div>
                        <h2 className={styles.subscribeTitle} style={{ marginBottom: '12px' }}>
                            Have a Question or Suggestion?
                        </h2>
                        <p className={styles.subscribeSub} style={{ marginBottom: '32px', maxWidth: '460px', margin: '0 auto 32px' }}>
                            We&apos;d love to hear from you. Fill in our quick support form and our team will get back to you as soon as possible.
                        </p>
                        <a
                            href="https://forms.gle/iRyNiwRdFracCCg89"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1rem', padding: '16px 36px' }}
                        >
                            <Mail size={20} /> Open Support Form
                        </a>
                        <p style={{ marginTop: '16px', fontSize: '0.82rem', color: 'var(--text-3)' }}>
                            Quick response • Priority support • No spam
                        </p>
                    </div>
                </div>
            </section>

            {/* External link for SEO */}
            <div className="container" style={{ paddingBottom: '32px' }}>
                <p className={styles.externalNote}>
                    For more academic resources, visit{' '}
                    <a href="https://www.studiosity.com/blog" target="_blank" rel="noopener noreferrer">
                        Studiosity Blog
                    </a>{' '}
                    and{' '}
                    <a href="https://learnenglish.britishcouncil.org/skills/reading/upper-intermediate-b2/studying-effectively" target="_blank" rel="noopener noreferrer">
                        British Council Study Tips
                    </a>.
                </p>
            </div>
        </div>
    );
}
