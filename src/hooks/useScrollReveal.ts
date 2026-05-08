import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  ease?: string;
  children?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      scale = 1,
      duration = 1,
      stagger = 0,
      delay = 0,
      start = 'top 85%',
      end = 'top 50%',
      scrub = true,
      ease = 'power2.out',
      children = false,
    } = options;

    const targets = children ? el.children : el;

    const tween = gsap.fromTo(
      targets,
      { y, x, opacity, scale },
      {
        y: 0,
        x: 0,
        opacity: 1,
        scale: 1,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return ref;
}
