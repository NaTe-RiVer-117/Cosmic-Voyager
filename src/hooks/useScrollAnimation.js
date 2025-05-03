// src/hooks/useScrollAnimation.js
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function useScrollAnimation(animationSetup) {
  const ref = useRef(null);
  
  useGSAP(() => {
    if (ref.current) {
      animationSetup(ref.current, gsap);
    }
  }, []);
  
  return ref;
}