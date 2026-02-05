import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Palette, 
  Shield, 
  Globe, 
  Cpu,
  Download,
  ExternalLink
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
  {
    icon: Code2,
    title: 'Frontend Architecture',
    description: 'Building scalable, performant web applications with modern frameworks and best practices.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript', 'Responsive Design']
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Complete web solutions from concept to deployment with focus on user experience.',
    skills: ['PHP', 'WordPress', 'REST APIs', 'Git', 'Webpack', 'Vite']
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Designing and optimizing database structures for efficient data handling.',
    skills: ['SQL', 'MySQL', 'Database Design', 'Query Optimization']
  },
  {
    icon: Cpu,
    title: 'Programming & Tools',
    description: 'Versatile programming skills with professional development tools.',
    skills: ['Python', 'Eclipse', 'IntelliJ IDEA', 'NetBeans', 'KNIME', 'Data Analytics']
  },
  {
    icon: Palette,
    title: 'Design Systems',
    description: 'Creating cohesive visual identities and user interface components.',
    skills: ['Adobe Creative Suite', 'UI/UX Design', 'Figma', 'Brand Identity']
  },
  {
    icon: Shield,
    title: 'IT & Security',
    description: 'Comprehensive IT support with security-focused solutions.',
    skills: ['Remote IT Support', 'Network Security', 'System Administration', 'Troubleshooting']
  }
];

const certifications = [
  { name: 'IBM Cybersecurity Analyst', provider: 'Coursera' },
  { name: 'Full-Stack Web Developer', provider: 'Professional' },
  { name: 'Google IT Support', provider: 'Coursera' },
  { name: 'Network Pro', provider: 'TestOut' }
];

const languages = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'High Intermediate' },
  { name: 'Portuguese', level: 'Advanced' }
];

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const langsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const certs = certsRef.current;
    const langs = langsRef.current;

    if (!section || !heading || !cards || !certs || !langs) return;

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

      // Cards stagger reveal
      const cardElements = cards.querySelectorAll('.capability-card');
      gsap.fromTo(cardElements,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Certs reveal
      gsap.fromTo(certs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: certs,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Languages reveal
      gsap.fromTo(langs,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: langs,
            start: 'top 85%',
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
      id="capabilities-section"
      className="relative bg-[#0B0B0D] py-24 lg:py-32"
    >
      {/* Subtle vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11,11,13,0.4) 100%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] text-[#F4F4F5] mb-4">
            Capabilities
          </h2>
          <p className="text-[#A7A7AD] text-lg max-w-2xl leading-relaxed">
            Software Web Developer and IT Support Specialist with over 3 years of experience 
            in web development, online education support, and remote technical services. 
            Proven ability to enhance user experience and deliver reliable technical solutions.
          </p>
          <a 
            href="#"
            className="inline-flex items-center gap-2 mt-6 text-[#E1062C] hover:text-[#F4F4F5] transition-colors link-underline"
          >
            <Download size={18} />
            <span className="font-mono text-sm tracking-wide">Download resume</span>
          </a>
        </div>

        {/* Capability Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {capabilities.map((cap, index) => (
            <div 
              key={index}
              className="capability-card group p-6 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.04] hover:border-[#E1062C]/30 transition-all duration-300 card-hover"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#E1062C]/10 rounded-lg group-hover:bg-[#E1062C]/20 transition-colors">
                  <cap.icon size={24} className="text-[#E1062C]" />
                </div>
                <h3 className="font-display font-semibold text-[#F4F4F5]">
                  {cap.title}
                </h3>
              </div>
              <p className="text-[#A7A7AD] text-sm leading-relaxed mb-4">
                {cap.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {cap.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 text-xs font-mono bg-white/5 text-[#A7A7AD] rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column: Certifications & Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div ref={certsRef}>
            <h3 className="font-display font-semibold text-[#F4F4F5] mb-6 flex items-center gap-2">
              <ExternalLink size={20} className="text-[#E1062C]" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#E1062C]/30 transition-colors"
                >
                  <span className="text-[#F4F4F5] font-medium">{cert.name}</span>
                  <span className="font-mono text-xs text-[#A7A7AD]">{cert.provider}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div ref={langsRef}>
            <h3 className="font-display font-semibold text-[#F4F4F5] mb-6 flex items-center gap-2">
              <Globe size={20} className="text-[#E1062C]" />
              Languages
            </h3>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#E1062C]/30 transition-colors"
                >
                  <span className="text-[#F4F4F5] font-medium">{lang.name}</span>
                  <span className="px-3 py-1 text-xs font-mono bg-[#E1062C]/10 text-[#E1062C] rounded-full">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-16 pt-12 border-t border-white/5">
          <h3 className="font-display font-semibold text-[#F4F4F5] mb-6">Education</h3>
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="font-display font-semibold text-[#F4F4F5] text-lg">
                  A.A.S Software – Web Development
                </h4>
                <p className="text-[#A7A7AD] mt-1">College of Southern Nevada</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-sm text-[#A7A7AD]">Spring 2024</span>
                <span className="px-3 py-1 text-xs font-mono bg-[#E1062C]/10 text-[#E1062C] rounded-full">
                  GPA 3.98
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
