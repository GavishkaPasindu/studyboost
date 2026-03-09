import type { Metadata } from 'next';
import Link from 'next/link';
import { Zap, CheckCircle2, ShieldCheck, HelpCircle, Coins } from 'lucide-react';
import styles from './PricingPage.module.css';

export const metadata: Metadata = {
    title: 'Pricing – StudyBoost AI',
    description:
        'Choose the best StudyBoost AI plan. Free AI summaries or Premium unlimited access with flashcards, exam prep, and priority support.',
    keywords: [
        'AI study pricing',
        'free AI study tools',
        'premium AI study assistant',
        'student AI subscription',
    ],
};

const plans = [
    {
        name: 'Free',
        icon: <Coins size={32} />,
        price: '$0',
        per: 'forever',
        badge: null,
        desc: 'Perfect for trying out AI-powered studying with no commitment.',
        features: [
            '✅ 3 AI requests per day',
            '✅ Note summarisation tool',
            '✅ Access via web browser',
            '✅ Mobile responsive',
            '❌ Flashcard generator',
            '❌ Exam question generator',
            '❌ Priority support',
            '❌ Unlimited usage',
        ],
        cta: 'Get Started Free',
        ctaHref: '/ai-tools',
        primary: false,
    },
    {
        name: 'Premium',
        icon: <Zap size={32} />,
        oldPrice: '$10',
        price: '$4.99',
        per: 'per month',
        badge: '🔥 Most Popular',
        desc: 'For serious students who want unlimited AI study power across all tools.',
        features: [
            '✅ Unlimited AI requests',
            '✅ Note summarisation',
            '✅ Flashcard generator',
            '✅ Exam question generator',
            '✅ Priority support',
            '✅ All future features',
            '✅ Export to PDF',
            '✅ Study history & favourites',
        ],
        cta: 'Upgrade Now',
        ctaHref: '/contact',
        primary: true,
    },
];

const faqs = [
    {
        q: 'Is the free plan really free?',
        a: 'Yes! The free plan is completely free, forever. You get 3 AI requests per day with access to note summarisation.',
    },
    {
        q: 'What AI model powers StudyBoost AI?',
        a: 'StudyBoost AI is powered by Google Gemini - one of the most advanced AI models available, capable of understanding complex academic content.',
    },
    {
        q: 'Can I cancel my Premium plan anytime?',
        a: 'Absolutely. There are no contracts or commitments. Cancel anytime with a single click from your account settings.',
    },
    {
        q: 'Is my data safe?',
        a: 'Yes. Your lecture notes are sent directly to the Gemini API and are never stored on our servers. We take your privacy seriously.',
    },
];

export default function PricingPage() {
    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Coins size={14} /> Simple Pricing</div>
                    <h1 className={styles.title}>
                        Study Smarter for <span className="gradient-text">Every Budget</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Start free, upgrade when you need more. No hidden fees, no surprises.
                    </p>
                </div>
            </div>

            {/* Plans */}
            <section className="section">
                <div className="container">
                    <div className={styles.plans}>
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`glass-card ${styles.plan} ${plan.primary ? styles.planPrimary : ''}`}
                            >
                                {plan.badge && <div className={styles.planBadge}>{plan.badge}</div>}
                                <div className={styles.planHeader}>
                                    <span className={styles.planIcon}>{plan.icon}</span>
                                    <h2 className={styles.planName}>{plan.name}</h2>
                                </div>
                                <div className={styles.priceRow}>
                                    {plan.oldPrice && <span className={styles.oldPrice}>{plan.oldPrice}</span>}
                                    <span className={styles.price}>{plan.price}</span>
                                    <span className={styles.per}>/{plan.per}</span>
                                </div>
                                <p className={styles.planDesc}>{plan.desc}</p>
                                <ul className={styles.featureList}>
                                    {plan.features.map((f) => (
                                        <li key={f} className={`${styles.feature} ${f.startsWith('❌') ? styles.featureNo : ''}`}>
                                            {f.startsWith('✅') && <CheckCircle2 size={16} color="#34d399" style={{ flexShrink: 0 }} />}
                                            {f.replace(/^[✅❌]\s*/, '')}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href={plan.ctaHref}
                                    className={plan.primary ? 'btn-primary' : 'btn-outline'}
                                    style={{ display: 'block', textAlign: 'center' }}
                                >
                                    {plan.cta}
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Guarantee */}
                    <div className={styles.guarantee}>
                        <span className={styles.guaranteeIcon}><ShieldCheck size={32} color="#10b981" /></span>
                        <div>
                            <strong>30-Day Money-Back Guarantee</strong>
                            <p>Not happy with Premium? Get a full refund within 30 days - no questions asked.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section-sm">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><HelpCircle size={14} /> FAQ</div>
                        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
                    </div>
                    <div className={styles.faqs}>
                        {faqs.map((faq) => (
                            <div key={faq.q} className={`glass-card ${styles.faq}`}>
                                <h3 className={styles.faqQ}>{faq.q}</h3>
                                <p className={styles.faqA}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
