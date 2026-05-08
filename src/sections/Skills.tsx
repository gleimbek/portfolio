import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Wrench, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    icon: Code2,
    title: 'Programming Languages',
    skills: ['JavaScript', 'WordPress', 'HTML5', 'CSS3', 'Python', 'SQL', 'PHP', 'Java', 'MySQL', 'Responsive Web Design'],
  },
  {
    icon: Wrench,
    title: 'Development Tools',
    skills: ['Microsoft Office Suite', 'Adobe Creative Suite', 'Eclipse', 'SQL Server Management Studio', 'NetBeans', 'IntelliJ IDEA'],
  },
  {
    icon: Users,
    title: 'Professional Skills',
    skills: ['Management', 'Leadership', 'Problem Solving', 'Decision Making', 'Planning', 'Time Management', 'Teamwork', 'Effective Communication'],
  },
];

const languages = [
  { name: 'Spanish', level: 'Native', percent: 100 },
  { name: 'English', level: 'Professional', percent: 85 },
  { name: 'Portuguese', level: 'Professional', percent: 90 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const langsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current?.children;
    const overlay = overlayRef.current;

    // Set initial states
    gsap.set(labelRef.current, { y: 40, opacity: 0 });
    gsap.set(headingRef.current, { y: 60, opacity: 0 });
    if (cards) gsap.set(cards, { y: 80, opacity: 0, scale: 0.96 });
    gsap.set(langsRef.current, { y: 30, opacity: 0 });

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
    if (cards) {
      scrollTl.to(cards, { y: 0, opacity: 1, scale: 1, stagger: 0.04, ease: 'power2.out' }, 0.12);
    }
    scrollTl.to(langsRef.current, { y: 0, opacity: 1, ease: 'none' }, 0.2);

    // EXIT (70% - 100%)
    if (cards) {
      scrollTl.fromTo(
        cards,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0, stagger: 0.03, ease: 'power2.in' },
        0.7
      );
    }
    scrollTl.fromTo(
      [labelRef.current, headingRef.current],
      { opacity: 1 },
      { opacity: 0, ease: 'power2.in' },
      0.75
    );
    scrollTl.fromTo(
      langsRef.current,
      { opacity: 1 },
      { opacity: 0, ease: 'power2.in' },
      0.78
    );

    // Light wipe transition
    scrollTl.fromTo(
      overlay,
      { x: '-100%' },
      { x: '0%', ease: 'power2.inOut' },
      0.85
    );

    return () => {
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-[100dvh] bg-[#1A1A1A] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] max-w-[1200px] mx-auto px-6 lg:px-20 py-20">
        {/* Heading */}
        <div className="text-center mb-12">
          <div ref={labelRef} className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] mb-4">
            EXPERTISE
          </div>
          <h2 ref={headingRef} className="text-[40px] md:text-[64px] font-bold text-[#F9F9F8] leading-[1.08] tracking-[-0.02em]">
            Skills & Technologies
          </h2>
        </div>

        {/* Skills Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
        >
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="p-8 rounded-lg border border-[rgba(255,255,255,0.08)]"
                style={{ background: 'rgba(255, 255, 255, 0.04)' }}
              >
                <Icon size={24} className="text-[#2B6CB0] mb-4" />
                <h3 className="text-[28px] font-semibold text-[#F9F9F8] mb-5 leading-[1.15]">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span
                      key={skill}
                      className="px-3.5 py-1.5 rounded text-[13px] font-medium"
                      style={{
                        background: 'rgba(43, 108, 176, 0.15)',
                        color: '#2B6CB0',
                        animation: `tag-breathe 3s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Languages */}
        <div ref={langsRef} className="mt-12 text-center">
          <span className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] block mb-6">
            Languages
          </span>
          <div className="flex flex-wrap justify-center gap-12">
            {languages.map((lang) => (
              <div key={lang.name} className="text-center">
                <span className="text-lg text-[#F9F9F8] block">{lang.name}</span>
                <span className="text-base text-[#6B6B6B] block mt-1">{lang.level}</span>
                <div
                  className="w-20 h-[3px] mt-2 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="h-full rounded-full bg-[#2B6CB0]"
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Light wipe overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#F9F9F8] z-20"
        style={{ transform: 'translateX(-100%)' }}
      />
    </section>
  );
}
