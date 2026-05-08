import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const blob = blobRef.current;
    const overlay = overlayRef.current;
    if (!section || !content || !blob || !overlay) return;

    // Entrance animation on load
    gsap.fromTo(
      content.children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.3,
      }
    );

    gsap.fromTo(
      blob,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'back.out(1.2)',
        delay: 0.1,
      }
    );

    // Scroll-driven exit animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.5,
      },
    });

    // EXIT phase (70% - 100%)
    scrollTl.fromTo(
      content,
      { y: 0, opacity: 1 },
      { y: '-20vh', opacity: 0, ease: 'power2.in' },
      0.7
    );

    scrollTl.fromTo(
      blob,
      { scale: 1, opacity: 1 },
      { scale: 1.3, opacity: 0.3, ease: 'power2.in' },
      0.7
    );

    scrollTl.fromTo(
      blob,
      { opacity: 0.3 },
      { opacity: 0, ease: 'power2.in' },
      0.95
    );

    scrollTl.fromTo(
      overlay,
      { y: '100%' },
      { y: '0%', ease: 'power2.inOut' },
      0.85
    );

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  // Mouse-driven blob movement
  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 60;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * 60;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;
      blob.style.transform = `translate(${currentX}px, ${currentY}px) scale(1)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleViewWork = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0F172A 0%, #0A0A0A 100%)',
      }}
    >
      {/* SVG Gooey Blob */}
      <div
        ref={blobRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-[60vmin] h-[60vmin]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 40 -18"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
          <path
            d="M50 10 C70 10, 90 25, 90 50 C90 75, 70 90, 50 90 C30 90, 10 75, 10 50 C10 25, 30 10, 50 10"
            fill="rgba(43, 108, 176, 0.15)"
            stroke="rgba(43, 108, 176, 0.6)"
            strokeWidth="2"
            filter="url(#gooey)"
            style={{
              animation: 'blob-morph-1 12s ease-in-out infinite, blob-float 20s ease-in-out infinite',
            }}
          />
        </svg>
      </div>

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
      >
        <span className="text-lg md:text-[22px] font-normal text-[#6B6B6B] mb-4">
          Hi, I'm
        </span>

        <h1 className="text-[48px] md:text-[64px] lg:text-[88px] font-bold text-[#F9F9F8] tracking-[-0.03em] leading-[1.05]">
          GUSTAVO LEIMBEK
        </h1>

        <h2 className="mt-4 text-[28px] md:text-[40px] font-medium text-[#2B6CB0] leading-[1.15]">
          Web Developer & IT Professional
        </h2>

        <p className="mt-6 text-base md:text-lg text-[#6B6B6B] max-w-[480px] leading-relaxed">
          Building exceptional digital experiences from Las Vegas
        </p>

        <a
          href="#projects"
          onClick={handleViewWork}
          className="mt-10 px-8 py-3.5 border border-[#2B6CB0] text-[#2B6CB0] text-[13px] font-semibold tracking-[0.08em] rounded transition-all duration-300 hover:bg-[#2B6CB0] hover:text-[#F9F9F8]"
        >
          View My Work
        </a>
      </div>

      {/* White transition overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#F9F9F8] z-20"
        style={{ transform: 'translateY(100%)' }}
      />
    </section>
  );
}
