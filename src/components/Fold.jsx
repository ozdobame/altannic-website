import { useRef, useState } from 'react';
import { motion, useReducedMotion, useTransform } from 'framer-motion';

/* ───────────────────────────────────────────────────────────
   FoldIn – a sheet of paper that unfolds into place when it
   scrolls into view (hinged at the top or bottom edge).
   ─────────────────────────────────────────────────────────── */
export function FoldIn({ children, delay = 0, className = '', from = 'top', rounded = '' }) {
  const reduce = useReducedMotion();
  const top = from === 'top';
  return (
    <motion.div
      className={className}
      style={{ perspective: 1400 }}
      initial={reduce ? 'fold-open' : 'fold-closed'}
      whileInView="fold-open"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.div
        className="relative h-full"
        style={{ transformOrigin: top ? '50% 0%' : '50% 100%' }}
        variants={{
          'fold-closed': { rotateX: top ? -84 : 84, opacity: 0 },
          'fold-open': {
            rotateX: 0,
            opacity: 1,
            transition: {
              rotateX: { type: 'spring', stiffness: 60, damping: 12, delay },
              opacity: { duration: 0.3, delay },
            },
          },
        }}
      >
        {children}
        <motion.span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-ink ${rounded}`}
          variants={{
            'fold-closed': { opacity: 0.35 },
            'fold-open': { opacity: 0, transition: { duration: 0.9, delay: delay + 0.15 } },
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────────────────
   Accordion – a zig-zag folded strip of paper. `progress`
   is a MotionValue: 0 = folded up, 1 = flat.
   Panels are nested so every crease stays attached.
   ─────────────────────────────────────────────────────────── */
function AccordionPanel({ panels, i, progress, max, axis }) {
  const horizontal = axis === 'x';
  const mult = i === 0 ? 1 : i % 2 === 1 ? -2 : 2;
  const rot = useTransform(progress, (p) => (1 - p) * max * mult);
  const shade = useTransform(progress, (p) => (1 - p) * (i % 2 ? 0.34 : 0.06));

  return (
    <motion.div
      style={{
        position: i === 0 ? 'relative' : 'absolute',
        ...(i === 0 ? {} : horizontal ? { left: '100%', top: 0 } : { top: '100%', left: 0 }),
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        transformOrigin: horizontal ? '0% 50%' : '50% 0%',
        [horizontal ? 'rotateY' : 'rotateX']: rot,
      }}
    >
      <div className="relative h-full w-full overflow-hidden">
        {panels[i]}
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${horizontal ? 'crease-x' : 'crease-y'}`} />
        <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-ink" style={{ opacity: shade }} />
      </div>
      {i < panels.length - 1 && <AccordionPanel panels={panels} i={i + 1} progress={progress} max={max} axis={axis} />}
    </motion.div>
  );
}

export function Accordion({ panels, progress, axis = 'x', max = 70, className = '', label }) {
  const n = panels.length;
  const m = axis === 'x' ? max : -max;
  // keep the folded strip centred while it shrinks
  const shift = useTransform(progress, (p) => {
    const a = ((1 - p) * max * Math.PI) / 180;
    return `${((n * (1 - Math.cos(a))) / 2) * 100}%`;
  });
  const horizontal = axis === 'x';
  return (
    <div className={className} style={{ perspective: 1800 }} role={label ? 'img' : undefined} aria-label={label}>
      <motion.div
        style={{
          width: horizontal ? `${100 / n}%` : '100%',
          height: horizontal ? '100%' : `${100 / n}%`,
          [horizontal ? 'x' : 'y']: shift,
          transformStyle: 'preserve-3d',
        }}
      >
        <AccordionPanel panels={panels} i={0} progress={progress} max={m} axis={axis} />
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   FoldCard – a folded greeting card. The coloured cover lifts
   open on hover / focus / tap to reveal what's inside.
   ─────────────────────────────────────────────────────────── */
export function FoldCard({ cover, inside, coverClass = 'bg-sky', backClass = 'bg-sky', className = '', hint = 'hover to unfold', label }) {
  const [open, setOpen] = useState(false);
  const pointer = useRef('mouse');

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-label={label}
      className={`relative cursor-pointer select-none outline-none ${className}`}
      style={{ perspective: 1400 }}
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
      onClick={() => pointer.current !== 'mouse' && setOpen((o) => !o)}
      onFocus={(e) => e.target.matches(':focus-visible') && setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      {/* inside of the card */}
      <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border-2 border-dashed border-ink/15 bg-white/85 p-6 shadow-[0_14px_30px_-16px_rgba(30,27,75,0.45)]">
        {inside}
      </div>

      {/* the cover that folds open */}
      <motion.div
        className="absolute inset-0 z-10"
        style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d' }}
        animate={{ rotateX: open ? 112 : 0 }}
        transition={{ type: 'spring', stiffness: 85, damping: 13 }}
      >
        <div
          className={`origami-face absolute inset-0 flex flex-col rounded-2xl p-6 shadow-[0_14px_30px_-14px_rgba(30,27,75,0.5)] ${coverClass}`}
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          {cover}
          <span className="mt-auto flex items-center gap-1 font-hand text-xl text-ink/60">
            {hint}
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true"><path d="M4 6 C 8 14, 12 14, 16 6 M12 12 L16 6 L10 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </span>
        </div>
        <div
          aria-hidden="true"
          className={`origami-face absolute inset-0 rounded-2xl brightness-[0.93] ${backClass}`}
          style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        />
      </motion.div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────
   FoldWords – headline words flip down one by one like paper
   tabs. Use inside a motion element with
   initial="fw-hidden" whileInView|animate="fw-show".
   parts: string | { t, c?, scribble?, variant? }
   ─────────────────────────────────────────────────────────── */
const wordVariants = {
  'fw-hidden': { rotateX: -90, opacity: 0 },
  'fw-show': (i) => ({
    rotateX: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14, delay: 0.1 + i * 0.06 },
  }),
};

export function FoldWords({ parts }) {
  let idx = 0;
  const out = [];
  parts.forEach((part, pi) => {
    const p = typeof part === 'string' ? { t: part } : part;
    const words = p.t.split(' ');
    const nodes = [];
    words.forEach((w, wi) => {
      if (wi) nodes.push(' ');
      nodes.push(
        <motion.span key={wi} custom={idx++} variants={wordVariants} className="inline-block" style={{ transformOrigin: '50% 0%' }}>
          {w}
        </motion.span>
      );
    });
    if (pi) out.push(' ');
    out.push(
      p.c || p.scribble ? (
        <span key={pi} className={`relative inline-block ${p.c || ''}`} style={{ perspective: 900 }}>
          {nodes}
          {p.scribble && <Underline color={p.scribble} variant={p.variant} delay={0.4 + idx * 0.06} />}
        </span>
      ) : (
        <span key={pi}>{nodes}</span>
      )
    );
  });
  return out;
}

function Underline({ color, variant = 0, delay }) {
  const d = [
    'M3 9 C 30 3, 60 13, 100 7 S 170 3, 197 10',
    'M4 7 C 50 13, 120 2, 196 8',
    'M3 10 Q 50 2, 100 9 T 197 7',
  ][variant % 3];
  return (
    <svg aria-hidden="true" viewBox="0 0 200 16" preserveAspectRatio="none" className="pointer-events-none absolute -bottom-1 left-[-2%] h-3 w-[104%] md:h-4">
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        variants={{ 'fw-hidden': { pathLength: 0 }, 'fw-show': { pathLength: 1, transition: { duration: 0.8, delay } } }}
      />
    </svg>
  );
}
