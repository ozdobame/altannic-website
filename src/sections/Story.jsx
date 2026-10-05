import { FoldCard, FoldIn } from '../components/Fold';
import { Tape } from '../components/Hand';
import { Treasure } from '../components/Origami';
import { Heading, Section } from '../components/UI';

const FACTS = [
  {
    q: 'Why always blue?',
    a: 'Blue is rare in nature, so the satin bowerbird treasures it. We hunt for rare, precious ideas the same way.',
    cover: 'bg-skylight',
    kind: 'cap',
  },
  {
    q: 'How long does a bower take?',
    a: 'Weeks to build and a lifetime of tweaks. Great products are never “done” — they’re tended.',
    cover: 'bg-lemon',
    kind: 'straw',
  },
  {
    q: 'Who’s the critic?',
    a: 'Visitors inspect every twig before they stay. Your users are just as picky — so we test early and often.',
    cover: 'bg-pink',
    kind: 'flower',
  },
];

export default function Story() {
  return (
    <Section id="story">
      <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <FoldIn className="relative mx-auto w-full max-w-md" rounded="rounded-[28px]">
          <div className="relative -rotate-2 rounded-[28px] bg-white p-3 shadow-[0_30px_60px_-28px_rgba(30,27,75,0.5)]">
            <img
              src="/images/portrait.webp"
              alt="Close-up of an origami satin bowerbird folded from iridescent indigo paper, with a violet eye, pale yellow beak and a tiny blue paper flower"
              width="1024"
              height="1024"
              loading="lazy"
              className="aspect-square w-full rounded-[20px] object-cover"
            />
            <Tape className="-top-3 left-8 -rotate-6" color="#ffc93c" />
            <Tape className="-bottom-3 right-10 rotate-3" color="#c2f2dd" />
          </div>
          <p className="mt-6 rotate-[-3deg] text-center font-hand text-[26px] text-satin">
            meet Pan Altannik, our head of quality ✓
          </p>
        </FoldIn>

        <div>
          <Heading
            kicker="altannik (pl.) — the bowerbird"
            parts={['Meet our', { t: 'tiny', c: 'text-satin', scribble: '#7cc6fe', variant: 1 }, 'creative director.']}
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
            <p>
              The satin bowerbird doesn’t build a nest — it builds a <em>stage</em>. Two neat walls of twigs, a carefully
              chosen palette of blue treasures, and hours of rearranging until every piece sits exactly where it should.
            </p>
            <p>
              We named our studio after him because that’s exactly how we design: <strong className="text-ink">collect</strong>{' '}
              thoughtfully, <strong className="text-ink">arrange</strong> deliberately, and keep{' '}
              <strong className="text-ink">refining</strong> long after others would call it done.
            </p>
          </div>

          <div className="mt-24 grid gap-x-5 gap-y-20 sm:grid-cols-3">
            {FACTS.map((f) => (
              <FoldCard
                key={f.q}
                label={f.q}
                className="h-64"
                coverClass={f.cover}
                backClass={f.cover}
                hint="unfold"
                cover={
                  <>
                    <Treasure kind={f.kind} size={34} />
                    <p className="mt-3 font-display text-xl font-semibold leading-snug">{f.q}</p>
                  </>
                }
                inside={<p className="font-hand text-[21px] leading-tight text-ink/85">{f.a}</p>}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
