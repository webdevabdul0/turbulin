import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';

export const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    goal: '', firstName: '', lastName: '', email: '', company: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const headerRef = useGsapReveal<HTMLDivElement>({ stagger: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: 'var(--bg-dark)' }}
      className="relative py-28 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-[-80px] left-[-80px] w-[700px] h-[700px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,141,0,0.18) 0%, rgba(255,141,0,0.06) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-[-80px] right-[-80px] w-[650px] h-[650px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,20,10,0.16) 0%, rgba(255,20,10,0.05) 40%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-[40%] left-[35%] w-[500px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,80,0,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

          {/* Left — heading */}
          <div ref={headerRef} className="lg:col-span-5 space-y-8 lg:pt-4">
            <div data-reveal>
              <span style={{ color: 'var(--text-muted-on-dark)', fontFamily: 'var(--font)' }}
                className="text-xs font-light tracking-[0.2em] uppercase">
                Start a project
              </span>
            </div>

            <h2 data-reveal style={{ fontFamily: 'var(--font)' }}
              className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight">
              <span style={{
                background: 'linear-gradient(135deg, #FF8D00, #FF140A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Let's build
              </span>
              <br />
              <span className="text-white">something worth</span>
              <br />
              <span className="text-white">using.</span>
            </h2>

            <p data-reveal style={{ color: 'var(--text-muted-on-dark)', fontFamily: 'var(--font)' }}
              className="text-lg font-normal leading-relaxed max-w-sm">
              Whether you have a fully formed brief or just a rough idea — tell us what you're
              trying to build. We'll respond within 24 hours.
            </p>

            <div data-reveal className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-normal">hello@turbulin.io</span>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-normal">London, UK</span>
              </div>
            </div>
          </div>

          {/* Right — form card */}
          <div className="lg:col-span-7">
            <div
              className="rounded-3xl p-8 lg:p-10"
              style={{
                backgroundColor: '#ffffff',
                boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
              }}
            >
              {submitted ? (
                <div className="text-center py-14 space-y-5">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(255,141,0,0.1)', border: '1px solid rgba(255,141,0,0.3)' }}>
                    <CheckCircle2 className="w-7 h-7" style={{ color: '#FF8D00' }} />
                  </div>
                  <div style={{ fontFamily: 'var(--font)' }}>
                    <h3 className="text-xl font-normal mb-2" style={{ color: '#111' }}>Message received.</h3>
                    <p className="text-sm font-normal" style={{ color: '#666' }}>We'll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ goal: '', firstName: '', lastName: '', email: '', company: '', message: '' }); }}
                    className="px-6 py-2.5 rounded-full text-sm font-normal transition-colors"
                    style={{ color: '#555', border: '1px solid #ddd', fontFamily: 'var(--font)' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Goal */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                      Your challenge / goal <span style={{ color: '#FF140A' }}>*</span>
                    </label>
                    <input
                      type="text" name="goal" required value={formData.goal} onChange={handleChange}
                      placeholder="e.g. Build a patient management platform"
                      className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                      style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)' }}
                      onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                      onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                    />
                  </div>

                  {/* First + Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                        First Name <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                        Last Name <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>
                  </div>

                  {/* Email + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                        Email Address <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                        Company Name
                      </label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888', fontFamily: 'var(--font)' }}>
                      Tell us more
                    </label>
                    <textarea
                      name="message" rows={4} value={formData.message} onChange={handleChange}
                      placeholder="What are you building? Where are you in the process?"
                      className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                      style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', fontFamily: 'var(--font)', resize: 'none' }}
                      onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                      onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                    />
                  </div>

                  <p className="text-xs font-normal leading-relaxed" style={{ color: '#aaa', fontFamily: 'var(--font)' }}>
                    By submitting this form you agree to our privacy policy. We'll only use your information to respond to your enquiry.
                  </p>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)', fontFamily: 'var(--font)' }}
                  >
                    <span>Send message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
