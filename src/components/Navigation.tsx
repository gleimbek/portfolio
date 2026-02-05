import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  onNavigate: (section: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    onNavigate(section);
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="bg-[#0B0B0D]/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between px-6 lg:px-12 py-4">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('hero')}
              className="font-display font-bold text-lg tracking-tight text-[#F4F4F5] hover:text-[#E1062C] transition-colors"
            >
              GLEIMBEK
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => handleNavClick('work')}
                className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors link-underline"
              >
                Work
              </button>
              <button 
                onClick={() => handleNavClick('capabilities')}
                className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors link-underline"
              >
                Capabilities
              </button>
              <button 
                onClick={() => handleNavClick('contact')}
                className="text-sm text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors link-underline"
              >
                Contact
              </button>
              <span className="px-3 py-1 text-xs font-mono bg-[#E1062C]/10 text-[#E1062C] rounded-full border border-[#E1062C]/20">
                Available for work
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#F4F4F5]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-[#0B0B0D]/95 backdrop-blur-md border-b border-white/5 transition-all duration-300 ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="flex flex-col p-6 gap-4">
            <button 
              onClick={() => handleNavClick('work')}
              className="text-left text-lg text-[#F4F4F5] py-2"
            >
              Work
            </button>
            <button 
              onClick={() => handleNavClick('capabilities')}
              className="text-left text-lg text-[#F4F4F5] py-2"
            >
              Capabilities
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-left text-lg text-[#F4F4F5] py-2"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Persistent Logo (visible on hero) */}
      <div 
        className={`fixed top-6 left-6 lg:left-12 z-[100] transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="font-display font-bold text-lg tracking-tight text-[#F4F4F5]">
          GLEIMBEK
        </span>
      </div>

      {/* Persistent Menu Button (visible on hero) */}
      <div 
        className={`fixed top-6 right-6 lg:right-12 z-[100] transition-opacity duration-500 ${
          isVisible ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-sm text-[#F4F4F5] hover:text-[#E1062C] transition-colors"
        >
          <span className="hidden sm:inline">Menu</span>
          <Menu size={20} />
        </button>
      </div>
    </>
  );
}
