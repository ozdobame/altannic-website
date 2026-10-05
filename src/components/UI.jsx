import { motion } from 'framer-motion';
import { FoldWords } from './Fold';
import { Squiggle } from './Hand';

const BUTTON_STYLES = {
  primary: 'bg-satin text-white [--fold:#1a2380]',
  sun: 'bg-sun text-ink [--fold:#c98f00]',
  paper: 'bg-white text-ink [--fold:#c9a27a]',
  coral: 'bg-coral text-white [--fold:#c4482b]',
};

/** Paper button with a folded corner that flattens on hover */
export function PaperButton({ href, children, variant = 'primary', className = '', ...rest }) {
  const Cmp = href ? motion.a : motion.button;
  return (
    <span className={`inline-block drop-shadow-[0_5px_0_rgba(30,27,75,0.2)] transition-[filter] hover:drop-shadow-[0_8px_0_rgba(30,27,75,0.16)] ${className}`}>
      <Cmp
        href={href}
        whileHover={{ y: -3 }}
        whileTap={{ y: 2, scale: 0.98 }}
        className={`dog-ear inline-flex items-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold tracking-wide ${BUTTON_STYLES[variant]}`}
        {...rest}
      >
        {children}
      </Cmp>
    </span>
  );
}

/** Section heading: handwritten kicker + folding display headline */
export function Heading({ kicker, parts, sub, align = 'left', kickerColor = 'text-coral', className = '', as = 'h2' }) {
  const H = as === 'h1' ? motion.h1 : motion.h2;
  const center = align === 'center';
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''} ${className}`}>
      {kicker && (
        <motion.p
          initial={{ opacity: 0, y: 10, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`flex items-center gap-2 font-hand text-2xl md:text-[28px] ${kickerColor} ${center ? 'justify-center' : ''}`}
        >
          <Squiggle /> {kicker}
        </motion.p>
      )}
      <H
        initial="fw-hidden"
        whileInView="fw-show"
        viewport={{ once: true, margin: '-40px' }}
        className="mt-2 font-display text-4xl font-semibold leading-[1.06] tracking-tight text-balance md:text-6xl"
        style={{ perspective: 900 }}
      >
        <FoldWords parts={parts} />
      </H>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 text-lg leading-relaxed text-ink/70"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}

export function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`relative py-24 md:py-32 ${className}`}>
      <div className="relative mx-auto max-w-6xl px-5">{children}</div>
    </section>
  );
}
