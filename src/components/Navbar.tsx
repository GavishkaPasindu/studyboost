'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/ThemeContext';
import styles from './Navbar.module.css';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/ai-tools', label: 'AI Tools' },
    { href: '/features', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={styles.nav}>
            <div className={styles.inner}>
                {/* Logo */}
                <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
                    <span className={styles.logoIcon}>⚡</span>
                    <span className={styles.logoText}>
                        StudyBoost <span className={styles.logoAI}>AI</span>
                    </span>
                </Link>

                {/* Desktop links */}
                <ul className={styles.links}>
                    {navLinks.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle */}
                <button
                    className={styles.themeToggle}
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <span className={styles.toggleTrack}>
                        <span className={styles.toggleThumb}>
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </span>
                    </span>
                </button>

                {/* CTA */}
                <Link href="/ai-tools" className={`btn-primary btn-sm ${styles.cta}`}>
                    Try Free ✨
                </Link>

                {/* Hamburger */}
                <button
                    className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
                {navLinks.map((l) => (
                    <Link
                        key={l.href}
                        href={l.href}
                        className={`${styles.mobileLink} ${pathname === l.href ? styles.active : ''}`}
                        onClick={() => setOpen(false)}
                    >
                        {l.label}
                    </Link>
                ))}
                <div className={styles.mobileThemeRow}>
                    <span className={styles.mobileThemeLabel}>
                        {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </span>
                    <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
                        <span className={styles.toggleTrack}>
                            <span className={styles.toggleThumb}>{theme === 'dark' ? '🌙' : '☀️'}</span>
                        </span>
                    </button>
                </div>
                <Link href="/ai-tools" className="btn-primary" onClick={() => setOpen(false)}>
                    Try Free ✨
                </Link>
            </div>
        </nav>
    );
}
