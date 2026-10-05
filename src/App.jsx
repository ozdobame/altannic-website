import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Sparkles, Eye, Layers, PenTool, Palette,
  Repeat, Gem, Feather, Star, ChevronDown, Hexagon, Send, MapPin,
  Search, Layout
} from 'lucide-react';

/* ─────────────────────────────────────────────
   Bowerbird SVG – hand-drawn bower structure
   ───────────────────────────────────────────── */
function BowerSVG({ progress = 0 }) {
  return (
    <svg viewBox="0 0 400 320" className="w-full h-full" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Bower arch - left */}
      <motion.path
        d="M80 300 Q60 150 140 40"
        initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
        className="text-bower-blue/60"
      />
      {/* Bower arch - right */}
      <motion.path
        d="M320 300 Q340 150 260 40"
        initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
        className="text-bower-blue/60"
      />
      {/* Cross twigs */}
      <motion.path d="M140 40 Q200 100 260 40"
        initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.6 }}
        className="text-moss/70" />
      <motion.path d="M120 90 Q200 160 280 90"
        initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
        className="text-moss/50" />
      <motion.path d="M100 160 Q200 230 300 160"
        initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
        transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
        className="text-moss/40" />
      {/* Twigs left side */}
      {[[85,240,55,200],[95,280,70,250],[75,210,50,170]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
          initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
          transition={{ duration: 0.6, delay: 1.1 + i*0.1 }} className="text-moss/40" />
      ))}
      {/* Twigs right side */}
      {[[315,240,345,200],[305,280,330,250],[325,210,350,170]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={`r${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
          initial={{ pathLength: 0 }} animate={{ pathLength: progress }}
          transition={{ duration: 0.6, delay: 1.1 + i*0.1 }} className="text-moss/40" />
      ))}
      {/* Collected treasures - blue gems at the entrance */}
      {[[170,290],[200,295],[230,288],[185,280],[215,278],[195,300],[220,302]].map(([cx,cy],i) => (
        <motion.circle key={`g${i}`} cx={cx} cy={cy} r={3.5 + Math.random()*2}
          initial={{ scale: 0 }} animate={{ scale: progress }}
          transition={{ duration: 0.5, delay: 1.4 + i*0.08 }}
          className="fill-bower-blue text-bower-blue"
          strokeWidth="0" />
      ))}
      {/* A few berry accents */}
      {[[160,295],[240,290],[250,300],[155,285]].map(([cx,cy],i) => (
        <motion.circle key={`b${i}`} cx={cx} cy={cy} r={2.5}
          initial={{ scale: 0 }} animate={{ scale: progress }}
          transition={{ duration: 0.4, delay: 1.6 + i*0.06 }}
          className="fill-berry text-berry"
          strokeWidth="0" />
      ))}
      {/* Bowerbird silhouette on a twig */}
      <motion.g
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: progress, x: 0 }}
        transition={{ duration: 1, delay: 2 }}>
        <ellipse cx="200" cy="52" rx="14" ry="10" className="fill-ink/80 text-ink/80" strokeWidth="0" />
        <circle cx="208" cy="46" r="5" className="fill-ink/80 text-ink/80" strokeWidth="0" />
        <polygon points="213,45 230,42 213,48" className="fill-copper text-copper" strokeWidth="0.5" />
        <line x1="200" y1="62" x2="195" y2="80" className="stroke-ink/80" strokeWidth="1.5" />
        <line x1="195" y1="80" x2="188" y2="85" className="stroke-ink/80" strokeWidth="1" />
        <line x1="195" y1="80" x2="192" y2="88" className="stroke-ink/80" strokeWidth="1" />
        {/* Blue object in beak */}
        <motion.circle cx="228" cy="41" r="3"
          animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="fill-bower-blue text-bower-blue" strokeWidth="0" />
      </motion.g>
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Magnetic hover button
   ───────────────────────────────────────────── */
function MagneticButton({ children, href, dark }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };

  return (
    <motion.a
      ref={ref} href={href}
      onMouseMove={handleMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm tracking-wide
        transition-colors duration-300 cursor-pointer group
        ${dark
          ? 'bg-bower-blue text-white hover:bg-bower-blue-dark'
          : 'bg-ink text-cream hover:bg-ink-light'}`}
    >
      {children}
      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Section wrapper
   ───────────────────────────────────────────── */
function Section({ children, className = '', dark = false, id }) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 overflow-hidden ${dark ? 'bg-ink text-cream' : 'bg-cream text-ink'} ${className}`}>
      <div className="max-w-6xl mx-auto relative z-10">
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Badge / Chip
   ───────────────────────────────────────────── */
function Badge({ children, dark }) {
  return (
    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
      ${dark ? 'bg-white/10 text-bower-blue-light border border-white/10' : 'bg-ink/5 text-ink/60 border border-ink/10'}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-bower-blue animate-pulse-glow" />
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────────
   Service Card
   ───────────────────────────────────────────── */
function ServiceCard({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl
        transition-shadow duration-500 border border-ink/5"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-bower-blue/3 rounded-bl-[80px] rounded-tr-3xl
        group-hover:bg-bower-blue/6 transition-colors duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 mb-6 rounded-2xl bg-bower-blue/10 flex items-center justify-center
          group-hover:bg-bower-blue group-hover:text-white transition-all duration-300">
          <Icon size={22} />
        </div>
        <h3 className="text-xl font-semibold mb-3 font-[family-name:var(--font-display)]">{title}</h3>
        <p className="text-ink/60 leading-relaxed text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Process Step
   ───────────────────────────────────────────── */
function ProcessStep({ number, title, desc, icon: Icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="flex gap-6 items-start group"
    >
      <div className="flex-shrink-0 relative">
        <div className="w-14 h-14 rounded-2xl bg-bower-blue/10 flex items-center justify-center
          group-hover:bg-bower-blue group-hover:text-white transition-all duration-300">
          <Icon size={22} />
        </div>
        {index < 3 && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-12 bg-bower-blue/20" />
        )}
      </div>
      <div className="pb-12">
        <span className="text-xs font-bold tracking-widest text-bower-blue uppercase">{number}</span>
        <h3 className="text-xl font-semibold mt-1 mb-2 font-[family-name:var(--font-display)]">{title}</h3>
        <p className="text-ink/60 leading-relaxed text-sm">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Decorative floating elements
   ───────────────────────────────────────────── */
function FloatingGems() {
  const gems = [
    { x: '5%', y: '20%', size: 8, color: 'bg-bower-blue/20', delay: 0 },
    { x: '92%', y: '15%', size: 6, color: 'bg-berry/20', delay: 1 },
    { x: '15%', y: '70%', size: 10, color: 'bg-bower-blue/15', delay: 2 },
    { x: '85%', y: '60%', size: 7, color: 'bg-berry/15', delay: 0.5 },
    { x: '50%', y: '85%', size: 5, color: 'bg-bower-blue/20', delay: 3 },
    { x: '35%', y: '40%', size: 4, color: 'bg-copper/15', delay: 1.5 },
    { x: '70%', y: '80%', size: 9, color: 'bg-bower-blue/12', delay: 2.5 },
    { x: '3%', y: '50%', size: 6, color: 'bg-berry/18', delay: 3.5 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {gems.map((g, i) => (
        <motion.div key={i}
          className={`absolute rounded-full ${g.color}`}
          style={{ left: g.x, top: g.y, width: g.size*2, height: g.size*2 }}
          animate={{ y: [0, -30, 0], opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 4 + g.delay, repeat: Infinity, delay: g.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   APP
   ════════════════════════════════════════════ */
export default function App() {
  const [bowerProgress, setBowerProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    setBowerProgress(1);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-cream">
      {/* ── Nav ── */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300
          ${scrolled ? 'bg-cream/90 backdrop-blur-xl border-b border-ink/5 shadow-sm' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-bower-blue flex items-center justify-center
              group-hover:scale-105 transition-transform">
              <Hexagon size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">altannic</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
            {['Work', 'Services', 'Process', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="hover:text-ink transition-colors relative after:absolute after:bottom-0 after:left-0
                  after:w-0 hover:after:w-full after:h-px after:bg-bower-blue after:transition-all">
                {item}
              </a>
            ))}
          </div>
          <a href="#contact"
            className="hidden md:inline-flex px-5 py-2 bg-ink text-cream text-sm font-medium rounded-full
              hover:bg-ink-light transition-colors">
            Start a project
          </a>
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <Section className="min-h-screen flex items-center pt-20" id="hero">
        <FloatingGems />
        <motion.div style={{ opacity: heroOpacity }} className="w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge>UI/UX Design Studio</Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-5xl md:text-7xl font-bold leading-[1.08] mt-6 mb-6 font-[family-name:var(--font-display)] text-balance"
              >
                We build
                <br />
                <span className="shimmer-text">with bowerbird</span>
                <br />
                precision.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-lg text-ink/60 leading-relaxed max-w-md mb-8"
              >
                Like the bowerbird — nature's most meticulous architect — we craft digital experiences
                with obsessive attention to detail, one perfectly placed element at a time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <MagneticButton href="#work" dark>See our work</MagneticButton>
                <MagneticButton href="#contact">Let's talk</MagneticButton>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 flex gap-8 text-sm text-ink/40"
              >
                {[
                  { label: 'Projects crafted', value: '120+' },
                  { label: 'Years of collecting', value: '8+' },
                  { label: 'Happy collaborators', value: '60+' },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-ink/80 font-[family-name:var(--font-display)]">{stat.value}</div>
                    <div className="text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right - Bowerbird illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex justify-center"
            >
              <div className="w-full max-w-[420px] aspect-square relative">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-gradient-radial from-bower-blue/10 via-transparent to-transparent
                  rounded-full blur-3xl animate-pulse-glow" />
                <BowerSVG progress={bowerProgress} />
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ink/30"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      </Section>

      {/* ── Philosophy ── */}
      <Section dark id="about">
        <FloatingGems />
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge dark>Our Philosophy</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 font-[family-name:var(--font-display)] text-balance leading-[1.15]">
              Every detail is a
              <span className="text-bower-blue-light"> collected treasure.</span>
            </h2>
            <p className="text-cream/60 leading-relaxed mb-6">
              The satin bowerbird spends hours arranging twigs, collecting blue objects,
              adjusting every angle — obsessing over a creation that must be <em>just right</em>.
            </p>
            <p className="text-cream/60 leading-relaxed mb-8">
              We bring that same relentless perfectionism to digital design.
              No pixel is too small. No interaction too subtle.
              We iterate until it's not just good — it's <strong>bowerbird good</strong>.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Eye, label: 'Pixel-perfect precision' },
                { icon: Repeat, label: 'Iterative refinement' },
                { icon: Gem, label: 'Curated aesthetics' },
                { icon: Feather, label: 'Crafted with care' },
              ].map(item => (
                <span key={item.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                  bg-white/5 border border-white/10 text-sm text-cream/80">
                  <item.icon size={14} className="text-bower-blue-light" />
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Decorative bower quote card */}
            <div className="relative p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur">
              <Sparkles size={28} className="text-bower-blue-light mb-6" />
              <blockquote className="text-xl italic leading-relaxed text-cream/80 font-[family-name:var(--font-display)]">
                "The bowerbird does not inherit its aesthetic — it <strong className="text-bower-blue-light">cultivates</strong> it,
                twig by twig, berry by berry. Great design is the same."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bower-blue/20 flex items-center justify-center">
                  <Hexagon size={16} className="text-bower-blue-light" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Altannic Studio</div>
                  <div className="text-xs text-cream/40">Est. 2016</div>
                </div>
              </div>
            </div>
            {/* Decorative collected gems */}
            {[
              { pos: '-top-4 -right-4', size: 'w-16 h-16', color: 'bg-bower-blue/30' },
              { pos: '-bottom-3 -left-3', size: 'w-12 h-12', color: 'bg-berry/20' },
              { pos: 'top-1/2 -right-6', size: 'w-8 h-8', color: 'bg-bower-blue/20' },
            ].map((g, i) => (
              <motion.div key={i} className={`absolute ${g.pos} ${g.size} rounded-2xl ${g.color} backdrop-blur`}
                animate={{ rotate: [0, 10, 0], scale: [1, 1.05, 1] }}
                transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.7 }} />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* ── Services ── */}
      <Section id="services">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge>What we do</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 font-[family-name:var(--font-display)] text-balance">
            Crafted services for
            <span className="text-bower-blue"> discerning</span> brands.
          </h2>
          <p className="text-ink/50 max-w-lg mx-auto">
            From strategy to pixels, we offer end-to-end design that turns complex problems into elegant, intuitive experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: PenTool, title: 'UI/UX Design', desc: 'Full-cycle product design from research and wireframes to pixel-perfect interfaces that users love.' },
            { icon: Palette, title: 'Brand Identity', desc: 'Cohesive visual identities — logos, typography, color systems — that tell your story with clarity and impact.' },
            { icon: Layers, title: 'Design Systems', desc: 'Scalable, maintainable component libraries and token-based systems that keep your product consistent at scale.' },
            { icon: Sparkles, title: 'Interaction Design', desc: 'Delightful micro-interactions, animations, and transitions that make every tap and click feel intentional.' },
            { icon: Eye, title: 'UX Audits', desc: 'Deep-dive heuristic evaluations and usability testing to uncover friction and unlock conversion gains.' },
            { icon: Gem, title: 'Design Strategy', desc: 'Workshops, journey mapping, and strategic frameworks to align your product vision with real user needs.' },
          ].map((svc, i) => (
            <ServiceCard key={svc.title} {...svc} index={i} />
          ))}
        </div>
      </Section>

      {/* ── Process ── */}
      <Section dark id="process">
        <FloatingGems />
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge dark>The Bowerbird Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 font-[family-name:var(--font-display)] text-balance leading-[1.15]">
              Patient.
              <span className="text-bower-blue-light"> Iterative.</span>
              Perfected.
            </h2>
            <p className="text-cream/60 leading-relaxed">
              A bowerbird doesn't rush its bower. Neither do we.
              Our process is methodical, collaborative, and driven by an unwavering commitment to getting every detail right.
            </p>
          </motion.div>

          <div>
            {[
              { number: '01', title: 'Discover & Collect', desc: 'We gather insights, research your users, and collect inspiration — like a bowerbird scouting for the perfect blue treasures.', icon: Search },
              { number: '02', title: 'Structure & Arrange', desc: 'Wireframes, flows, and architecture — we build the framework, placing each element with intention and precision.', icon: Layout },
              { number: '03', title: 'Polish & Refine', desc: 'The bowerbird adjusts every twig. We iterate on every pixel, every interaction, until the experience feels effortlessly perfect.', icon: Repeat },
              { number: '04', title: 'Present & Perfect', desc: 'We deliver, observe, and continue refining. A bower is never truly finished — and neither is great design.', icon: Sparkles },
            ].map((step, i) => (
              <ProcessStep key={step.number} {...step} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ── Work teaser ── */}
      <Section id="work">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge>Selected Work</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-4 font-[family-name:var(--font-display)] text-balance">
            Projects we've
            <span className="text-bower-blue"> collected</span> with pride.
          </h2>
        </motion.div>

        {/* Bento-style showcase grid */}
        <div className="grid md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
          {[
            { title: 'Fintech Dashboard', tag: 'UI/UX', span: 'md:col-span-2 md:row-span-2', gradient: 'from-indigo-900 via-blue-800 to-cyan-700' },
            { title: 'Health App', tag: 'Mobile', span: '', gradient: 'from-emerald-800 via-teal-700 to-green-600' },
            { title: 'SaaS Platform', tag: 'Web App', span: '', gradient: 'from-violet-800 via-purple-700 to-fuchsia-600' },
            { title: 'E-commerce', tag: 'Brand + UX', span: 'md:col-span-2', gradient: 'from-amber-700 via-orange-600 to-rose-500' },
            { title: 'Design System', tag: 'System', span: '', gradient: 'from-slate-800 via-gray-700 to-zinc-600' },
            { title: 'AI Platform', tag: 'Product', span: '', gradient: 'from-cyan-800 via-blue-700 to-indigo-600' },
          ].map((project, i) => (
            <motion.div key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden ${project.span} cursor-pointer group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90
                group-hover:opacity-100 transition-opacity duration-500`} />
              {/* Bower twig decoration */}
              <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity"
                viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
                <path d="M10 90 Q30 50 50 30 Q70 10 90 20" />
                <path d="M50 30 Q60 15 55 5" />
              </svg>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-bold tracking-widest uppercase text-white/70">{project.tag}</span>
                <h3 className="text-xl font-semibold text-white mt-1 font-[family-name:var(--font-display)]">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-ink/40 text-sm mb-4">Like a bowerbird's collection, this is just a glimpse.</p>
          <MagneticButton href="#contact" dark>Start your project</MagneticButton>
        </motion.div>
      </Section>

      {/* ── CTA / Contact ── */}
      <Section dark id="contact">
        <FloatingGems />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <Badge dark>Let's build something</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-6 font-[family-name:var(--font-display)] text-balance leading-[1.1]">
            Ready to create
            <span className="text-bower-blue-light"> something extraordinary?</span>
          </h2>
          <p className="text-cream/50 text-lg leading-relaxed mb-10">
            Whether you need a full product design, a brand refresh, or a design system that scales —
            we're ready to gather the twigs and build something beautiful together.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <MagneticButton href="mailto:hello@altannic.design" dark>
              <Send size={16} /> hello@altannic.design
            </MagneticButton>
            <span className="text-cream/30 text-sm">or</span>
            <a href="mailto:hello@altannic.design"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium text-sm
                border border-white/20 text-cream/80 hover:bg-white/5 transition-colors">
              <MapPin size={16} /> Based in Europe, working worldwide
            </a>
          </div>

          {/* Email form placeholder */}
          <div className="max-w-md mx-auto bg-white/5 rounded-2xl p-6 border border-white/10">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm
                  text-cream placeholder:text-cream/30 focus:outline-none focus:border-bower-blue-light transition-colors" />
              <button type="submit"
                className="px-6 py-3 bg-bower-blue text-white rounded-xl text-sm font-medium
                  hover:bg-bower-blue-dark transition-colors flex items-center gap-2">
                Get in touch <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </motion.div>
      </Section>

      {/* ── Footer ── */}
      <footer className="bg-ink text-cream/40 px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-bower-blue/30 flex items-center justify-center">
              <Hexagon size={12} className="text-bower-blue-light" />
            </div>
            <span className="font-bold text-cream/60 tracking-tight">altannic</span>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-cream/80 transition-colors">Work</a>
            <a href="#" className="hover:text-cream/80 transition-colors">Services</a>
            <a href="#" className="hover:text-cream/80 transition-colors">Process</a>
            <a href="#" className="hover:text-cream/80 transition-colors">About</a>
            <a href="mailto:hello@altannic.design" className="hover:text-cream/80 transition-colors">Contact</a>
          </div>
          <div className="text-xs">
            © {new Date().getFullYear()} Altannic Studio — Built with bowerbird precision.
          </div>
        </div>
      </footer>
    </div>
  );
}

