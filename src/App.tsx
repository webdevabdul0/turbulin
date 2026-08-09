import React, { useEffect, useLayoutEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

// Prevent browser from restoring scroll position on SPA navigation
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const scrollToTop = () => {
  document.documentElement.style.scrollBehavior = 'auto';
  void document.documentElement.offsetHeight; // force reflow so style applies before scroll
  window.scrollTo(0, 0);
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = '';
  }, 50);
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  // Runs synchronously after DOM update, before paint and before GSAP cleanup —
  // guarantees scroll reset happens before anything else can override it.
  useLayoutEffect(() => {
    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    const target = sessionStorage.getItem('scrollTarget');
    if (pathname === '/' && target) {
      sessionStorage.removeItem('scrollTarget');
      const id = setTimeout(() => {
        ScrollTrigger.refresh();
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => clearTimeout(id);
  }, [pathname]);

  return null;
};

const Layout: React.FC = () => (
  <div
    className="min-h-screen antialiased"
    style={{ backgroundColor: 'var(--bg)', color: 'var(--text)', fontFamily: 'var(--font)' }}
  >
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  </div>
);

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
