import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import WebGLBackground from '../components/WebGLBackground';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onDistortionChange: (distortion: number, direction: { x: number; y: number }) => void;
  distortion: number;
  direction: { x: number; y: number };
}

export default function HeroSection({ onDistortionChange, distortion, direction }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const subhead = subheadRef.current;
    const bottomLeft = bottomLeftRef.current;
    const bottomRight = bottomRightRef.current;

    if (!section || !headline || !subhead || !bottomLeft || !bottomRight) return;

    const ctx = gsap.context(() => {
      // Split headline into characters
      const chars = headline.innerText.split('');
      headline.innerHTML = chars.map(char => 
        `<span class="inline-block" style="opacity: 0; transform: translateY(24px) rotateX(65deg)">${char === ' ' ? '&nbsp;' : char}</span>`
      ).join('');

      const charSpans = headline.querySelectorAll('span');

      // Load animation timeline
      const loadTl = gsap.timeline({ delay: 0.3 });

      loadTl
        .to(charSpans, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.02,
          ease: 'power3.out'
        })
        .to(subhead, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        }, '-=0.4')
        .to([bottomLeft, bottomRight], {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        }, '-=0.3');

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const normalizedVelocity = Math.min(Math.abs(velocity) / 1000, 1);
            onDistortionChange(
              normalizedVelocity * 0.5,
              { x: velocity > 0 ? 1 : -1, y: 0.3 }
            );
          },
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set(charSpans, { opacity: 1, y: 0, rotateX: 0 });
            gsap.set(subhead, { opacity: 1, y: 0 });
            gsap.set([bottomLeft, bottomRight], { opacity: 1, y: 0 });
            onDistortionChange(0, { x: 0, y: 0 });
          }
        }
      });

      // ENTRANCE (0-30%): Hold visible state
      scrollTl.fromTo(headline, 
        { opacity: 1, y: 0 },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%): Elements exit
      scrollTl.fromTo(headline,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-18vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(subhead,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-12vh', ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo([bottomLeft, bottomRight],
        { opacity: 1, y: 0 },
        { opacity: 0, y: '3vh', ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, [onDistortionChange]);

  const scrollToWork = () => {
    const workSection = document.getElementById('work-section');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="hero-section"
      className="section-pinned z-10"
    >
      <WebGLBackground 
        imageSrc="/hero-bg.jpg" 
        distortion={distortion}
        direction={direction}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-6">
        {/* Main Headline */}
        <h1 
          ref={headlineRef}
          className="font-display font-extrabold text-[clamp(48px,10vw,140px)] tracking-[-0.02em] text-[#F4F4F5] text-center uppercase"
          style={{ perspective: '1000px' }}
        >
          GLEIMBEK
        </h1>

        {/* Subheadline */}
        <p 
          ref={subheadRef}
          className="mt-4 font-display font-medium text-[clamp(16px,2.5vw,32px)] text-[#A7A7AD] text-center tracking-wide"
          style={{ opacity: 0 }}
        >
          Software Web Developer & IT Support Specialist
        </p>
      </div>

      {/* Bottom Left */}
      <div 
        ref={bottomLeftRef}
        className="absolute bottom-8 left-6 lg:left-[6vw] z-10"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-xs tracking-[0.12em] text-[#A7A7AD] uppercase">
          Based in Las Vegas, NV
        </p>
      </div>

      {/* Bottom Right */}
      <div 
        ref={bottomRightRef}
        className="absolute bottom-8 right-6 lg:right-[6vw] z-10"
        style={{ opacity: 0 }}
      >
        <button 
          onClick={scrollToWork}
          className="flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-[#F4F4F5] uppercase hover:text-[#E1062C] transition-colors link-underline"
        >
          View selected work
          <ChevronDown size={16} />
        </button>
      </div>
    </section>
  );
}
