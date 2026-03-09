'use client';

import { useState } from 'react';
import { callGemini, PROMPTS } from '@/lib/gemini';
import styles from './AIToolsPage.module.css';

type Tool = 'summarize' | 'flashcards' | 'exam';

export default function AIToolsPage() {
    const [active, setActive] = useState<Tool>('summarize');
    const [notes, setNotes] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [apiKey, setApiKey] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('sb_gemini_key') || '' : ''
    );

    const tools = [
        {
            id: 'summarize' as Tool,
            icon: '📝',
            label: 'Note Summariser',
            desc: 'Condense hours of lecture notes into clear, structured summaries.',
            placeholder: 'Paste your lecture notes here...\n\nExample: "The French Revolution began in 1789 when economic hardship, social inequality, and political corruption reached a breaking point..."',
            buttonLabel: '✨ Summarise Notes',
        },
        {
            id: 'flashcards' as Tool,
            icon: '🃏',
            label: 'Flashcard Generator',
            desc: 'Generate Q&A flashcards for spaced repetition and active recall.',
            placeholder: 'Paste your lecture notes here...\n\nThe AI will extract key concepts and generate question-answer pairs perfect for revision.',
            buttonLabel: '🃏 Generate Flashcards',
        },
        {
            id: 'exam' as Tool,
            icon: '📖',
            label: 'Exam Question Generator',
            desc: 'Create exam-style practice questions to test your understanding.',
            placeholder: 'Paste your lecture notes here...\n\nThe AI will generate a mix of short answer, multiple choice, and analytical questions.',
            buttonLabel: '📖 Generate Exam Questions',
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
            if (apiKey) localStorage.setItem('sb_gemini_key', apiKey);
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
                    <div className="section-label">🤖 AI-Powered Tools</div>
                    <h1 className={styles.title}>
                        Your AI Study <span className="gradient-text">Toolkit</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Three powerful tools to transform how you study. Paste your notes and
                        let AI do the heavy lifting.
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

                        {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
                            <div className={styles.keySection}>
                                <label className={styles.keyLabel}>
                                    🔑 Gemini API Key{' '}
                                    <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">
                                        (Get free key →)
                                    </a>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Paste your Gemini API key here"
                                    className="input-field"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    id="ai-tools-api-key"
                                />
                            </div>
                        )}

                        <textarea
                            className={`input-field ${styles.textarea}`}
                            placeholder={activeTool.placeholder}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={10}
                            id={`notes-input-${active}`}
                        />

                        {error && <p className={styles.error}>⚠️ {error}</p>}

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
                            <span className={styles.outputLabel}>
                                {active === 'summarize' ? '📋 Summary' : active === 'flashcards' ? '🃏 Flashcards' : '📝 Practice Questions'}
                            </span>
                            {output && <span className="badge badge-green">✓ Generated</span>}
                        </div>

                        {output ? (
                            renderOutput()
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    {active === 'summarize' ? '📄' : active === 'flashcards' ? '🃏' : '📖'}
                                </div>
                                <p>Your {activeTool.label} output will appear here.</p>
                                <p>Paste notes on the left and click <strong>{activeTool.buttonLabel}</strong>.</p>
                            </div>
                        )}
                    </div>
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
