import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';

const services = [
  'Product Engineering',
  'AI Systems',
  'Cloud Infrastructure',
  'Data & Analytics',
  'UX / Product Design',
  'Healthcare Technology',
];

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    goal: '', service: '', firstName: '', lastName: '', email: '', company: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', fontFamily: 'var(--font)' }} className="min-h-screen">

      {/* ── Main layout ── */}
      <div className="relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-[-80px] left-[-80px] w-[700px] h-[700px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,141,0,0.15) 0%, rgba(255,141,0,0.05) 40%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute bottom-0 right-[-80px] w-[600px] h-[600px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,20,10,0.13) 0%, rgba(255,20,10,0.04) 40%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="absolute top-[50%] left-[40%] w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(255,80,0,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20 min-h-screen items-start pt-36 pb-24">

            {/* Left — info */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-36">
              <div className="space-y-6">
                <div data-reveal>
                  <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-[0.22em] uppercase">
                    Get in touch
                  </span>
                </div>
                <h1 style={{ color: 'var(--text-on-dark)' }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-tight">
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
                </h1>
                <p style={{ color: 'var(--text-muted-on-dark)' }} className="text-base font-normal leading-relaxed max-w-sm">
                  Whether you have a fully formed brief or just a rough idea — tell us what you're
                  trying to build. We'll respond within 24 hours.
                </p>
              </div>

              {/* Contact details */}
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-dark-3)', border: '1px solid var(--border-dark)' }}>
                    <Mail className="w-4 h-4" style={{ color: '#FF8D00' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-subtle-on-dark)' }} className="text-xs font-light tracking-wider uppercase mb-0.5">Email</div>
                    <a href="mailto:hello@turbulin.io" style={{ color: 'var(--text-on-dark)' }}
                      className="text-sm font-normal hover:opacity-75 transition-opacity">
                      hello@turbulin.io
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-dark-3)', border: '1px solid var(--border-dark)' }}>
                    <MapPin className="w-4 h-4" style={{ color: '#FF8D00' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-subtle-on-dark)' }} className="text-xs font-light tracking-wider uppercase mb-0.5">Location</div>
                    <span style={{ color: 'var(--text-on-dark)' }} className="text-sm font-normal">London, United Kingdom</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--bg-dark-3)', border: '1px solid var(--border-dark)' }}>
                    <Clock className="w-4 h-4" style={{ color: '#FF8D00' }} />
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-subtle-on-dark)' }} className="text-xs font-light tracking-wider uppercase mb-0.5">Response time</div>
                    <span style={{ color: 'var(--text-on-dark)' }} className="text-sm font-normal">Within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Services we offer */}
              <div className="pt-2">
                <div style={{ color: 'var(--text-subtle-on-dark)' }} className="text-xs font-light tracking-[0.18em] uppercase mb-4">
                  Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <span key={s}
                      className="text-xs font-normal px-3 py-1.5 rounded-full"
                      style={{ color: 'var(--text-muted-on-dark)', backgroundColor: 'var(--bg-dark-3)', border: '1px solid var(--border-dark)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — form card */}
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <div
                className="rounded-3xl p-8 lg:p-10"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}
              >
                {submitted ? (
                  <div className="text-center py-20 space-y-6">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                      style={{ background: 'rgba(255,141,0,0.1)', border: '1px solid rgba(255,141,0,0.3)' }}>
                      <CheckCircle2 className="w-8 h-8" style={{ color: '#FF8D00' }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-normal mb-2" style={{ color: '#111' }}>Message received.</h3>
                      <p className="text-base font-normal" style={{ color: '#666' }}>We'll get back to you within 24 hours.</p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ goal: '', service: '', firstName: '', lastName: '', email: '', company: '', message: '' }); }}
                      className="px-6 py-2.5 rounded-full text-sm font-normal transition-colors"
                      style={{ color: '#555', border: '1px solid #ddd' }}
                    >
                      Send another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="pb-2">
                      <h2 className="text-2xl font-normal mb-1" style={{ color: '#111' }}>Tell us about your project</h2>
                      <p className="text-sm font-normal" style={{ color: '#888' }}>Fill in the details below and we'll get back to you shortly.</p>
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                        Service you need <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <select
                        name="service" required value={formData.service} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors appearance-none"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: formData.service ? '#111' : '#aaa' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      >
                        <option value="" disabled>Select a service...</option>
                        {services.map(s => <option key={s} value={s} style={{ color: '#111' }}>{s}</option>)}
                        <option value="Other" style={{ color: '#111' }}>Other / Not sure</option>
                      </select>
                    </div>

                    {/* Goal */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                        Your challenge / goal <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="text" name="goal" required value={formData.goal} onChange={handleChange}
                        placeholder="e.g. Build a patient management platform"
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>

                    {/* First + Last name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                          First Name <span style={{ color: '#FF140A' }}>*</span>
                        </label>
                        <input
                          type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                          style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111' }}
                          onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                          onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                          Last Name <span style={{ color: '#FF140A' }}>*</span>
                        </label>
                        <input
                          type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                          style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111' }}
                          onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                          onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                        />
                      </div>
                    </div>

                    {/* Email + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                          Email Address <span style={{ color: '#FF140A' }}>*</span>
                        </label>
                        <input
                          type="email" name="email" required value={formData.email} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                          style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111' }}
                          onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                          onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                          Company Name
                        </label>
                        <input
                          type="text" name="company" value={formData.company} onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                          style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111' }}
                          onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                          onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={{ color: '#888' }}>
                        Tell us more
                      </label>
                      <textarea
                        name="message" rows={5} value={formData.message} onChange={handleChange}
                        placeholder="What are you building? Where are you in the process? What's your timeline?"
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ backgroundColor: '#f7f7f7', border: '1px solid #e8e8e8', color: '#111', resize: 'none' }}
                        onFocus={e => e.currentTarget.style.borderColor = '#FF8D00'}
                        onBlur={e => e.currentTarget.style.borderColor = '#e8e8e8'}
                      />
                    </div>

                    <p className="text-xs font-normal leading-relaxed" style={{ color: '#aaa' }}>
                      By submitting you agree to our privacy policy. We'll only use your information to respond to your enquiry.
                    </p>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
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
      </div>

      <Footer />
    </div>
  );
};
