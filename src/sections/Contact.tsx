import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactMethods = [
  {
    icon: Mail,
    label: 'gleimbek@gmail.com',
    href: 'mailto:gleimbek@gmail.com',
  },
  {
    icon: Phone,
    label: '(725) 600-1802',
    href: 'tel:7256001802',
  },
  {
    icon: MapPin,
    label: 'Las Vegas, NV',
    href: null,
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/gleimbek',
    href: 'https://www.linkedin.com/in/gleimbek/',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const contact = contactRef.current;
    const cta = ctaRef.current;
    if (!section || !heading || !contact || !cta) return;

    // Heading
    gsap.fromTo(
      heading.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: heading,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );

    // Contact items
    const items = contact.children;
    gsap.fromTo(
      items,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: contact,
          start: 'top 75%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );

    // CTA
    gsap.fromTo(
      cta,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: cta,
          start: 'top 75%',
          end: 'top 60%',
          scrub: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === heading || st.trigger === contact || st.trigger === cta)
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-[#0A0A0A] pt-32 lg:pt-40 pb-24 lg:pb-32"
    >
      <div className="max-w-[800px] mx-auto px-6 lg:px-20 text-center">
        {/* Heading */}
        <div ref={headingRef}>
          <span className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] block mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-[40px] md:text-[64px] font-bold text-[#F9F9F8] leading-[1.08] tracking-[-0.02em]">
            Let's Build Something Amazing Together
          </h2>
          <p className="text-lg md:text-[22px] text-[#6B6B6B] max-w-[560px] mx-auto mt-6 leading-relaxed">
            I'm currently available for freelance projects and full-time opportunities.
            Whether you need a website, web application, or IT consulting — let's talk.
          </p>
        </div>

        {/* Contact Info */}
        <div
          ref={contactRef}
          className="flex flex-wrap justify-center gap-8 lg:gap-12 mt-16"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex items-center gap-3 group">
                <Icon size={20} className="text-[#2B6CB0] flex-shrink-0" />
                <span className="text-base text-[#F9F9F8] group-hover:text-[#2B6CB0] transition-colors duration-200">
                  {method.label}
                </span>
              </div>
            );

            if (method.href) {
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="hover:underline underline-offset-4 decoration-[#2B6CB0]"
                >
                  {content}
                </a>
              );
            }

            return <div key={method.label}>{content}</div>;
          })}
        </div>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="mailto:gleimbek@gmail.com"
          className="inline-block mt-12 px-10 py-4 bg-[#2B6CB0] text-[#F9F9F8] text-lg font-semibold rounded transition-all duration-300 hover:bg-[#3182CE] hover:-translate-y-0.5"
          style={{
            boxShadow: '0 8px 24px rgba(43, 108, 176, 0.3)',
          }}
        >
          Send Me an Email
        </a>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-24 pt-8 border-t border-[rgba(255,255,255,0.08)] gap-4">
          <span className="font-mono-accent text-[11px] text-[#6B6B6B]">
            © 2025 Gustavo Leimbek. All rights reserved.
          </span>
          <span className="font-mono-accent text-[11px] text-[#6B6B6B]">
            Built with React & Tailwind CSS
          </span>
        </div>
      </div>
    </section>
  );
}
