import { OrigamiBird, Treasure } from '../components/Origami';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-satin-deep text-white">
      <svg aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute -top-px left-0 h-8 w-full text-paper">
        <path d="M0 0 H1440 V12 L1380 30 L1300 10 L1220 34 L1130 12 L1040 30 L960 8 L880 32 L790 12 L700 34 L610 10 L520 30 L430 12 L340 34 L250 10 L160 30 L80 12 L0 28 Z" fill="currentColor" />
      </svg>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-20 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-xl bg-white p-1">
              <OrigamiBird className="h-10 w-10" />
            </span>
            <span className="font-display text-3xl font-semibold">altannic</span>
          </div>
          <p className="mt-4 max-w-sm font-hand text-2xl leading-snug text-white/80">
            a UI/UX design studio, folded with patience. no bowerbirds were harmed — several twigs were moved nine times.
          </p>
          <div className="mt-5 flex gap-2">
            {['cap', 'feather', 'flower', 'berry', 'petal'].map((k) => (
              <Treasure key={k} kind={k} size={26} />
            ))}
          </div>
        </div>
        <nav aria-label="Footer">
          <p className="font-hand text-2xl text-sun">wander around</p>
          <ul className="mt-3 space-y-1.5 text-white/80">
            {[
              ['Story', '#story'],
              ['Services', '#services'],
              ['Process', '#process'],
              ['Arrange the bower', '#bower'],
              ['Work', '#work'],
            ].map(([l, h]) => (
              <li key={l}>
                <a href={h} className="hover:text-white hover:underline hover:decoration-sun hover:decoration-wavy">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-hand text-2xl text-sun">say cześć</p>
          <a href="mailto:hello@altannic.design" className="mt-3 block font-semibold hover:underline hover:decoration-sun hover:decoration-wavy">
            hello@altannic.design
          </a>
          <p className="mt-2 text-white/70">altannic.design · altannic.com</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-white/60">
          © {new Date().getFullYear()} Altannic Studio. Hand-folded in Europe.
        </p>
      </div>
    </footer>
  );
}
