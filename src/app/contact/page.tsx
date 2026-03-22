'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Gift, ClipboardList, Clock, Globe, Facebook, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [emailSignup, setEmailSignup] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [signedUp, setSignedUp] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const mailto = `mailto:gavishka.20220340@iit.ac.lk?subject=${encodeURIComponent(form.subject || 'Message from ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
        window.location.href = mailto;
        setSubmitted(true);
    }

    return (
        <div className={styles.page}>
            <div className={styles.header} style={{ position: 'relative' }}>

                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> Get In Touch</div>
                    <h1 className={styles.title}>
                        We&apos;d Love to <span className="gradient-text">Hear From You</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Questions, feedback, or partnership inquiries: we&apos;re here to help students study smarter.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.wrap}>
                        {/* Subscriptions - Primary Action */}
                        <div className={styles.subscriptionWrapper}>
                            <div className={`glass-card ${styles.magnetCard} ${styles.primaryCard}`}>
                                <div className={styles.magnetHeader}>
                                    <span className={styles.magnetEmoji}><Gift size={64} color="#818cf8" strokeWidth={1.5} /></span>
                                    <div>
                                        <h2 className={styles.magnetTitle}>Subscribe & Support</h2>
                                        <p className={styles.magnetSub}>Join our community to get the latest AI study tips, resources, and priority support.</p>
                                    </div>
                                </div>
                                <div className={styles.actionArea}>
                                    <a
                                        href="https://forms.gle/iRyNiwRdFracCCg89"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '20px', fontSize: '1.2rem', fontWeight: 700 }}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                                            Subscribe via Form <ExternalLink size={20} />
                                        </span>
                                    </a>
                                    <div className={styles.features}>
                                        <ul className={styles.featureList}>
                                            <li><CheckCircle2 size={20} color="#34d399" /> <span>Weekly AI study tips & tricks</span></li>
                                            <li><CheckCircle2 size={20} color="#34d399" /> <span>Priority community support</span></li>
                                            <li><CheckCircle2 size={20} color="#34d399" /> <span>Early access to new AI tools</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div className={`glass-card ${styles.socialCard}`}>
                                <h3 className={styles.infoTitle}>Follow Our Community</h3>
                                <div className={styles.socials}>
                                    {[
                                        { icon: <Facebook size={20} />, label: 'Facebook', handle: 'StudyBoost AI' },
                                        { icon: <Instagram size={20} />, label: 'Instagram', handle: '@studyboostai' },
                                        { icon: <Linkedin size={20} />, label: 'LinkedIn', handle: 'StudyBoost AI' },
                                        { icon: <Youtube size={20} />, label: 'YouTube', handle: 'StudyBoost AI' },
                                    ].map((s) => (
                                        <a key={s.label} href="#" className={styles.socialItem}>
                                            <span className={styles.socialIcon}>{s.icon}</span>
                                            <div>
                                                <div className={styles.socialLabel}>{s.label}</div>
                                                <div className={styles.socialHandle}>{s.handle}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
