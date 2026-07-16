import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { FiDownload, FiPlay } from 'react-icons/fi';

function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  // मोबाइल टच सपोर्ट
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!ref.current || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = ref.current.getBoundingClientRect();
    x.set((touch.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((touch.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchMove={handleTouchMove}
      onTouchEnd={reset}
      style={{ x: springX, y: springY }}
      className={className}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.from('.hero-title', { y: 100, opacity: 0, duration: 1.2, ease: 'power4.out', stagger: 0.2, delay: 0.5 });
      gsap.from('.hero-btn', { y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.2, delay: 1.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      // h-screen की जगह h-[100dvh] का उपयोग किया है ताकि मोबाइल के Address Bar की वजह से UI कटे नहीं
      className="relative h-[100dvh] flex flex-col justify-center items-start max-w-7xl mx-auto px-6 pointer-events-none"
      aria-labelledby="hero-heading"
    >
      <div className="max-w-2xl pointer-events-auto">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="text-cyber-neon font-display tracking-[0.3em] text-sm mb-4 uppercase">
          Next Generation Graphics
        </motion.p>
        
        <h1 id="hero-heading" className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
          <span className="block hero-title">AAA RACING</span>
          <span className="block hero-title text-transparent bg-clip-text bg-gradient-to-r from-cyber-neon to-cyber-pink">
            EXPERIENCE
          </span>
        </h1>
        
        <p className="hero-title text-gray-400 text-base md:text-xl mb-10 max-w-lg">
          Feel the speed. Master the drift. Dominate the neon-lit streets of the future.
        </p>

        <div className="flex flex-wrap gap-4">
          <MagneticButton className="hero-btn group relative px-8 py-4 bg-cyber-neon text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.5)]">
            <span className="relative z-10 flex items-center gap-2"><FiDownload /> Download Now</span>
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          </MagneticButton>

          <MagneticButton className="hero-btn glass px-8 py-4 border border-white/10 text-white font-bold rounded-full hover:border-cyber-pink/50 hover:text-cyber-pink transition-all">
            <span className="flex items-center gap-2"><FiPlay /> Watch Trailer</span>
          </MagneticButton>
        </div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto">
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-px h-8 bg-gradient-to-b from-cyber-neon to-transparent" />
      </motion.div>
    </section>
  );
}
