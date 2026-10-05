import { useRef } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import { Accordion, FoldIn } from '../components/Fold';
import { Tape } from '../components/Hand';
import { Treasure } from '../components/Origami';
import { Heading, Section } from '../components/UI';

const STEPS = [
  {
    n: '01',
    title: 'Collect',
    text: 'Research, interviews, analytics, inspiration. We gather every blue treasure before we build anything.',
    note: 'week 1–2 · lots of listening',
    bg: 'bg-skylight',
    kind: 'cap',
  },
  {
    n: '02',
    title: 'Arrange',
    text: 'Structure first: information architecture, flows and wireframes — placed twig by twig, with intention.',
    note: 'sketch, sketch, sketch',
    bg: 'bg-lemon',
    kind: 'straw',
  },
  {
    n: '03',
    title: 'Refine',
    text: 'Prototype, test, nudge 1px, test again. We repeat until the critic sings — and then once more.',
    note: 'iteration #47 ✓',
    bg: 'bg-lilac',
    kind: 'flower',
  },
  {
    n: '04',
    title: 'Reveal',
    text: 'Hand-off, launch and tending. A bower is never truly finished, so we stay to keep it beautiful.',
    note: '…and then we iterate',
    bg: 'bg-mint',
    kind: 'feather',
  },
];

function StepPanel({ s, compact }) {
  return (
    <div className={`origami-face flex h-full flex-col p-7 ${s.bg} ${compact ? 'rounded-2xl' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="font-display text-6xl font-semibold text-ink/85">{s.n}</span>
        <Treasure kind={s.kind} size={44} />
      </div>
      <h3 className="mt-6 font-display text-3xl font-semibold">{s.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{s.text}</p>
      <p className="mt-auto pt-6 -rotate-2 font-hand text-2xl text-satin">{s.note}</p>
    </div>
  );
}

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'start 0.25'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 20 });
  const progress = useTransform(smooth, [0, 1], [0, 1], { clamp: true });

  return (
    <Section id="process">
      <Heading
        kicker="the bowerbird method"
        kickerColor="text-violet"
        parts={['Patient.', 'Iterative.', { t: 'Perfected.', c: 'italic text-coral', scribble: '#c2f2dd' }]}
        sub="Scroll and watch the process unfold — just like a project does: one crease at a time, never rushed."
      />

      {/* desktop: a long accordion-folded strip that opens as you scroll */}
      <div ref={ref} className="relative mt-16 hidden md:block">
        <div className="relative rounded-xl shadow-[0_30px_50px_-30px_rgba(30,27,75,0.5)]">
          <Accordion panels={STEPS.map((s) => <StepPanel key={s.n} s={s} />)} progress={progress} max={62} className="h-[460px] w-full" />
        </div>
        <Tape className="-top-3 left-[10%] -rotate-3" color="#ff7a59" />
        <Tape className="-top-3 right-[12%] rotate-2" color="#3046d9" />
      </div>

      {/* mobile: each step unfolds on its own */}
      <div className="mt-12 grid gap-5 md:hidden">
        {STEPS.map((s, i) => (
          <FoldIn key={s.n} delay={i * 0.05} rounded="rounded-2xl">
            <div className="h-[300px]">
              <StepPanel s={s} compact />
            </div>
          </FoldIn>
        ))}
      </div>

      <FoldIn className="mt-24" rounded="rounded-3xl">
        <figure className="relative rounded-3xl bg-white p-3 shadow-[0_30px_60px_-30px_rgba(30,27,75,0.5)]">
          <img
            src="/images/treasures.webp"
            alt="Flat lay of origami treasures arranged in perfect rows: blue bottle caps, feathers, teal straws, violet flowers, coral berries and yellow petals, with one blue clothes peg"
            width="1376"
            height="768"
            loading="lazy"
            className="w-full rounded-2xl"
          />
          <figcaption className="absolute -bottom-5 right-6 -rotate-3 rounded-md bg-sun px-4 py-1.5 font-hand text-2xl shadow-md">
            everything in its place. (we checked twice — spot the peg?)
          </figcaption>
        </figure>
      </FoldIn>
    </Section>
  );
}
