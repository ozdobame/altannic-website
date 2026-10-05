import { motion } from 'framer-motion';

const SCRIBBLES = [
  'M3 9 C 30 3, 60 13, 100 7 S 170 3, 197 10',
  'M4 7 C 50 13, 120 2, 196 8 M 24 13 C 80 9, 140 15, 186 12',
  'M3 10 Q 50 2, 100 9 T 197 7',
];

/** Hand-drawn marker underline that draws itself in */
export function Scribble({ color = '#ffc93c', variant = 0, delay = 0.5, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 16"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -bottom-1 left-[-2%] h-3 w-[104%] md:h-4 ${className}`}
    >
      <motion.path
        d={SCRIBBLES[variant % SCRIBBLES.length]}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/** Curvy hand-drawn arrow (points to bottom-left by default; flip with CSS) */
export function HandArrow({ className = '', color = 'currentColor', delay = 0.8 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 70" className={className} fill="none">
      <motion.path
        d="M95 6 C 72 4, 44 14, 22 56"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
      />
      <motion.path
        d="M13 40 L22 57 L37 47"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.75 }}
      />
    </svg>
  );
}

/** Tiny squiggle used before handwritten kickers */
export function Squiggle({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 16" className={`h-4 w-10 ${className}`} fill="none">
      <path d="M2 8 C 8 0, 12 16, 18 8 S 28 0, 38 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Tape({ className = '', color = '#ffc93c' }) {
  return <span aria-hidden="true" className={`tape z-10 ${className}`} style={{ '--tape': color }} />;
}
