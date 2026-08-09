import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import { Footer } from '../components/Footer';

const serviceOptions = [
  'Product Engineering',
  'AI Systems',
  'Cloud Infrastructure',
  'Data & Analytics',
  'UX / Product Design',
  'Healthcare Technology',
];

const inputStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: '1px solid #2e2e2e',
  color: '#f0f0f0',
  fontFamily: 'var(--font)',
};

const labelStyle: React.CSSProperties = {
  color: '#666',
  fontFamily: 'var(--font)',
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    service: '', goal: '', firstName: '', lastName: '', email: '', company: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#FF8D00';
    e.currentTarget.style.outline = 'none';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = '#2e2e2e';
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-dark)', fontFamily: 'var(--font)' }} className="min-h-screen">

      {/* ── Split layout ── */}
      <div className="flex flex-col">

        {/* Top: image + form side by side */}
        <div className="flex flex-col lg:flex-row">

          {/* LEFT — image, matches form height */}
          <div className="relative lg:w-1/2 h-72 lg:h-auto overflow-hidden">
            <img
              src="/assets/services/cloud-infrastructure.png"
              alt="Turbulin — contact"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-24 lg:hidden"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-dark))' }} />
          </div>

          {/* RIGHT — heading + form only */}
          <div className="lg:w-1/2 flex flex-col">
          <div className="flex-1 px-8 lg:px-14 xl:px-20 pt-28 lg:pt-36 pb-16 space-y-12">

            {/* Heading block */}
            <div className="space-y-4">
              <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-xs font-light tracking-[0.22em] uppercase">
                Get in touch
              </span>
              <h1 style={{ color: 'var(--text-on-dark)' }}
                className="text-4xl sm:text-5xl font-normal leading-[1.06] tracking-tight">
                Let's get<br />
                <span style={{
                  background: 'linear-gradient(135deg, #FF8D00, #FF140A)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  in touch.
                </span>
              </h1>
              <p style={{ color: 'var(--text-muted-on-dark)' }} className="text-base font-normal leading-relaxed max-w-sm">
                Whether you have a fully formed brief or just a rough idea — tell us what
                you're trying to build. We'll respond within 24 hours.
              </p>
            </div>

            {/* Dark form */}
            <div>
              {submitted ? (
                <div className="text-center py-20 space-y-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
                    style={{ background: 'rgba(255,141,0,0.1)', border: '1px solid rgba(255,141,0,0.3)' }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: '#FF8D00' }} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-normal mb-2" style={{ color: 'var(--text-on-dark)' }}>Message received.</h3>
                    <p className="text-base font-normal" style={{ color: 'var(--text-muted-on-dark)' }}>We'll get back to you within 24 hours.</p>
                  </div>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ service: '', goal: '', firstName: '', lastName: '', email: '', company: '', message: '' }); }}
                    className="px-6 py-2.5 rounded-full text-sm font-normal transition-colors"
                    style={{ color: 'var(--text-muted-on-dark)', border: '1px solid #2e2e2e' }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                      Service you need <span style={{ color: '#FF140A' }}>*</span>
                    </label>
                    <select
                      name="service" required value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors appearance-none"
                      style={{ ...inputStyle, color: formData.service ? '#f0f0f0' : '#555' }}
                      onFocus={focusStyle} onBlur={blurStyle}
                    >
                      <option value="" disabled style={{ color: '#555', backgroundColor: '#1a1a1a' }}>Select a service...</option>
                      {serviceOptions.map(s => <option key={s} value={s} style={{ color: '#f0f0f0', backgroundColor: '#1a1a1a' }}>{s}</option>)}
                      <option value="Other" style={{ color: '#f0f0f0', backgroundColor: '#1a1a1a' }}>Other / Not sure</option>
                    </select>
                  </div>

                  {/* Goal */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                      Your challenge / goal <span style={{ color: '#FF140A' }}>*</span>
                    </label>
                    <input
                      type="text" name="goal" required value={formData.goal} onChange={handleChange}
                      placeholder="e.g. Build a patient management platform"
                      className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                      style={{ ...inputStyle }}
                      onFocus={focusStyle} onBlur={blurStyle}
                    />
                  </div>

                  {/* First + Last */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                        First Name <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ ...inputStyle }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                        Last Name <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ ...inputStyle }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                  </div>

                  {/* Email + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                        Email Address <span style={{ color: '#FF140A' }}>*</span>
                      </label>
                      <input
                        type="email" name="email" required value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ ...inputStyle }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                        Company Name
                      </label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                        style={{ ...inputStyle }}
                        onFocus={focusStyle} onBlur={blurStyle}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase" style={labelStyle}>
                      Tell us more
                    </label>
                    <textarea
                      name="message" rows={5} value={formData.message} onChange={handleChange}
                      placeholder="What are you building? Where are you in the process? What's your timeline?"
                      className="w-full px-4 py-3 rounded-xl text-sm font-normal focus:outline-none transition-colors"
                      style={{ ...inputStyle, resize: 'none' }}
                      onFocus={focusStyle} onBlur={blurStyle}
                    />
                  </div>

                  <p className="text-xs font-normal leading-relaxed" style={{ color: '#555' }}>
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

        {/* ── Full-width contact details strip ── */}
        <div style={{ borderTop: '1px solid #1e1e1e' }} className="px-8 lg:px-20 py-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#141414', border: '1px solid #242424' }}>
                <Mail className="w-4 h-4" style={{ color: '#FF8D00' }} />
              </div>
              <div>
                <div style={{ color: '#555' }} className="text-xs font-light tracking-wider uppercase mb-1">Email</div>
                <a href="mailto:hello@turbulin.io" style={{ color: 'var(--text-muted-on-dark)' }}
                  className="text-sm font-normal hover:text-white transition-colors">
                  hello@turbulin.io
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#141414', border: '1px solid #242424' }}>
                <MapPin className="w-4 h-4" style={{ color: '#FF8D00' }} />
              </div>
              <div>
                <div style={{ color: '#555' }} className="text-xs font-light tracking-wider uppercase mb-1">Location</div>
                <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-normal">London, United Kingdom</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#141414', border: '1px solid #242424' }}>
                <Clock className="w-4 h-4" style={{ color: '#FF8D00' }} />
              </div>
              <div>
                <div style={{ color: '#555' }} className="text-xs font-light tracking-wider uppercase mb-1">Response time</div>
                <span style={{ color: 'var(--text-muted-on-dark)' }} className="text-sm font-normal">Within 24 hours</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};
