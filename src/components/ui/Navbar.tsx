import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const links = ['Home', 'Cars', 'Garage', 'News', 'Community'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold tracking-widest neon-text" aria-label="AERO Home">
          AERO
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-300 hover:text-cyber-neon transition-colors relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyber-neon transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className="px-6 py-2 text-sm font-semibold glass border border-cyber-neon/30 text-cyber-neon hover:bg-cyber-neon/10 transition-all rounded-full">
            Login
          </button>
        </div>

        <button className="md:hidden text-2xl text-white" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
          {isMobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isMobileOpen && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="md:hidden glass mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-lg font-medium text-gray-300">{link}</a>
          ))}
          <button className="mt-4 px-6 py-2 text-sm font-semibold glass border border-cyber-neon/30 text-cyber-neon rounded-full">Login</button>
        </motion.div>
      )}
    </motion.nav>
  );
}
