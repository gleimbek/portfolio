import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import WebGLBackground from '../components/WebGLBackground';

gsap.registerPlugin(ScrollTrigger);

interface WorkItemProps {
  id: string;
  micro: string;
  title: string;
  meta: string;
  link: string;
  imageSrc: string;
  titlePosition: 'center' | 'right' | 'left';
  zIndex: number;
  onDistortionChange: (distortion: number, direction: { x: number; y: number }) => void;
  distortion: number;
  direction: { x: number; y: number };
}

function WorkItem({ 
  id, 
  micro, 
  title, 
  meta, 
  link, 
  imageSrc, 
  titlePosition,
  zIndex,
  onDistortionChange,
  distortion,
  direction
}: WorkItemProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const microRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const micro = microRef.current;
    const titleEl = titleRef.current;
    const metaEl = metaRef.current;
    const linkEl = linkRef.current;

    if (!section || !micro || !titleEl || !metaEl || !linkEl) return;

    const ctx = gsap.context(() => {
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
          }
        }
      });

      // Determine entrance/exit based on position
      const entranceX = titlePosition === 'right' ? '60vw' : titlePosition === 'left' ? '-60vw' : '0';
      const entranceY = titlePosition === 'center' ? '70vh' : '0';
      const exitX = titlePosition === 'right' ? '-55vw' : titlePosition === 'left' ? '55vw' : '0';
      const exitY = titlePosition === 'center' ? '-40vh' : titlePosition === 'right' ? '0' : '-35vh';

      // ENTRANCE (0-30%)
      scrollTl.fromTo(micro,
        { opacity: 0, y: '-6vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo(titleEl,
        { opacity: 0, x: entranceX, y: entranceY },
        { opacity: 1, x: 0, y: 0, ease: 'none' },
        0
      );

      scrollTl.fromTo([metaEl, linkEl],
        { opacity: 0, y: '3vh' },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      // SETTLE (30-70%): Static

      // EXIT (70-100%)
      scrollTl.fromTo(titleEl,
        { opacity: 1, x: 0, y: 0 },
        { opacity: 0, x: exitX, y: exitY, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(micro,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-3vh', ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo([metaEl, linkEl],
        { opacity: 1, y: 0 },
        { opacity: 0, y: '3vh', ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, [titlePosition, onDistortionChange]);

  const titleAlignment = titlePosition === 'center' 
    ? 'text-center left-1/2 -translate-x-1/2' 
    : titlePosition === 'right'
    ? 'text-left left-[28vw]'
    : 'text-left left-[6vw]';

  return (
    <section 
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      <WebGLBackground 
        imageSrc={imageSrc}
        distortion={distortion}
        direction={direction}
      />

      {/* Micro label */}
      <span 
        ref={microRef}
        className="absolute top-[10vh] left-1/2 -translate-x-1/2 z-10 font-mono text-xs tracking-[0.12em] text-[#A7A7AD] uppercase"
      >
        {micro}
      </span>

      {/* Title */}
      <h2 
        ref={titleRef}
        className={`absolute top-[54vh] ${titleAlignment} z-10 font-display font-bold text-[clamp(36px,6.5vw,96px)] tracking-[0.02em] text-[#F4F4F5] uppercase whitespace-nowrap`}
      >
        {title}
      </h2>

      {/* Bottom Left - Meta */}
      <div 
        ref={metaRef}
        className="absolute bottom-8 left-6 lg:left-[6vw] z-10"
      >
        <p className="font-mono text-xs tracking-[0.12em] text-[#A7A7AD] uppercase">
          {meta}
        </p>
      </div>

      {/* Bottom Right - Link */}
      <a 
        ref={linkRef}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-8 right-6 lg:right-[6vw] z-10 flex items-center gap-2 font-mono text-xs tracking-[0.12em] text-[#F4F4F5] uppercase hover:text-[#E1062C] transition-colors link-underline group"
      >
        View case
        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </a>
    </section>
  );
}

interface WorkSectionProps {
  onDistortionChange: (distortion: number, direction: { x: number; y: number }) => void;
  distortion: number;
  direction: { x: number; y: number };
}

export default function WorkSection({ onDistortionChange, distortion, direction }: WorkSectionProps) {
  const workItems = [
    {
      id: 'work-neon',
      micro: 'Selected Work',
      title: 'Neon District',
      meta: 'Design + Frontend',
      link: '#',
      imageSrc: '/work-neon.jpg',
      titlePosition: 'center' as const,
      zIndex: 20
    },
    {
      id: 'work-commerce',
      micro: 'E-Commerce',
      title: 'Modern Commerce',
      meta: 'Shopify / React / Performance',
      link: '#',
      imageSrc: '/work-commerce.jpg',
      titlePosition: 'right' as const,
      zIndex: 30
    },
    {
      id: 'work-product',
      micro: 'Product UI',
      title: 'Product Experience',
      meta: 'React / TS / Animation',
      link: '#',
      imageSrc: '/work-product.jpg',
      titlePosition: 'center' as const,
      zIndex: 40
    },
    {
      id: 'work-brand',
      micro: 'Creative Campaign',
      title: 'Brand Systems',
      meta: 'Art direction + Build',
      link: '#',
      imageSrc: '/work-brand.jpg',
      titlePosition: 'center' as const,
      zIndex: 50
    },
    {
      id: 'work-editorial',
      micro: 'Microsite',
      title: 'Editorial Stories',
      meta: 'Content + Motion',
      link: '#',
      imageSrc: '/work-editorial.jpg',
      titlePosition: 'left' as const,
      zIndex: 60
    }
  ];

  return (
    <div id="work-section">
      {workItems.map((item) => (
        <WorkItem
          key={item.id}
          {...item}
          onDistortionChange={onDistortionChange}
          distortion={distortion}
          direction={direction}
        />
      ))}
    </div>
  );
}
