import { motion } from 'framer-motion';
import { Compass, Gauge, LayoutGrid, Palette, PenTool, Sparkles } from 'lucide-react';
import { FoldCard } from '../components/Fold';
import { Treasure } from '../components/Origami';
import { Heading, Section } from '../components/UI';

const SERVICES = [
  {
    icon: Compass,
    title: 'Product & UX design',
    tag: 'making complex feel obvious',
    desc: 'Research, journeys, flows and wireframes that turn tangled problems into calm, intuitive products.',
    points: ['User research & interviews', 'Journey mapping', 'Flows & wireframes'],
    cover: 'bg-skylight',
    accent: '#3046d9',
  },
  {
    icon: PenTool,
    title: 'UI & visual design',
    tag: 'every radius on purpose',
    desc: 'Pixel-perfect interfaces with personality — spacing, type, colour and shadow chosen deliberately.',
    points: ['Responsive UI', 'Accessible (WCAG 2.2)', 'Hand-off ready files'],
    cover: 'bg-lemon',
    accent: '#ffc93c',
  },
  {
    icon: LayoutGrid,
    title: 'Design systems',
    tag: 'one source of truth',
    desc: 'Token-based, documented component libraries that keep big teams consistent and fast.',
    points: ['Design tokens', 'Figma libraries', 'Docs & governance'],
    cover: 'bg-mint',
    accent: '#22b8a7',
  },
  {
    icon: Palette,
    title: 'Brand identity',
    tag: 'a story worth telling',
    desc: 'Logos, typography and colour systems that feel distinct, warm and unmistakably yours.',
    points: ['Logo & mark', 'Colour & type systems', 'Brand guidelines'],
    cover: 'bg-peach',
    accent: '#ff7a59',
  },
  {
    icon: Sparkles,
    title: 'Motion & interaction',
    tag: 'delight in every tap',
    desc: 'Micro-interactions and transitions that make products feel alive — like this page unfolding.',
    points: ['Micro-interactions', 'Prototypes', 'Motion guidelines'],
    cover: 'bg-lilac',
    accent: '#8b5cf6',
  },
  {
    icon: Gauge,
    title: 'UX audits & testing',
    tag: 'find friction, fix it',
    desc: 'Heuristic reviews and usability tests that surface what’s slowing people down — and how to fix it.',
    points: ['Heuristic review', 'Usability testing', 'Prioritised roadmap'],
    cover: 'bg-pink',
    accent: '#ff5fa2',
  },
];

export default function Services() {
  return (
    <Section id="services" className="grid-dots">
      <Heading
        align="center"
        kicker="what we fold"
        kickerColor="text-teal"
        parts={['Six ways we make products feel', { t: 'hand-made.', c: 'italic text-satin', scribble: '#ffb8d9', variant: 2 }]}
        sub="Hover (or tap) a card to unfold it. Every service is made with the same patient, detail-obsessed care."
      />

      <div className="mt-36 grid gap-x-6 gap-y-24 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 15, delay: (i % 3) * 0.1 }}
          >
            <FoldCard
              label={s.title}
              className="h-[290px]"
              coverClass={s.cover}
              backClass={s.cover}
              cover={
                <>
                  <div className="flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-xl bg-white/75 shadow-sm">
                      <s.icon size={26} strokeWidth={1.8} />
                    </span>
                    <span className="font-hand text-2xl text-ink/45">0{i + 1}</span>
                  </div>
                  <h3 className="mt-7 font-display text-[28px] font-semibold leading-tight">{s.title}</h3>
                  <p className="mt-1 font-hand text-2xl text-ink/65">{s.tag}</p>
                </>
              }
              inside={
                <>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{s.desc}</p>
                  <ul className="mt-auto space-y-1.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm font-medium">
                        <Treasure kind="cap" size={16} color={s.accent} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </>
              }
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
