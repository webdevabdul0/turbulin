import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

const TurbulinLogo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    width="120"
    height="28"
    viewBox="0 0 661 152"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Letter paths — white on dark background */}
    <path d="M631.941 52.5903C640.444 52.5903 647.256 55.2958 652.378 60.7069C657.499 66.0214 660.059 73.2683 660.059 82.4479V126.944H647.45V83.1726C647.45 77.2783 645.855 72.7369 642.667 69.5482C639.478 66.2629 635.081 64.6203 629.477 64.6203C623.196 64.6203 618.123 66.6011 614.258 70.5628C610.393 74.4279 608.461 80.4187 608.461 88.5353V126.944H595.851V54.4745H608.461V64.9101C613.582 56.6969 621.409 52.5903 631.941 52.5903Z" fill="white"/>
    <path d="M570.381 41.2848C567.965 41.2848 565.936 40.4634 564.293 38.8208C562.65 37.1781 561.829 35.1973 561.829 32.8783C561.829 30.5592 562.65 28.5784 564.293 26.9357C565.936 25.1964 567.965 24.3268 570.381 24.3268C572.7 24.3268 574.68 25.1964 576.323 26.9357C577.966 28.5784 578.787 30.5592 578.787 32.8783C578.787 35.1973 577.966 37.1781 576.323 38.8208C574.68 40.4634 572.7 41.2848 570.381 41.2848ZM564.003 126.944V54.4743H576.613V126.944H564.003Z" fill="white"/>
    <path d="M532.156 126.944V21.1379H544.766V126.944H532.156Z" fill="white"/>
    <path d="M500.349 54.4741H512.959V126.944H500.349V116.508C495.228 124.722 487.401 128.828 476.869 128.828C468.366 128.828 461.554 126.171 456.432 120.857C451.311 115.445 448.75 108.15 448.75 98.9706V54.4741H461.36V98.2459C461.36 104.14 462.955 108.73 466.143 112.015C469.332 115.204 473.728 116.798 479.333 116.798C485.614 116.798 490.686 114.866 494.551 111.001C498.417 107.039 500.349 101 500.349 92.8832V54.4741Z" fill="white"/>
    <path d="M398.628 52.5899C408.774 52.5899 417.422 56.31 424.573 63.7503C431.723 71.0939 435.298 80.0802 435.298 90.7091C435.298 101.338 431.723 110.373 424.573 117.813C417.422 125.156 408.774 128.828 398.628 128.828C386.647 128.828 377.515 124.045 371.235 114.479V126.944H358.625V25.4862H371.235V66.939C377.515 57.3729 386.647 52.5899 398.628 52.5899ZM397.034 116.653C404.281 116.653 410.369 114.189 415.296 109.261C420.224 104.237 422.688 98.0527 422.688 90.7091C422.688 83.3655 420.224 77.2297 415.296 72.3017C410.369 67.2771 404.281 64.7649 397.034 64.7649C389.69 64.7649 383.555 67.2771 378.627 72.3017C373.699 77.2297 371.235 83.3655 371.235 90.7091C371.235 98.0527 373.699 104.237 378.627 109.261C383.555 114.189 389.69 116.653 397.034 116.653Z" fill="white"/>
    <path d="M323.676 66.6493C327.831 57.663 335.368 53.1699 346.287 53.1699V66.3594C340.103 66.0695 334.788 67.7122 330.343 71.2873C325.899 74.8625 323.676 80.6118 323.676 88.5352V126.944H311.066V54.4743H323.676V66.6493Z" fill="white"/>
    <path d="M279.259 54.4741H291.869V126.944H279.259V116.508C274.138 124.722 266.311 128.828 255.779 128.828C247.276 128.828 240.464 126.171 235.342 120.857C230.221 115.445 227.661 108.15 227.661 98.9706V54.4741H240.27V98.2459C240.27 104.14 241.865 108.73 245.053 112.015C248.242 115.204 252.639 116.798 258.243 116.798C264.524 116.798 269.597 114.866 273.462 111.001C277.327 107.039 279.259 101 279.259 92.8832V54.4741Z" fill="white"/>
    <path d="M194.625 54.4738H239.92V66.6496H194.625V105.928C194.625 109.503 195.301 112.064 196.654 113.61C198.103 115.059 200.277 115.832 203.176 115.929C206.075 115.929 209.65 115.832 213.902 115.639V126.945C202.886 128.394 194.818 127.524 189.697 124.335C184.576 121.05 182.015 114.914 182.015 105.928V66.6496H182.13V66.5344H194.524V54.5588H182.13V54.4738H182.015V37.9514L194.625 26.8293V54.4738Z" fill="white"/>
    {/* Logo mark — brand colors */}
    <path d="M29.9217 98.3689C29.9217 96.1007 28.083 94.262 25.8148 94.262H0L0 62.5802L25.8148 62.5802C45.5803 62.5802 61.6035 78.6033 61.6035 98.3689L61.6035 139.438L29.9217 151.759L29.9217 98.3689Z" fill="#FF140A"/>
    <path d="M93.2844 98.3691C93.2844 96.1009 95.1231 94.2622 97.3913 94.2622H123.206V62.5804L97.3913 62.5804C77.6257 62.5804 61.6026 78.6035 61.6026 98.3691L61.6026 139.438L93.2844 128.291L93.2844 98.3691Z" fill="#FF140A"/>
    <path d="M1.16857 25.0586L0.0501771 58.3497C0.0262676 59.0614 0.732807 59.5693 1.39982 59.32L61.2532 36.9417C61.4791 36.8572 61.7278 36.8572 61.9537 36.9417L121.807 59.32C122.474 59.5693 123.181 59.0614 123.157 58.3497L122.038 25.0586C122.025 24.6634 121.78 24.3131 121.414 24.165L61.9781 0.151322C61.7378 0.0542329 61.4691 0.0542329 61.2288 0.151322L1.7934 24.165C1.42676 24.3131 1.18185 24.6634 1.16857 25.0586Z" fill="#FF8D00"/>
  </svg>
);

type NavLink =
  | { label: string; section: string; to?: never; href?: never }
  | { label: string; to: string; section?: never; href?: never };

const navLinks: NavLink[] = [
  { label: 'Services', section: 'services' },
  { label: 'Projects', section: 'projects' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    setMobileOpen(false);
    if (isHome) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // On non-home pages, always show the solid bg
  const showSolid = isScrolled || !isHome;

  return (
    <header
      style={{
        backgroundColor: showSolid ? 'rgba(10,10,10,0.95)' : 'transparent',
        borderBottomColor: showSolid ? '#242424' : 'transparent',
        backdropFilter: showSolid ? 'blur(12px)' : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 lg:h-[70px]">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <TurbulinLogo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ fontFamily: 'var(--font)', color: 'rgba(255,255,255,0.75)' }}
                  className="text-sm font-medium tracking-wide hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.section}
                  onClick={() => scrollToSection(link.section!)}
                  style={{ fontFamily: 'var(--font)', color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  className="text-sm font-medium tracking-wide hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </button>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
              className="px-6 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{ backgroundColor: '#0A0A0A', borderTopColor: '#242424' }}
          className="lg:hidden border-t px-6 py-6 space-y-4"
        >
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{ color: 'rgba(255,255,255,0.75)' }}
                className="block text-base font-medium tracking-wide hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section!)}
                style={{ color: 'rgba(255,255,255,0.75)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                className="block text-base font-medium tracking-wide hover:text-white transition-colors"
              >
                {link.label}
              </button>
            )
          )}
          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            style={{ background: 'linear-gradient(135deg, #FF8D00, #FF140A)' }}
            className="inline-block mt-2 px-6 py-2.5 rounded-full text-white text-sm font-semibold tracking-wide"
          >
            Get in touch
          </Link>
        </div>
      )}
    </header>
  );
};
