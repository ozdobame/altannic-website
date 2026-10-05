import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue } from 'framer-motion';
import { Treasure } from '../components/Origami';
import { Heading, PaperButton, Section } from '../components/UI';
import { mulberry32 } from '../lib/rand';

const ITEMS = [
  { kind: 'cap', color: '#3046d9' },
  { kind: 'feather', color: '#7cc6fe' },
  { kind: 'flower', color: '#8b5cf6' },
  { kind: 'cap', color: '#4f7bff' },
  { kind: 'berry', color: '#ff7a59' },
  { kind: 'straw', color: '#22b8a7' },
  { kind: 'petal', color: '#ffc93c' },
  { kind: 'cap', color: '#22b8a7' },
  { kind: 'flower', color: '#7c9cff' },
  { kind: 'feather', color: '#3046d9' },
  { kind: 'petal', color: '#ff8fc4' },
  { kind: 'cap', color: '#1f2a8c' },
];

const COMMENTS = [
  'Hmm. Interesting choice…',
  'A little to the left?',
  'Ooh — that blue is working.',
  'No, no. Try it over there.',
  'Better! Again?',
  'Getting warmer…',
  'Now you’re thinking like an altannik.',
  'Lovely. But is it *perfect*?',
];

const messy = (seed) => {
  const r = mulberry32(seed);
  return ITEMS.map((_, i) => ({ fx: r(), fy: r(), r: (r() - 0.5) * 90, delay: i * 0.015 }));
};
const tidy = () => {
  const cols = 4;
  const rows = Math.ceil(ITEMS.length / cols);
  return ITEMS.map((_, i) => ({
    fx: 0.08 + (i % cols) * (0.84 / (cols - 1)),
    fy: 0.1 + Math.floor(i / cols) * (0.8 / (rows - 1)),
    r: 0,
    delay: i * 0.05,
  }));
};

function Piece({ item, target, mat, matRef, size, onDrop }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const placed = useRef(false);

  useEffect(() => {
    if (!mat.w) return;
    const tx = target.fx * (mat.w - size);
    const ty = target.fy * (mat.h - size);
    if (!placed.current) {
      x.set(tx);
      y.set(ty);
      rotate.set(target.r);
      placed.current = true;
      return;
    }
    const t = { type: 'spring', stiffness: 110, damping: 15, delay: target.delay };
    const a = [animate(x, tx, t), animate(y, ty, t), animate(rotate, target.r, t)];
    return () => a.forEach((c) => c.stop());
  }, [target, mat.w, mat.h, size, x, y, rotate]);

  return (
    <motion.button
      type="button"
      aria-label={`${item.kind} treasure – drag me`}
      drag
      dragConstraints={matRef}
      dragElastic={0.08}
      dragMomentum={false}
      onDragEnd={onDrop}
      whileHover={{ scale: 1.15 }}
      whileDrag={{ scale: 1.25, zIndex: 20 }}
      style={{ x, y, rotate, width: size, height: size }}
      className="absolute top-0 left-0 cursor-grab touch-none drop-shadow-[0_6px_6px_rgba(30,27,75,0.25)] active:cursor-grabbing"
    >
      <Treasure kind={item.kind} color={item.color} size={size} />
    </motion.button>
  );
}

export default function Bower() {
  const matRef = useRef(null);
  const [mat, setMat] = useState({ w: 0, h: 0 });
  const [targets, setTargets] = useState(() => messy(7));
  const [moves, setMoves] = useState(0);
  const [comment, setComment] = useState('Go on — rearrange my treasures.');
  const seed = useRef(7);

  useEffect(() => {
    const el = matRef.current;
    const ro = new ResizeObserver(([e]) => setMat({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const size = useMemo(() => (mat.w && mat.w < 420 ? 46 : 60), [mat.w]);

  const onDrop = () => {
    setMoves((m) => {
      const next = m + 1;
      setComment(COMMENTS[(next - 1) % COMMENTS.length]);
      return next;
    });
  };

  return (
    <Section id="bower" className="bg-paper-2/60">
      <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Heading
            kicker="your turn, little architect"
            kickerColor="text-coral"
            parts={['Arrange the', { t: 'bower.', c: 'italic text-satin', scribble: '#ffc93c' }]}
            sub="Bowerbirds rearrange their treasures for hours, chasing a perfection only they can see. Drag the pieces around — our resident critic will tell you how it’s going."
          />

          <div className="mt-8 flex items-start gap-4">
            <img
              src="/images/portrait.webp"
              alt=""
              width="64"
              height="64"
              loading="lazy"
              className="h-16 w-16 shrink-0 rounded-full border-4 border-white object-cover shadow-md"
            />
            <div className="relative min-h-[84px] flex-1" style={{ perspective: 600 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={comment + moves}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  style={{ transformOrigin: '50% 0%' }}
                  className="origami-face relative rounded-2xl rounded-tl-sm bg-white px-5 py-3 shadow-md"
                  aria-live="polite"
                >
                  <p className="font-hand text-[26px] leading-snug">{comment}</p>
                  <p className="mt-1 text-xs font-semibold tracking-widest text-ink/45 uppercase">
                    rearrangements: {moves}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <PaperButton
              type="button"
              onClick={() => {
                setTargets(tidy());
                setComment('Perfect alignment. …let’s iterate anyway.');
              }}
            >
              Make it perfect ✓
            </PaperButton>
            <PaperButton
              type="button"
              variant="paper"
              onClick={() => {
                seed.current += 1;
                setTargets(messy(seed.current));
                setComment('Chaos! Every great bower starts here.');
              }}
            >
              Shake it up
            </PaperButton>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rotate-1 rounded-[32px] bg-kraft/40" aria-hidden="true" />
          <div
            ref={matRef}
            className="grid-dots relative h-[380px] overflow-hidden rounded-[28px] bg-white shadow-[inset_0_0_0_3px_rgba(30,27,75,0.06),0_30px_50px_-30px_rgba(30,27,75,0.45)] sm:h-[460px]"
          >
            <svg aria-hidden="true" className="pointer-events-none absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M2 4 C 30 1, 70 3, 98 2 C 99 30, 97 70, 98 97 C 70 99, 30 97, 3 98 C 1 70, 3 30, 2 4 Z" fill="none" stroke="#c9a27a" strokeWidth="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
            </svg>
            <p className="pointer-events-none absolute right-5 bottom-4 -rotate-2 font-hand text-xl text-kraft-dark/70">the display floor</p>
            {ITEMS.map((it, i) => (
              <Piece key={i} item={it} target={targets[i]} mat={mat} matRef={matRef} size={size} onDrop={onDrop} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
