import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '155+', label: 'Projects Led' },
  { value: '3.98', label: 'GPA' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = [
      labelRef.current,
      headingRef.current,
      bioRef.current,
      statsRef.current,
      photoRef.current,
    ].filter(Boolean);

    const overlay = overlayRef.current;

    // Set initial states
    gsap.set(elements, { y: 60, opacity: 0 });
    gsap.set(photoRef.current, { y: 100, opacity: 0, scale: 0.95 });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=130%',
        pin: true,
        scrub: 0.5,
      },
    });

    // ENTRANCE (0% - 30%)
    scrollTl.to(labelRef.current, { y: 0, opacity: 1, ease: 'none' }, 0);
    scrollTl.to(headingRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.05);
    scrollTl.to(bioRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.1);
    scrollTl.to(statsRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.15);
    scrollTl.to(photoRef.current, { y: 0, opacity: 1, scale: 1, ease: 'power2.out' }, 0.12);

    // Hold visible through SETTLE (30% - 70%) — no animation

    // EXIT (70% - 100%)
    scrollTl.fromTo(
      [labelRef.current, headingRef.current, bioRef.current],
      { x: 0, opacity: 1 },
      { x: '-10vw', opacity: 0, ease: 'power2.in' },
      0.7
    );
    scrollTl.fromTo(
      [statsRef.current, photoRef.current],
      { x: 0, opacity: 1 },
      { x: '10vw', opacity: 0, ease: 'power2.in' },
      0.7
    );

    // Dark wipe transition
    scrollTl.fromTo(
      overlay,
      { x: '100%' },
      { x: '0%', ease: 'power2.inOut' },
      0.8
    );

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-[100dvh] bg-[#F9F9F8] overflow-hidden"
    >
      <div className="relative z-10 flex items-center min-h-[100dvh] max-w-[1280px] mx-auto px-6 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 w-full items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Section Label */}
            <div ref={labelRef} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#2B6CB0]" />
              <span className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B]">
                ABOUT
              </span>
            </div>

            {/* Heading */}
            <h2
              ref={headingRef}
              className="text-[40px] md:text-[64px] font-bold text-[#1A1A1A] leading-[1.08] tracking-[-0.02em]"
            >
              Crafting Digital Solutions with Passion & Precision
            </h2>

            {/* Bio */}
            <p
              ref={bioRef}
              className="text-lg md:text-[22px] text-[#1A1A1A] leading-[1.6] max-w-[520px]"
            >
              I'm a professional web developer with over 3 years of experience
              designing and developing interactive web applications. Specialized in
              WordPress, JavaScript, HTML5, CSS3, SQL, MySQL and PHP. I bring
              expertise in leadership with demonstrated skills in consulting, coding,
              and visualization. Committed to excellence in web development and
              dedicated to facilitating the ongoing success of organizations through
              exceptional digital solutions.
            </p>

            <p className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B]">
              Based in Las Vegas, NV • Available for freelance & full-time opportunities
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            {/* Stats */}
            <div ref={statsRef} className="flex flex-wrap gap-8 lg:gap-10">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-[40px] md:text-[64px] font-bold text-[#2B6CB0] leading-none">
                    {stat.value}
                  </div>
                  <div className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Photo */}
            <div ref={photoRef} className="relative">
              <img
                src="/images/portrait.jpg"
                alt="Gustavo Leimbek"
                className="w-full max-w-[320px] h-[400px] object-cover rounded-lg border border-[#E8E8E7]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dark wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#1A1A1A] z-20"
        style={{ transform: 'translateX(100%)' }}
      />
    </section>
  );
}
