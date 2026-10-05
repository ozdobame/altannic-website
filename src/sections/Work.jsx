import { motion } from 'framer-motion';
import { FoldIn } from '../components/Fold';
import { Facets } from '../components/Origami';
import { Heading, Section } from '../components/UI';

const PROJECTS = [
  {
    name: 'Nestwork',
    tag: 'Design system · SaaS',
    bg: 'bg-skylight',
    fold: '#9ccbf0',
    image: '/images/studio.webp',
    alt: 'Origami bowerbird placing a small paper UI card onto a neat stack of pastel paper interface cards',
    span: 'md:col-span-2 md:row-span-2',
    details: ['240 components, 3 brands, 1 source of truth', 'Teams ship features ~2× faster', 'Tokens → Figma → code'],
  },
  {
    name: 'Fern Health',
    tag: 'Mobile app',
    bg: 'bg-mint',
    fold: '#86d4b3',
    mock: 'phone',
    accent: '#22b8a7',
    details: ['Onboarding re-imagined', '+31% completion in testing', '17 iterations (worth it)'],
  },
  {
    name: 'Paperplane',
    tag: 'Travel booking',
    bg: 'bg-lemon',
    fold: '#e3c84c',
    mock: 'browser',
    accent: '#ff7a59',
    details: ['Checkout in three taps', 'Accessible date picker', 'Delightful micro-motion'],
  },
  {
    name: 'Meadow & Co.',
    tag: 'Brand + e-commerce',
    bg: 'bg-peach',
    fold: '#f0aa8c',
    mock: 'phone',
    accent: '#8b5cf6',
    details: ['New identity & store', 'Warm, hand-drawn brand', 'Story-led product pages'],
  },
  {
    name: 'Lumen Bank',
    tag: 'Fintech dashboard',
    bg: 'bg-lilac',
    fold: '#b6a3f0',
    mock: 'browser',
    accent: '#3046d9',
    span: 'md:col-span-2',
    details: ['Complex data, calm interface', 'Cut support tickets in half', 'WCAG 2.2 AA throughout'],
  },
];

function PaperMock({ kind, accent }) {
  if (kind === 'phone') {
    return (
      <div className="-rotate-6 rounded-[22px] bg-white p-2 shadow-[0_16px_30px_-12px_rgba(30,27,75,0.45)] transition-transform duration-500 group-hover:rotate-0">
        <div className="flex h-44 w-24 flex-col gap-1.5 rounded-[16px] bg-paper p-2">
          <div className="h-2 w-10 rounded-full bg-ink/15" />
          <div className="mt-1 h-14 rounded-lg" style={{ background: accent, opacity: 0.85 }} />
          <div className="h-2 w-16 rounded-full bg-ink/20" />
          <div className="h-2 w-12 rounded-full bg-ink/10" />
          <div className="mt-auto h-6 rounded-md bg-ink/80" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-[78%] rotate-2 rounded-xl bg-white p-2 shadow-[0_16px_30px_-12px_rgba(30,27,75,0.45)] transition-transform duration-500 group-hover:rotate-0">
      <div className="mb-2 flex gap-1">
        {['#ff7a59', '#ffc93c', '#22b8a7'].map((c) => (
          <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-2 rounded-lg bg-paper p-2">
        <div className="space-y-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-2 rounded-full bg-ink/15" />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <div className="col-span-3 h-10 rounded-md" style={{ background: accent, opacity: 0.85 }} />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 rounded-md bg-ink/10" />
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkCard({ p, i }) {
  return (
    <FoldIn className={`h-full ${p.span || ''}`} delay={(i % 3) * 0.08} rounded="rounded-2xl">
      <motion.article
        tabIndex={0}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        className="group h-full min-h-[260px] cursor-pointer outline-none drop-shadow-[0_18px_22px_rgba(30,27,75,0.16)]"
      >
        <div
          className={`dog-ear origami-face relative flex h-full flex-col overflow-hidden rounded-2xl ${p.bg}`}
          style={{ '--fold': p.fold, '--ear-size': '34px', perspective: 1000 }}
        >
          <Facets seed={i + 3} className="pointer-events-none absolute inset-0 h-full w-full" />
          <div className="relative flex flex-1 items-center justify-center p-6">
            {p.image ? (
              <img src={p.image} alt={p.alt} loading="lazy" width="1024" height="1024" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            ) : (
              <PaperMock kind={p.mock} accent={p.accent} />
            )}
          </div>
          <div className="relative flex items-end justify-between gap-4 bg-white/85 px-5 py-4 backdrop-blur-sm">
            <div>
              <p className="text-xs font-semibold tracking-widest text-ink/50 uppercase">{p.tag}</p>
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
            </div>
            <span className="font-hand text-xl text-satin">hover to unfold ↗</span>
          </div>

          {/* folded note that drops down on hover */}
          <motion.div
            className="origami-face absolute inset-x-4 top-4 z-10 rounded-xl bg-white p-5 shadow-xl"
            style={{ transformOrigin: '50% 0%' }}
            variants={{ rest: { rotateX: -96, opacity: 0 }, hover: { rotateX: 0, opacity: 1 } }}
            transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          >
            <p className="font-hand text-2xl text-coral">case notes —</p>
            <ul className="mt-2 space-y-1.5">
              {p.details.map((d) => (
                <li key={d} className="flex gap-2 text-[15px] font-medium">
                  <span className="text-satin">✦</span>
                  {d}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.article>
    </FoldIn>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Heading
          kicker="selected bowers (concept work)"
          kickerColor="text-satin"
          parts={['Work we’re', { t: 'proud', c: 'italic text-coral', scribble: '#7cc6fe' }, 'to show off.']}
        />
        <p className="max-w-xs -rotate-2 font-hand text-2xl text-ink/60">
          each one folded, unfolded and re-folded until it felt effortless.
        </p>
      </div>
      <div className="mt-14 grid gap-6 md:auto-rows-[270px] md:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <WorkCard key={p.name} p={p} i={i} />
        ))}
      </div>
    </Section>
  );
}
