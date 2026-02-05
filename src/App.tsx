import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import WorkSection from './sections/WorkSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [distortion, setDistortion] = useState(0);
  const [direction, setDirection] = useState({ x: 0, y: 0 });

  const handleDistortionChange = useCallback((newDistortion: number, newDirection: { x: number; y: number }) => {
    setDistortion(newDistortion);
    setDirection(newDirection);
  }, []);

  const handleNavigate = useCallback((section: string) => {
    const sectionMap: Record<string, string> = {
      hero: 'hero-section',
      work: 'work-neon',
      capabilities: 'capabilities-section',
      contact: 'contact-section'
    };

    const targetId = sectionMap[section];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Refresh ScrollTrigger on resize
  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative bg-[#0B0B0D] min-h-screen">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation onNavigate={handleNavigate} />

      {/* Main Content */}
      <main className="relative">
        <HeroSection 
          onDistortionChange={handleDistortionChange}
          distortion={distortion}
          direction={direction}
        />
        <WorkSection 
          onDistortionChange={handleDistortionChange}
          distortion={distortion}
          direction={direction}
        />
        <CapabilitiesSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
