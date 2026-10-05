import { motion } from 'framer-motion';
import { Tape } from '../components/Hand';
import { Heading, Section } from '../components/UI';

const NOTES = [
  {
    text: 'They moved one button two pixels and our sign-ups went up. I don’t fully understand it, but I respect it.',
    who: 'Head of Product, fintech start-up',
    bg: 'bg-lemon',
    fold: '#e3c84c',
    r: -3,
    tape: '#7cc6fe',
  },
  {
    text: 'Seventeen iterations, zero complaints, one perfect onboarding. The most patient team we’ve ever worked with.',
    who: 'Founder, health-tech',
    bg: 'bg-skylight',
    fold: '#9ccbf0',
    r: 2,
    tape: '#ff7a59',
  },
  {
    text: 'Their Figma files are tidier than my house. Every layer named. Every. Single. One.',
    who: 'Design lead, SaaS platform',
    bg: 'bg-pink',
    fold: '#ef8fbc',
    r: -1.5,
    tape: '#ffc93c',
  },
];

export default function Notes() {
  return (
    <Section className="grid-dots">
      <Heading align="center" kicker="kind words from the nest" kickerColor="text-teal" parts={['Notes pinned to', { t: 'our wall.', c: 'italic text-satin', scribble: '#ff7a59' }]} />
      <div className="mt-16 grid gap-10 md:grid-cols-3">
        {NOTES.map((n, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 40, rotate: n.r * 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: n.r }}
            whileHover={{ rotate: 0, scale: 1.04, y: -6 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.1 }}
            className="relative drop-shadow-[0_18px_20px_rgba(30,27,75,0.15)]"
          >
            <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" color={n.tape} />
            <div className={`dog-ear origami-face h-full rounded-sm p-7 ${n.bg}`} style={{ '--fold': n.fold, '--ear-size': '30px' }}>
              <blockquote className="font-hand text-[27px] leading-snug">“{n.text}”</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-ink/60">— {n.who}</figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
