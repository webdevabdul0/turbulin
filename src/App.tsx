import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Let the new page render, then refresh ScrollTrigger so above-fold
    // elements animate in immediately on client-side navigation.
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
