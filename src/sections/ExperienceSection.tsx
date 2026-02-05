import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Online Teaching Assistant – Web Development',
    company: 'College of Southern Nevada, Las Vegas',
    period: '2023 – Present',
    type: 'education',
    achievements: [
      { icon: Users, text: 'Supported 60+ students with tutoring and troubleshooting' },
      { icon: TrendingUp, text: 'Improved student comprehension by 70% through practical examples' },
      { icon: GraduationCap, text: 'Increased academic performance by 30%, raising final grades by 1.5 points' }
    ],
    skills: ['HTML5', 'CSS3', 'PHP', 'SQL', 'MySQL', 'Java', 'Data Analytics', 'Responsive Web Design']
  },
  {
    role: 'Web Developer / IT Remote Support',
    company: 'Freelance, Las Vegas, Nevada',
    period: '2016 – Present',
    type: 'work',
    achievements: [
      { icon: Briefcase, text: 'Completed 155+ web development projects with measurable UX improvements' },
      { icon: TrendingUp, text: 'Performed 250+ remote installations, reducing setup time by 80%' },
      { icon: Users, text: 'Provided IT consulting and training, increasing client productivity' }
    ],
    skills: ['WordPress', 'JavaScript', 'Remote Support', 'Security', 'Consulting', 'Training']
  }
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const timeline = timelineRef.current;

    if (!section || !heading || !timeline) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(heading,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Timeline items stagger
      const items = timeline.querySelectorAll('.timeline-item');
      gsap.fromTo(items,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience-section"
      className="relative bg-[#0B0B0D] py-24 lg:py-32"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] text-[#F4F4F5] mb-4">
            Experience
          </h2>
          <p className="text-[#A7A7AD] text-lg max-w-2xl leading-relaxed">
            Over 3 years of hands-on experience in web development, education support, 
            and remote technical services.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E1062C]/50 via-white/10 to-transparent hidden md:block" />

          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`timeline-item relative mb-12 md:mb-0 ${
                index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%] md:mt-24'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 bg-[#E1062C] rounded-full border-4 border-[#0B0B0D] hidden md:block" />

              {/* Card */}
              <div className="relative p-6 lg:p-8 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#E1062C]/30 transition-all duration-300 card-hover">
                {/* Period badge */}
                <span className="inline-block px-3 py-1 mb-4 text-xs font-mono bg-[#E1062C]/10 text-[#E1062C] rounded-full">
                  {exp.period}
                </span>

                {/* Role */}
                <h3 className="font-display font-semibold text-xl text-[#F4F4F5] mb-2">
                  {exp.role}
                </h3>

                {/* Company */}
                <p className="text-[#A7A7AD] mb-6">{exp.company}</p>

                {/* Achievements */}
                <div className="space-y-3 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <achievement.icon size={18} className="text-[#E1062C] mt-0.5 flex-shrink-0" />
                      <span className="text-[#A7A7AD] text-sm">{achievement.text}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 text-xs font-mono bg-white/5 text-[#A7A7AD] rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '155+', label: 'Projects Completed' },
            { value: '250+', label: 'Remote Installations' },
            { value: '60+', label: 'Students Supported' },
            { value: '3+', label: 'Years Experience' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-lg"
            >
              <div className="font-display font-bold text-3xl lg:text-4xl text-[#E1062C] mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-[#A7A7AD] uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
