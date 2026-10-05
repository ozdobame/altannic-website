import { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { Heading, PaperButton, Section } from '../components/UI';
import { Treasure } from '../components/Origami';

const EMAIL = 'hello@altannic.design';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-140px' });
  const reduce = useReducedMotion();
  const open = inView || reduce;
  const [flapBehind, setFlapBehind] = useState(!!reduce);
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`New nest: ${f.get('name') || 'hello'}`);
    const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    'w-full border-0 border-b-2 border-dashed border-satin/30 bg-transparent px-1 py-1 font-hand text-2xl text-ink placeholder:text-ink/30 focus:border-satin focus:outline-none';

  return (
    <Section id="contact" className="overflow-hidden">
      <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Heading
            kicker="you’ve got mail (soon)"
            kickerColor="text-coral"
            parts={['Got a', { t: 'bower', c: 'italic text-satin', scribble: '#ffc93c' }, 'to build?']}
            sub="Tell us about your product, your users, or that one screen that keeps you up at night. We reply within two working days — usually with doodles."
          />
          <div className="mt-8 space-y-3">
            <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-3 text-xl font-semibold">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-sun shadow-sm transition-transform group-hover:-rotate-6">
                <Mail size={20} />
              </span>
              <span className="relative">
                {EMAIL}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-satin transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
            <p className="font-hand text-2xl text-ink/60">altannic.design · altannic.com — based in Europe, nesting worldwide</p>
          </div>
        </div>

        {/* origami envelope that opens when scrolled into view */}
        <div ref={ref} className="relative mx-auto h-[760px] w-full max-w-[540px]" style={{ perspective: 1600 }}>
          <div className="absolute inset-x-0 bottom-0 h-[240px] rounded-xl bg-satin-deep" />

          <motion.div
            className="absolute inset-x-0 top-[520px] h-[170px]"
            style={{ transformOrigin: '50% 0%', transformStyle: 'preserve-3d', zIndex: flapBehind ? 5 : 30 }}
            initial={{ rotateX: reduce ? 180 : 0 }}
            animate={{ rotateX: open ? 180 : 0 }}
            transition={{ duration: 0.9, ease: [0.6, 0, 0.3, 1], delay: 0.2 }}
            onAnimationComplete={() => open && setFlapBehind(true)}
          >
            <div className="origami-face absolute inset-0 bg-satin" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'hidden' }} />
            <div
              className="origami-face absolute inset-0 bg-sky"
              style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)', transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}
            />
          </motion.div>

          <motion.div
            className="lined-paper absolute top-[30px] left-[5%] z-10 h-[680px] w-[90%] rounded-lg bg-white shadow-[0_20px_40px_-20px_rgba(30,27,75,0.5)]"
            initial={{ y: reduce ? 0 : 500 }}
            animate={{ y: flapBehind ? 0 : 500 }}
            transition={{ type: 'spring', stiffness: 60, damping: 14 }}
          >
            <div className="py-6 pr-6 pl-16">
              {sent ? (
                <div className="pt-10">
                  <p className="font-hand text-4xl text-satin">Thank you!</p>
                  <p className="mt-3 font-hand text-2xl leading-snug">
                    Your email app should have opened with your note. If not, write to us at {EMAIL} — a bowerbird is standing by.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <Treasure kind="cap" size={34} />
                    <Treasure kind="flower" size={34} />
                    <Treasure kind="feather" size={34} />
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4">
                  <p className="font-hand text-[34px] leading-none text-satin">Dear Altannic,</p>
                  <label className="block">
                    <span className="font-hand text-xl text-ink/60">my name is</span>
                    <input name="name" required autoComplete="name" className={field} placeholder="Ada Lovelace" />
                  </label>
                  <label className="block">
                    <span className="font-hand text-xl text-ink/60">you can reach me at</span>
                    <input name="email" type="email" required autoComplete="email" className={field} placeholder="ada@example.com" />
                  </label>
                  <label className="block">
                    <span className="font-hand text-xl text-ink/60">and I’d love some help with</span>
                    <textarea name="message" required rows={2} className={`${field} resize-none leading-9`} placeholder="a little app that needs a lot of love…" />
                  </label>
                  <PaperButton type="submit" variant="coral">Seal & send ✉</PaperButton>
                </form>
              )}
            </div>
          </motion.div>

          <div
            className="origami-face absolute inset-x-0 bottom-0 z-20 h-[240px] rounded-b-xl bg-satin"
            style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
          >
            <p className="absolute right-0 bottom-6 left-0 text-center font-hand text-2xl text-white/85">to: the altannic nest ✦ eu</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
