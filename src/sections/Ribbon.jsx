import { Treasure } from '../components/Origami';

const WORDS = ['patient', 'pixel-perfect', 'playful', 'iterative', 'curious', 'detail-obsessed', 'colourful', 'hand-folded'];
const KINDS = [
  ['cap', '#ffc93c'],
  ['flower', '#ffb8d9'],
  ['feather', '#c2f2dd'],
  ['berry', '#ff7a59'],
];

function Strip({ className, reverse, kinds }) {
  const items = [...WORDS, ...WORDS];
  return (
    <div className={`overflow-hidden shadow-[0_10px_24px_-12px_rgba(30,27,75,0.45)] ${className}`}>
      <div className={`flex w-max ${reverse ? 'animate-marquee-rev' : 'animate-marquee'}`}>
        {items.map((w, i) => (
          <span key={i} className="flex items-center gap-5 px-5 py-3.5 font-display text-2xl italic md:text-[32px]">
            <Treasure kind={kinds[i % kinds.length][0]} color={kinds[i % kinds.length][1]} size={30} />
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Ribbon() {
  return (
    <section aria-hidden="true" className="relative overflow-hidden py-10">
      <Strip className="origami-face relative z-10 -mx-4 -rotate-2 bg-satin text-white" kinds={KINDS} />
      <Strip
        className="origami-face -mx-4 -mt-3 rotate-[1.5deg] bg-sun text-ink"
        reverse
        kinds={[['cap', '#3046d9'], ['petal', '#ff7a59'], ['flower', '#8b5cf6'], ['straw', '#22b8a7']]}
      />
    </section>
  );
}
