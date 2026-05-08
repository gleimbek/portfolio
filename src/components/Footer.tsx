import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 h-12 pointer-events-none">
      <div className="flex items-center justify-between h-full max-w-[1280px] mx-auto px-6 lg:px-20">
        {/* Location + Status */}
        <span className="font-mono-accent text-[11px] text-[#6B6B6B]">
          Las Vegas, NV
          <span className="mx-2">•</span>
          <span
            className="inline-block"
            style={{
              animation: 'pulse-opacity 2s ease-in-out infinite',
            }}
          >
            Available for work
          </span>
        </span>

        {/* Social Links */}
        <div className="flex items-center gap-5 pointer-events-auto">
          <a
            href="https://www.linkedin.com/in/gleimbek/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono-accent text-[11px] text-[#6B6B6B] hover:text-[#2B6CB0] transition-colors duration-200"
          >
            <Linkedin size={14} />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono-accent text-[11px] text-[#6B6B6B] hover:text-[#2B6CB0] transition-colors duration-200"
          >
            <Github size={14} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
