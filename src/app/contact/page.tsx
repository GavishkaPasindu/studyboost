'use client';

import { useState } from 'react';
import { Mail, CheckCircle2, Gift, Download, Clock, Globe, Twitter, Instagram, Linkedin } from 'lucide-react';
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
        const mailto = `mailto:hello@studyboost.ai?subject=${encodeURIComponent(form.subject || 'Message from ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
        window.location.href = mailto;
        setSubmitted(true);
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className="container">
                    <div className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> Get In Touch</div>
                    <h1 className={styles.title}>
                        We&apos;d Love to <span className="gradient-text">Hear From You</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Questions, feedback, or partnership inquiries — we&apos;re here to help students study smarter.
                    </p>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className={styles.wrap}>
                        {/* Contact Form */}
                        <div className={styles.formSection}>
                            <h2 className={styles.sectionTitle}>Send a Message</h2>
                            {submitted ? (
                                <div className={styles.successBox}>
                                    <span className={styles.successIcon}><CheckCircle2 size={32} /></span>
                                    <h3>Message Sent!</h3>
                                    <p>Your default email client has opened with your message pre-filled. Thank you for reaching out — we&apos;ll respond within 24 hours.</p>
                                    <button className="btn-outline" onClick={() => setSubmitted(false)}>Send Another</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                                    <div className={styles.row}>
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="name">Full Name *</label>
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                className="input-field"
                                                placeholder="Alex Johnson"
                                                value={form.name}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label className={styles.label} htmlFor="email">Email Address *</label>
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                className="input-field"
                                                placeholder="alex@university.edu"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="subject">Subject</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            className="input-field"
                                            value={form.subject}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select a topic…</option>
                                            <option>General Enquiry</option>
                                            <option>Premium Plan Upgrade</option>
                                            <option>Technical Support</option>
                                            <option>Partnership / Collaboration</option>
                                            <option>Press / Media</option>
                                        </select>
                                    </div>
                                    <div className={styles.field}>
                                        <label className={styles.label} htmlFor="message">Message *</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="input-field"
                                            placeholder="Tell us how we can help you…"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows={6}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn-primary" id="contact-submit">
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Mail size={18} /> Send Message</span>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Right side */}
                        <div className={styles.infoSection}>
                            {/* Lead Magnet */}
                            <div className={`glass-card ${styles.magnetCard}`}>
                                <div className={styles.magnetHeader}>
                                    <span className={styles.magnetEmoji}><Gift size={32} color="#818cf8" strokeWidth={1.5} /></span>
                                    <div>
                                        <h3 className={styles.magnetTitle}>Free AI Study Guide</h3>
                                        <p className={styles.magnetSub}>Get our 20-page guide to mastering any subject with AI — absolutely free.</p>
                                    </div>
                                </div>
                                {signedUp ? (
                                    <div className={styles.signupSuccess}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><CheckCircle2 size={16} color="#34d399" /> Check your inbox! The guide is on its way.</span>
                                    </div>
                                ) : (
                                    <div className={styles.magnetForm}>
                                        <input
                                            type="email"
                                            className="input-field"
                                            placeholder="your@email.com"
                                            value={emailSignup}
                                            onChange={(e) => setEmailSignup(e.target.value)}
                                            aria-label="Email for free study guide"
                                            id="lead-magnet-email"
                                        />
                                        <button
                                            className="btn-primary btn-sm"
                                            onClick={() => { if (emailSignup) setSignedUp(true); }}
                                            id="lead-magnet-btn"
                                        >
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}><Download size={18} /> Get Free Guide</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Contact info */}
                            <div className={`glass-card ${styles.infoCard}`}>
                                <h3 className={styles.infoTitle}>Contact Information</h3>
                                <div className={styles.infoItems}>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><Mail size={24} /></span>
                                        <div>
                                            <div className={styles.infoLabel}>Email</div>
                                            <a href="mailto:hello@studyboost.ai">hello@studyboost.ai</a>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><Clock size={24} /></span>
                                        <div>
                                            <div className={styles.infoLabel}>Response Time</div>
                                            <span>Within 24 hours</span>
                                        </div>
                                    </div>
                                    <div className={styles.infoItem}>
                                        <span className={styles.infoIcon}><Globe size={24} /></span>
                                        <div>
                                            <div className={styles.infoLabel}>Headquartered</div>
                                            <span>London, United Kingdom</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div className={`glass-card ${styles.socialCard}`}>
                                <h3 className={styles.infoTitle}>Follow Us</h3>
                                <div className={styles.socials}>
                                    {[
                                        { icon: <Twitter size={20} />, label: 'Twitter / X', handle: '@StudyBoostAI' },
                                        { icon: <Instagram size={20} />, label: 'Instagram', handle: '@studyboostai' },
                                        { icon: <Linkedin size={20} />, label: 'LinkedIn', handle: 'StudyBoost AI' },
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
