'use client';
import { useEffect } from 'react';

export default function useScrollReveal() {
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        // Don't unobserve - lets class stay
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        const els = document.querySelectorAll('[data-reveal]');
        els.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);
}
