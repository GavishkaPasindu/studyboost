'use client';

import { useState } from 'react';
import { callGemini, PROMPTS } from '@/lib/gemini';
import { FileText, BookOpen, BookMarked, Bot, AlertTriangle, Sparkles, CheckCircle2, Download } from 'lucide-react';
import styles from './AIToolsPage.module.css';

type Tool = 'summarize' | 'flashcards' | 'exam';

export default function AIToolsPage() {
    const [active, setActive] = useState<Tool>('summarize');
    const [notes, setNotes] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiKey] = useState(
        typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' : ''
    );

    const tools = [
        {
            id: 'summarize' as Tool,
            icon: <FileText size={24} />,
            label: 'Lecture Summariser',
            desc: 'Synthesise dense academic materials into clear, structured knowledge maps.',
            placeholder: 'Paste your lecture notes or textbook excerpts here...\n\nExample: "The macroeconomic implications of fiscal policy in developing nations..."',
            buttonLabel: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Sparkles size={18} /> Synthesise Materials</span>,
        },
        {
            id: 'flashcards' as Tool,
            icon: <BookOpen size={24} />,
            label: 'Flashcard Generator',
            desc: 'Generate Q&A flashcards for spaced repetition and active recall.',
            placeholder: 'Paste your lecture notes here...\n\nThe AI will extract key concepts and generate question-answer pairs perfect for revision.',
            buttonLabel: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><BookOpen size={18} /> Generate Flashcards</span>,
        },
        {
            id: 'exam' as Tool,
            icon: <BookMarked size={24} />,
            label: 'Cognitive Practice Exams',
            desc: 'Generate predictive practice assessments to validate your depth of understanding.',
            placeholder: 'Paste your study materials here...\n\nThe AI will generate a mix of analytical questions, critical thinking prompts, and mock exam scenarios.',
            buttonLabel: <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><BookMarked size={18} /> Generate Practice Assessment</span>,
        },
    ];

    const activeTool = tools.find((t) => t.id === active)!;

    async function handleGenerate() {
        if (!notes.trim()) { setError('Please paste some lecture notes first.'); return; }
        setError('');
        setLoading(true);
        setOutput('');
        try {
            const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
            const prompt =
                active === 'summarize'
                    ? PROMPTS.summarize(notes)
                    : active === 'flashcards'
                        ? PROMPTS.flashcards(notes)
                        : PROMPTS.examQuestions(notes);
            const result = await callGemini(prompt, key);
            setOutput(result);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

    function switchTool(id: Tool) {
        setActive(id);
        setOutput('');
        setError('');
    }

    function handleDownloadTXT() {
        if (!output) return;

        try {
            // The output is already plain text containing the markdown/AI response, so we can save it directly
            const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `StudyBoost-${active}-output.txt`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Error generating TXT:', err);
            setError('Failed to generate TXT file. Please try again.');
        }
    }

    function renderOutput() {
        if (!output) return null;
        if (active === 'flashcards') {
            // Parse Q: / A: pairs
            const pairs = output.split('\n').reduce<{ q: string; a: string }[]>((acc, line) => {
                if (line.startsWith('Q:')) acc.push({ q: line.slice(2).trim(), a: '' });
                else if (line.startsWith('A:') && acc.length) acc[acc.length - 1].a = line.slice(2).trim();
                return acc;
            }, []);
            if (pairs.length > 0) {
                return (
                    <div className={styles.flashcardGrid}>
                        {pairs.map((p, i) => (
                            <FlashCard key={i} q={p.q} a={p.a} index={i + 1} />
                        ))}
                    </div>
                );
            }
        }
        return <div className="output-box">{output}</div>;
    }

    return (
        <div className={styles.page}>
            {/* Page header */}
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Bot size={14} /> AI-Powered Tools</div>
                    <h1 className={styles.title}>
                        Your AI Academic <span className="gradient-text">Toolkit</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Professional-grade tools for cognitive synthesis and knowledge testing.
                        Upload your materials and let advanced AI optimize your revision flow.
                    </p>
                </div>
            </div>

            <div className="container">
                {/* Tool tabs */}
                <div className={styles.tabs}>
                    {tools.map((t) => (
                        <button
                            key={t.id}
                            className={`${styles.tab} ${active === t.id ? styles.tabActive : ''}`}
                            onClick={() => switchTool(t.id)}
                            id={`tab-${t.id}`}
                        >
                            <span className={styles.tabIcon}>{t.icon}</span>
                            <span>{t.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tool content */}
                <div className={styles.toolWrap}>
                    <div className={styles.toolLeft}>
                        <div className={`glass-card ${styles.toolDesc}`}>
                            <span className={styles.toolDescIcon}>{activeTool.icon}</span>
                            <div>
                                <h2 className={styles.toolDescTitle}>{activeTool.label}</h2>
                                <p className={styles.toolDescText}>{activeTool.desc}</p>
                            </div>
                        </div>



                        <textarea
                            className={`input-field ${styles.textarea}`}
                            placeholder={activeTool.placeholder}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={10}
                            id={`notes-input-${active}`}
                        />

                        {error && <p className={styles.error} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={16} /> {error}</p>}

                        <button
                            className="btn-primary"
                            onClick={handleGenerate}
                            disabled={loading}
                            id={`generate-btn-${active}`}
                        >
                            {loading ? <><span className="spinner" /> Processing…</> : activeTool.buttonLabel}
                        </button>
                    </div>

                    <div className={styles.toolRight}>
                        <div className={styles.outputHeader}>
                            <span className={styles.outputLabel} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                {active === 'summarize' ? <><FileText size={16} /> Summary</> : active === 'flashcards' ? <><BookOpen size={16} /> Flashcards</> : <><BookMarked size={16} /> Practice Questions</>}
                            </span>
                            {output && <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={12} /> Generated</span>}
                        </div>

                        {output ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div id="ai-output-content" style={{ padding: '8px', background: 'transparent' }}>
                                    {renderOutput()}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px', marginBottom: '16px' }}>
                                    <button
                                        onClick={handleDownloadTXT}
                                        className="btn-outline"
                                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        title="Download as TXT"
                                    >
                                        <Download size={18} /> Download TXT file
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    {active === 'summarize' ? <FileText size={48} strokeWidth={1} /> : active === 'flashcards' ? <BookOpen size={48} strokeWidth={1} /> : <BookMarked size={48} strokeWidth={1} />}
                                </div>
                                <p>Your {activeTool.label} output will appear here.</p>
                                <p>Paste notes on the left and click <strong>{activeTool.buttonLabel}</strong>.</p>
                            </div>
                        )}
                    </div>
                    {/* Best Practices / SEO Content */}
                    <section className={styles.tipsSection} style={{ marginTop: '80px', paddingTop: '60px', borderTop: '1px solid var(--border)' }}>
                        <div className="text-center" style={{ marginBottom: '40px' }}>
                            <div className="section-label">Master Your Workflow</div>
                            <h2 className="section-title">How to Use StudyBoost <span className="gradient-text">Like an Expert</span></h2>
                        </div>
                        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                            <div className={`glass-card ${styles.tipCard}`} style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-1)' }}>1. Start with the Note Summariser</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.6' }}>
                                    Always run your raw lecture notes through our <strong>note summariser</strong> first. This identifies the core concepts and removes filler, making it easier for the AI to generate high-quality <strong>revision flashcards</strong> later.
                                </p>
                            </div>
                            <div className={`glass-card ${styles.tipCard}`} style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-1)' }}>2. Generate Thematic Flashcards</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.6' }}>
                                    Use our <strong>AI flashcard generator</strong> on specific sections of your notes. We recommend generating 10-15 cards per topic to ensure your <strong>revision decks</strong> are focused and effective for long-term memory.
                                </p>
                            </div>
                            <div className={`glass-card ${styles.tipCard}`} style={{ padding: '24px' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--text-1)' }}>3. Validate with Practice Exams</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-2)', lineHeight: '1.6' }}>
                                    Before your final review, use our <strong>mock exam question generator</strong>. It creates predictive assessments that simulate real exam pressure, testing your ability to retrieve information from your <strong>AI-summarised notes</strong>.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function FlashCard({ q, a, index }: { q: string; a: string; index: number }) {
    const [flipped, setFlipped] = useState(false);
    return (
        <div
            className={`${styles.flashcard} ${flipped ? styles.flipped : ''}`}
            onClick={() => setFlipped(!flipped)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
            aria-label={`Flashcard ${index}`}
        >
            <div className={styles.flashcardInner}>
                <div className={styles.flashcardFront}>
                    <span className={styles.cardNum}>#{index}</span>
                    <p className={styles.cardQuestion}>{q}</p>
                    <span className={styles.tapHint}>Tap to reveal answer</span>
                </div>
                <div className={styles.flashcardBack}>
                    <span className={styles.answerLabel}>Answer</span>
                    <p className={styles.cardAnswer}>{a}</p>
                </div>
            </div>
        </div>
    );
}
