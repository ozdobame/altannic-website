import { useEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Accordion, FoldWords } from '../components/Fold';
import { HandArrow, Tape } from '../components/Hand';
import { PaperButton } from '../components/UI';
import { Treasure } from '../components/Origami';

const STRIPS = 5;
const SRC = '/images/hero.webp';

const NOTES = [
  { big: '120+', small: 'bowers built (aka products)', bg: 'bg-lemon', r: -4, fold: '#e3c84c' },
  { big: '∞', small: 'iterations — we lost count', bg: 'bg-mint', r: 3, fold: '#86d4b3' },
  { big: '1px', small: 'the smallest thing we’ll fuss over', bg: 'bg-peach', r: -2, fold: '#f0aa8c' },
];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const mount = useMotionValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const c = animate(mount, 1, { duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.35 });
    return () => c.stop();
  }, [mount, reduce]);

  // the picture folds back up as you scroll away – and unfolds again on the way back
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const progress = useTransform([mount, scrollYProgress], ([m, s]) => m * (1 - Math.min(1, s * 1.15) * 0.8));

  const strips = Array.from({ length: STRIPS }, (_, i) => (
    <div
      key={i}
      className="h-full w-full"
      style={{
        backgroundImage: `url(${SRC})`,
        backgroundSize: `${STRIPS * 100}% 100%`,
        backgroundPosition: `${(i / (STRIPS - 1)) * 100}% 0`,
      }}
    />
  ));

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* floating paper confetti */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        {[
          ['cap', '6%', '18%', 26, '#4f7bff'],
          ['flower', '46%', '12%', 30, '#8b5cf6'],
          ['berry', '3%', '78%', 28, '#ff7a59'],
          ['petal', '92%', '82%', 30, '#ffc93c'],
          ['feather', '94%', '14%', 34, '#7cc6fe'],
          ['straw', '40%', '90%', 30, '#22b8a7'],
        ].map(([k, x, y, s, c], i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: x, top: y }}
            animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <Treasure kind={k} size={s} color={c} />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="-rotate-2 font-hand text-[28px] text-coral md:text-[32px]"
          >
            cześć! we’re altannic —
          </motion.p>

          <motion.h1
            initial="fw-hidden"
            animate="fw-show"
            className="mt-2 font-display text-[44px] font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-[72px]"
            style={{ perspective: 900 }}
          >
            <FoldWords
              parts={[
                'We build interfaces the way',
                { t: 'bowerbirds', c: 'italic text-satin', scribble: '#ffc93c' },
                'build',
                { t: 'bowers.', c: 'text-coral' },
              ]}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
          >
            <span className="font-hand text-2xl text-satin">Altannik</span> is Polish for bowerbird — a tiny architect who
            gathers blue treasures, places every twig by hand, then rearranges it all again until it’s{' '}
            <em>just&nbsp;right</em>. That’s our whole design philosophy, in one wonderfully fussy bird.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <PaperButton href="#work">Unfold our work →</PaperButton>
            <PaperButton href="#contact" variant="paper">Say cześć</PaperButton>
          </motion.div>

          <div className="mt-12 flex flex-wrap gap-4">
            {NOTES.map((n, i) => (
              <motion.div
                key={n.big}
                initial={{ opacity: 0, y: 20, rotate: n.r * 3 }}
                animate={{ opacity: 1, y: 0, rotate: n.r }}
                whileHover={{ rotate: 0, scale: 1.07, y: -4 }}
                transition={{ type: 'spring', stiffness: 160, damping: 14, delay: 1.3 + i * 0.12 }}
                className="drop-shadow-[0_8px_10px_rgba(30,27,75,0.14)]"
              >
                <div className={`dog-ear origami-face w-[140px] rounded-sm px-4 py-3 ${n.bg}`} style={{ '--fold': n.fold }}>
                  <div className="font-display text-3xl font-semibold">{n.big}</div>
                  <div className="font-hand text-lg leading-tight text-ink/75">{n.small}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* the hero picture – a sheet of paper that unfolds */}
        <div className="relative">
          <div className="relative rotate-1 rounded-md bg-white p-2.5 shadow-[0_30px_60px_-25px_rgba(30,27,75,0.45)] md:p-3">
            <Accordion
              panels={strips}
              progress={progress}
              max={68}
              label="Origami satin bowerbird made of indigo paper holding a blue bottle cap in front of its kraft-paper twig bower, surrounded by colourful paper treasures"
              className="aspect-[1264/848] w-full"
            />
            <Tape className="-top-3 left-6 -rotate-6" color="#ff7a59" />
            <Tape className="-top-3 right-8 rotate-[5deg]" color="#7cc6fe" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="pointer-events-none absolute -top-16 right-0 hidden w-80 text-right md:block"
          >
            <p className="rotate-3 font-hand text-2xl leading-tight text-satin">this blue cap was placed 14 times</p>
            <HandArrow className="ml-auto mr-24 h-14 w-20 text-satin" delay={2.4} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            className="pointer-events-none absolute -bottom-16 left-[4%] hidden items-end gap-1 md:flex"
          >
            <HandArrow className="h-12 w-16 -scale-x-100 -scale-y-100 text-coral" delay={2.8} />
            <p className="-rotate-2 font-hand text-2xl text-coral">a curated palette (obviously)</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
