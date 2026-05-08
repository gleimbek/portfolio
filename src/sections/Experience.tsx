import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Online Teaching Assistant',
    company: 'College of Southern Nevada, Las Vegas, NV',
    period: 'August 2023 – Present',
    achievements: [
      'Collaborated closely with the lead instructor to prepare and maintain course materials in HTML5, CSS3, PHP, MySQL, Java and Responsive Web Design',
      'Increased student academic performance by 30%, resulting in an average increase of 1.5 points in final course grades',
      'Enhanced student comprehension of key concepts by 70% through detailed explanations and practical examples',
      'Provided constructive feedback to more than sixty students, improving their academic performance and participation by 50%',
    ],
  },
  {
    title: 'IT Remote Support (Freelancer)',
    company: 'Web Development, Las Vegas, NV',
    period: 'August 2016 – Present',
    achievements: [
      'Designed websites, user interfaces, and web applications',
      'Led over 155 web development projects, resulting in a 40% increase in student participation',
      'Performed more than 250 remote installations of software and operating systems, reducing implementation time by 80%',
      'Trained more than thirty-five end users, improving their productivity by 80%',
      'Provided technological advice to fifteen companies, implementing solutions that increased network security by 45%',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const leftCol = leftColRef.current;
    const entries = entriesRef.current?.children;
    const progress = progressRef.current;
    const overlay = overlayRef.current;

    // Set initial states
    gsap.set(leftCol, { x: -60, opacity: 0 });
    gsap.set(progress, { scaleY: 0, transformOrigin: 'top' });
    if (entries) {
      gsap.set(entries, { x: 60, opacity: 0 });
    }

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
    scrollTl.to(leftCol, { x: 0, opacity: 1, ease: 'none' }, 0);
    scrollTl.to(progress, { scaleY: 1, ease: 'none' }, 0.05);
    if (entries) {
      scrollTl.to(entries[0], { x: 0, opacity: 1, ease: 'none' }, 0.1);
      // Entry 1 bullets
      const bullets1 = entries[0].querySelectorAll('li');
      scrollTl.to(bullets1, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.15);

      scrollTl.to(entries[1], { x: 0, opacity: 1, ease: 'none' }, 0.18);
      const bullets2 = entries[1].querySelectorAll('li');
      scrollTl.to(bullets2, { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 0.22);
    }

    // EXIT (70% - 100%)
    scrollTl.fromTo(
      [leftCol, timelineRef.current],
      { y: 0, opacity: 1 },
      { y: '-12vh', opacity: 0, ease: 'power2.in' },
      0.7
    );
    if (entries) {
      scrollTl.fromTo(
        entries,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
    }

    // Dark wipe transition
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

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full min-h-[100dvh] bg-[#F9F9F8] overflow-hidden"
    >
      <div className="relative z-10 flex items-center min-h-[100dvh] max-w-[1280px] mx-auto px-6 lg:px-20 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-16 w-full">
          {/* Left Column */}
          <div ref={leftColRef} className="lg:sticky lg:top-32 self-start">
            <div className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] mb-4">
              CAREER
            </div>
            <h2 className="text-[40px] md:text-[64px] font-bold text-[#1A1A1A] leading-[1.08] tracking-[-0.02em]">
              Professional Experience
            </h2>
            <a
              href="#contact"
              onClick={handleDownload}
              className="inline-block mt-8 px-7 py-3 bg-[#1A1A1A] text-[#F9F9F8] text-[13px] font-semibold tracking-[0.08em] rounded transition-colors duration-250 hover:bg-[#2B6CB0]"
            >
              Download Resume
            </a>
          </div>

          {/* Right Column — Timeline */}
          <div ref={timelineRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#E8E8E7]">
              <div
                ref={progressRef}
                className="w-full bg-[#2B6CB0]"
                style={{ height: '100%', transformOrigin: 'top' }}
              />
            </div>

            <div ref={entriesRef} className="space-y-12 pl-8">
              {experiences.map((exp) => (
                <div key={exp.title} className="relative">
                  {/* Dot */}
                  <div className="absolute -left-8 top-2 w-3 h-3 rounded-full bg-[#2B6CB0] -translate-x-1/2" />

                  <h3 className="text-[28px] font-semibold text-[#1A1A1A] leading-[1.15]">
                    {exp.title}
                  </h3>
                  <p className="text-lg font-medium text-[#2B6CB0] mt-1">
                    {exp.company}
                  </p>
                  <p className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] mt-1">
                    {exp.period}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {exp.achievements.map((achievement) => (
                      <li
                        key={achievement.slice(0, 30)}
                        className="text-base text-[#1A1A1A] leading-relaxed flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2B6CB0] mt-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dark wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0A0A0A] z-20"
        style={{ transform: 'translateY(100%)' }}
      />
    </section>
  );
}
