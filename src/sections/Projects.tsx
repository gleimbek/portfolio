import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-Learning Platform UI',
    description:
      'A comprehensive learning management system designed to increase student engagement and academic performance. Features interactive course materials, progress tracking, and real-time feedback systems.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    image: '/images/project-elearning.jpg',
    link: '#',
  },
  {
    title: 'Corporate Website Redesign',
    description:
      'Complete redesign and development of corporate websites for fifteen companies, implementing modern responsive design principles and improving network security infrastructure.',
    tags: ['WordPress', 'HTML5', 'CSS3', 'Responsive Design'],
    image: '/images/project-corporate.jpg',
    link: '#',
  },
  {
    title: 'IT Support Dashboard',
    description:
      'A centralized dashboard for managing remote IT support operations, tracking software installations, user training progress, and network security metrics across multiple client organizations.',
    tags: ['JavaScript', 'SQL', 'Python'],
    image: '/images/project-dashboard.jpg',
    link: '#',
  },
  {
    title: 'Developer Portfolio System',
    description:
      'A customizable portfolio generation system built for developers to showcase their work, skills, and professional achievements with modern animations and responsive design.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    image: '/images/project-portfolio.jpg',
    link: '#',
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current?.children;
    if (!section || !heading || !cards) return;

    // Heading animation
    gsap.fromTo(
      heading.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          end: 'top 60%',
          scrub: true,
        },
      }
    );

    // Cards animation
    Array.from(cards).forEach((card) => {
      gsap.fromTo(
        card,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === heading || (cards && Array.from(cards).includes(st.trigger as Element)))
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full bg-[#0A0A0A] py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] block mb-4">
            PORTFOLIO
          </span>
          <h2 className="text-[40px] md:text-[64px] font-bold text-[#F9F9F8] leading-[1.08] tracking-[-0.02em]">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg text-[#6B6B6B] max-w-[560px] mx-auto mt-4">
            A selection of my recent work across web development, UI design, and IT consulting.
          </p>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-lg overflow-hidden border border-[rgba(255,255,255,0.06)] transition-all duration-300 hover:border-[rgba(43,108,176,0.3)]"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.03]"
                />
              </div>

              {/* Content */}
              <div className="p-7">
                <h3 className="text-[28px] font-semibold text-[#F9F9F8] leading-[1.15]">
                  {project.title}
                </h3>
                <p className="text-base text-[#6B6B6B] mt-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded text-[12px] font-medium border border-[rgba(255,255,255,0.1)] text-[#6B6B6B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={project.link}
                  className="inline-block mt-4 text-[13px] font-medium text-[#2B6CB0] hover:underline transition-all duration-200"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
