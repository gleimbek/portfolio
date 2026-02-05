import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  Send,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const content = contentRef.current;

    if (!section || !heading || !content) return;

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

      // Content reveal
      const elements = content.querySelectorAll('.reveal-item');
      gsap.fromTo(elements,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact-section"
      className="relative py-24 lg:py-32"
      style={{ background: '#6B6B70' }}
    >
      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(107,107,112,0.8) 0%, #6B6B70 70%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div ref={headingRef} className="mb-16">
          <h2 className="font-display font-bold text-[clamp(36px,5vw,64px)] text-[#F4F4F5] mb-4">
            Let's build something great.
          </h2>
          <p className="text-[#E5E5E7] text-lg max-w-xl leading-relaxed">
            Open to freelance projects, collaborations, and full-time opportunities. 
            Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="reveal-item">
              <h3 className="font-display font-semibold text-[#F4F4F5] mb-4">Get in touch</h3>
              <div className="space-y-4">
                <a 
                  href="mailto:gleimbek@gmail.com"
                  className="flex items-center gap-3 text-[#E5E5E7] hover:text-[#F4F4F5] transition-colors group"
                >
                  <Mail size={20} className="text-[#E1062C]" />
                  <span className="link-underline">gleimbek@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-[#E5E5E7]">
                  <MapPin size={20} className="text-[#E1062C]" />
                  <span>Las Vegas, NV, USA</span>
                </div>
              </div>
            </div>

            <div className="reveal-item">
              <h3 className="font-display font-semibold text-[#F4F4F5] mb-4">Availability</h3>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[#E5E5E7]">Open to freelance & collaboration</span>
              </div>
            </div>

            <div className="reveal-item">
              <h3 className="font-display font-semibold text-[#F4F4F5] mb-4">Connect</h3>
              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/gleimbek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0B0B0D]/50 rounded-lg hover:bg-[#E1062C] transition-colors group"
                >
                  <Linkedin size={20} className="text-[#F4F4F5]" />
                </a>
                <a 
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0B0B0D]/50 rounded-lg hover:bg-[#E1062C] transition-colors group"
                >
                  <Github size={20} className="text-[#F4F4F5]" />
                </a>
                <a 
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[#0B0B0D]/50 rounded-lg hover:bg-[#E1062C] transition-colors group"
                >
                  <Twitter size={20} className="text-[#F4F4F5]" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="reveal-item">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#F4F4F5] mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="bg-[#0B0B0D]/50 border-white/10 text-[#F4F4F5] placeholder:text-[#A7A7AD] focus:border-[#E1062C] focus:ring-[#E1062C]/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#F4F4F5] mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="bg-[#0B0B0D]/50 border-white/10 text-[#F4F4F5] placeholder:text-[#A7A7AD] focus:border-[#E1062C] focus:ring-[#E1062C]/20"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#F4F4F5] mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className="bg-[#0B0B0D]/50 border-white/10 text-[#F4F4F5] placeholder:text-[#A7A7AD] focus:border-[#E1062C] focus:ring-[#E1062C]/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-6 font-mono text-sm tracking-wide transition-all ${
                  isSubmitted 
                    ? 'bg-green-600 hover:bg-green-600' 
                    : 'bg-[#E1062C] hover:bg-[#c20525]'
                }`}
              >
                {isSubmitted ? (
                  <span className="flex items-center gap-2">
                    <CheckCircle size={18} />
                    Message sent!
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} />
                    Send message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#A7A7AD]">
              © 2026 Gustavo Leimbek. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-mono text-xs text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">
                Privacy
              </a>
              <a href="#" className="font-mono text-xs text-[#A7A7AD] hover:text-[#F4F4F5] transition-colors">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
