import Link from 'next/link';
import { Zap, Facebook, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                {/* Brand */}
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}><Zap size={24} strokeWidth={2.5} color="#818cf8" fill="#818cf8" /></span>
                        <span>StudyBoost <strong>AI</strong></span>
                    </Link>
                    <p className={styles.tagline}>
                        Optimizing academic performance through advanced AI synthesis worldwide.
                    </p>
                    <div className={styles.socials}>
                        <a href="#" aria-label="Facebook" className={styles.social}><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram" className={styles.social}><Instagram size={20} /></a>
                        <a href="#" aria-label="LinkedIn" className={styles.social}><Linkedin size={20} /></a>
                        <a href="#" aria-label="YouTube" className={styles.social}><Youtube size={20} /></a>
                    </div>
                </div>

                {/* Product */}
                <div className={styles.col}>
                    <h4>Product</h4>
                    <Link href="/ai-tools">AI Tools</Link>
                    <Link href="/features">Features</Link>
                    <Link href="/pricing">Access Plans</Link>
                    <Link href="/blog">Blog</Link>
                </div>

                {/* Company */}
                <div className={styles.col}>
                    <h4>Company</h4>
                    <Link href="/about">About Us</Link>
                    <Link href="/contact">Contact</Link>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>

                {/* Newsletter */}
                <div className={styles.newsletter}>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Mail size={20} /> Elite Academic Insights
                    </h4>
                    <p>Get AI study tips, resources, and exclusive offers in your inbox.</p>
                    <div className={styles.form}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="input-field"
                            aria-label="Email for newsletter"
                        />
                        <button className="btn-primary btn-sm">Subscribe</button>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.bottomInner}>
                    <p>© 2026 StudyBoost AI. All rights reserved.</p>
                    <p className={styles.external}>
                        Powered by{' '}
                        <a
                            href="/"
                        >
                            StudyBoost AI
                        </a>{' '}
                        &middot;{' '}
                        <a
                            href="https://vercel.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Deployed on Vercel
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
