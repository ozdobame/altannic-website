import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { OrigamiBird } from '../components/Origami';
import { PaperButton } from '../components/UI';

const LINKS = [
  ['Story', '#story', 'bg-sky'],
  ['Services', '#services', 'bg-lemon'],
  ['Process', '#process', 'bg-mint'],
  ['Play', '#bower', 'bg-pink'],
  ['Work', '#work', 'bg-peach'],
  ['Contact', '#contact', 'bg-lilac'],
];

function NavLink({ label, href, color }) {
  return (
    <motion.a
      href={href}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileFocus="hover"
      className="relative block px-3.5 py-1.5 font-hand text-[22px] text-ink"
      style={{ perspective: 400 }}
    >
      <motion.span
        aria-hidden="true"
        className={`origami-face absolute inset-0 rounded-md ${color}`}
        style={{ transformOrigin: '50% 0%' }}
        variants={{ rest: { rotateX: -92, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      />
      <span className="relative">{label}</span>
    </motion.a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const left = useTransform(smooth, (p) => `${p * 100}%`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? 'bg-paper/85 backdrop-blur-md' : ''}`}>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-[72px]" aria-label="Main">
        <a href="#top" className="group flex items-center gap-2" aria-label="Altannic – home">
          <OrigamiBird className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
          <span className="font-display text-[26px] font-semibold tracking-tight">altannic</span>
          <span className="hidden -rotate-6 font-hand text-xl text-coral sm:inline">design studio</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map(([l, h, c]) => (
            <li key={l}>
              <NavLink label={l} href={h} color={c} />
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <PaperButton href="#contact" variant="sun">Start a nest</PaperButton>
        </div>

        <button
          type="button"
          className="relative grid h-11 w-11 place-items-center rounded-lg bg-white shadow-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <motion.path
              d="M4 7 C 9 6, 15 8, 20 7"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              animate={open ? { d: 'M5 5 C 10 10, 14 14, 19 19' } : { d: 'M4 7 C 9 6, 15 8, 20 7' }}
            />
            <motion.path
              d="M4 13 C 9 12, 15 14, 20 13"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
              animate={open ? { d: 'M19 5 C 14 10, 10 14, 5 19' } : { d: 'M4 13 C 9 12, 15 14, 20 13' }}
            />
            <motion.path d="M4 19 C 9 18, 13 20, 16 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" animate={{ opacity: open ? 0 : 1 }} />
          </svg>
        </button>
      </nav>

      {/* scroll progress: a little origami bird flying along a hand-drawn dashed line */}
      <div aria-hidden="true" className="mx-auto max-w-6xl px-5">
        <div className="relative h-3">
          <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink/15" />
          <motion.div className="absolute top-1/2 left-0 border-t-2 border-satin/60" style={{ width: left }} />
          <motion.div className="absolute -top-3 -translate-x-1/2" style={{ left }}>
            <OrigamiBird className="animate-bob h-7 w-7" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <div className="lg:hidden" style={{ perspective: 1000 }}>
            <motion.div
              id="mobile-menu"
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 17 }}
              style={{ transformOrigin: '50% 0%' }}
              className="origami-face mx-4 mt-2 rounded-2xl bg-white p-4 shadow-xl"
            >
              <ul className="grid grid-cols-2 gap-2">
                {LINKS.map(([l, h, c], i) => (
                  <motion.li key={l} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <a href={h} onClick={() => setOpen(false)} className={`origami-face block rounded-xl px-4 py-3 font-hand text-3xl ${c}`}>
                      {l}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
