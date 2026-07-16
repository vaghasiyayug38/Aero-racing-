import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import 'gsap/ScrollTrigger';
import { FiZap, FiGlobe, FiCpu, FiAward } from 'react-icons/fi';

const features = [
  { icon: <FiZap />, title: 'Hyper Drift Physics', desc: 'Experience next-gen tire modeling and dynamic weight transfer.' },
  { icon: <FiGlobe />, title: 'Open World Neon', desc: 'Explore a massive, seamless cyberpunk metropolis.' },
  { icon: <FiCpu />, title: 'Ray-Traced Reflections', desc: 'Every puddle and window reflects the vibrant city lights.' },
  { icon: <FiAward />, title: 'Global Leaderboards', desc: 'Compete against the best drivers worldwide in real-time.' },
];

export default function Sections() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.from(el, {
          y: 80, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative z-10">
      <section id="features" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20 reveal-up">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Engineered for <span className="text-cyber-neon">Speed</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
            Built from the ground up with a custom physics engine to deliver the most authentic racing experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <div key={i} className="reveal-up glass p-8 rounded-2xl hover:border-cyber-neon/30 transition-all group">
              <div className="text-3xl text-cyber-neon mb-4 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="font-display text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center reveal-up">
          <h2 className="font-display text-3xl md:text-6xl font-bold mb-6">
            Ready to <span className="text-cyber-pink">Dominate</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-10 px-4">
            Join millions of players in the ultimate cyberpunk racing revolution.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-cyber-pink to-cyber-purple text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,0,60,0.5)] transition-all">
            Pre-Order Now
          </button>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10 px-6 text-center text-gray-500 text-sm">
        <p>&copy; 2024 AERO Studios. All rights reserved. Built by Quen Studio Council.</p>
      </footer>
    </div>
  );
}
