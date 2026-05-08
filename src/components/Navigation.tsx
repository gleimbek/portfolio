import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(249,249,248,0.92)] backdrop-blur-xl border-b border-[rgba(232,232,231,0.6)]'
            : 'bg-transparent'
        }`}
        style={{ height: 80 }}
      >
        <div className="flex items-center justify-between h-full max-w-[1280px] mx-auto px-6 lg:px-20">
          {/* Name Mark */}
          <span className="text-[13px] font-bold tracking-[0.12em] text-[#1A1A1A]">
            GUSTAVO LEIMBEK
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-[#2B6CB0] border-b-2 border-[#2B6CB0] pb-0.5'
                    : 'text-[#6B6B6B] hover:text-[#2B6CB0]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <a
            href="mailto:gleimbek@gmail.com"
            className="hidden md:inline-flex items-center px-6 py-2.5 bg-[#1A1A1A] text-[#F9F9F8] text-[13px] font-semibold tracking-[0.08em] rounded transition-colors duration-250 hover:bg-[#2B6CB0]"
          >
            Hire Me
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F9F9F8] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-semibold text-[#1A1A1A] hover:text-[#2B6CB0] transition-colors duration-200"
              style={{
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.3s ease ${index * 0.08}s`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:gleimbek@gmail.com"
            className="mt-4 px-8 py-3 bg-[#1A1A1A] text-[#F9F9F8] text-lg font-semibold rounded hover:bg-[#2B6CB0] transition-colors duration-250"
            style={{
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.3s ease ${navLinks.length * 0.08}s`,
            }}
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  );
}
