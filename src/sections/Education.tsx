import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  { name: 'Network Pro', source: 'Test Out', date: 'Nov. 2022' },
  { name: 'IBM Cybersecurity Analyst', source: 'Coursera', date: 'Sep. 2022' },
  { name: 'Full-Stack Web Developer', source: '—', date: 'Jul. 2022' },
  { name: 'Programmer Python', source: 'Edutin Academy', date: 'May 2022' },
  { name: 'Microsoft Office Specialist - Associate', source: 'Microsoft', date: 'May 2022' },
  { name: 'Office Pro', source: 'Test Out', date: 'Apr. 2022' },
  { name: 'Google IT Support', source: 'Coursera', date: 'Oct. 2019' },
  { name: 'WordPress', source: 'LERN-CSN', date: 'Aug. 2020' },
];

const honors = [
  'Member of Phi Theta Kappa',
  'Member of Honor Society',
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const eduRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const edu = eduRef.current;
    const certs = certsRef.current;
    if (!section || !heading || !edu || !certs) return;

    // Heading
    gsap.fromTo(
      heading.children,
      { y: 40, opacity: 0 },
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

    // Education column
    gsap.fromTo(
      edu,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: edu,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    );

    // Certifications
    const certItems = certs.querySelectorAll('.cert-item');
    certItems.forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: `top ${85 - i * 2}%`,
            end: `top ${55 - i * 2}%`,
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === heading || st.trigger === edu || Array.from(certItems).includes(st.trigger as Element))
        .forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative w-full bg-[#F9F9F8] py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] block mb-4">
            BACKGROUND
          </span>
          <h2 className="text-[40px] md:text-[64px] font-bold text-[#1A1A1A] leading-[1.08] tracking-[-0.02em]">
            Education & Certifications
          </h2>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Education */}
          <div ref={eduRef}>
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] leading-[1.15]">
              College of Southern Nevada
            </h3>
            <p className="text-lg text-[#6B6B6B] mt-1">Las Vegas, NV</p>
            <p className="text-lg md:text-[22px] font-medium text-[#1A1A1A] mt-2">
              A.A.S. Software – Web Development
            </p>
            <p className="font-mono-accent text-[13px] tracking-[0.08em] text-[#6B6B6B] mt-2">
              Graduation: Spring 2024
            </p>
            <p className="text-[28px] font-semibold text-[#2B6CB0] mt-3">
              GPA: 3.98
            </p>

            {/* Honors */}
            <div className="mt-6 space-y-2">
              {honors.map((honor) => (
                <p key={honor} className="text-base text-[#1A1A1A] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2B6CB0] flex-shrink-0" />
                  {honor}
                </p>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div ref={certsRef}>
            <h3 className="text-[28px] font-semibold text-[#1A1A1A] leading-[1.15] mb-6">
              Certifications
            </h3>
            <div className="divide-y divide-[#E8E8E7]">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="cert-item py-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-base font-medium text-[#1A1A1A]">
                      {cert.name}
                    </p>
                    <p className="font-mono-accent text-[12px] tracking-[0.02em] text-[#6B6B6B] mt-0.5">
                      {cert.source}
                    </p>
                  </div>
                  <span className="font-mono-accent text-[12px] tracking-[0.02em] text-[#6B6B6B] flex-shrink-0 ml-4">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
