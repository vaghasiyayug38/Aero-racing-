import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './components/Scene';
import Navbar from './components/ui/Navbar';
import Hero from './components/ui/Hero';
import Sections from './components/ui/Sections';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // 6GB RAM मोबाइल पर Lenis बंद करें, नेटिव स्क्रॉल रखें
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    
    if (!isMobile) {
      const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
      lenis.on('scroll', ScrollTrigger.update);
      const tickerCallback = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      return () => { lenis.destroy(); gsap.ticker.remove(tickerCallback); };
    }
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-cyber-bg">
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>
      <div className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
        <Hero />
        <div className="pointer-events-auto bg-cyber-bg/95 border-t border-white/5">
          <Sections />
        </div>
      </div>
    </main>
  );
}

export default App;
