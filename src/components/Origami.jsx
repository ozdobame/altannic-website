import { useMemo } from 'react';
import { mulberry32 } from '../lib/rand';

const pts = (arr) => arr.map((p) => p.map((n) => n.toFixed(2)).join(',')).join(' ');
const poly = (n, r, cx = 24, cy = 24, rot = 0) =>
  Array.from({ length: n }, (_, k) => {
    const a = rot + (k * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

/** Faceted origami satin bowerbird – used as logo + progress marker */
export function OrigamiBird({ className = '', title }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <polygon points="10,38 2,49 15,42" fill="#1f2a8c" />
      <polygon points="10,38 31,21 40,34" fill="#1f2a8c" />
      <polygon points="10,38 40,34 33,50" fill="#3046d9" />
      <polygon points="21,31 46,25 36,41" fill="#4f6cf5" />
      <polygon points="21,31 36,41 30,44" fill="#2a39b8" />
      <polygon points="38,31 44,15 54,23 48,33" fill="#2a39b8" />
      <polygon points="44,15 54,23 46,24" fill="#3a4ed6" />
      <polygon points="54,23 63,26 52,29" fill="#ffd84d" />
      <polygon points="54,23 63,26 57,25" fill="#ffe98a" />
      <circle cx="47.5" cy="22.5" r="2.1" fill="#8b5cf6" />
      <circle cx="48.1" cy="21.9" r="0.7" fill="#fff" />
      <path d="M27 48 L26 57 M33 48 L34 57 M23 57 L29 57 M31 57 L37 57" stroke="#8c6a48" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, Math.round(v + amt * 255)));
  return `rgb(${c((n >> 16) & 255)},${c((n >> 8) & 255)},${c(n & 255)})`;
};

const DEFAULTS = {
  cap: '#3046d9',
  feather: '#7cc6fe',
  flower: '#8b5cf6',
  berry: '#ff7a59',
  petal: '#ffc93c',
  straw: '#22b8a7',
};

/** Little folded-paper treasures the bowerbird collects */
export function Treasure({ kind = 'cap', color, size = 40, className = '' }) {
  const c = color || DEFAULTS[kind];
  const light = shade(c, 0.18);
  const dark = shade(c, -0.12);
  let body = null;

  if (kind === 'cap') {
    const o = poly(8, 20, 24, 24, Math.PI / 8);
    const i = poly(8, 12.5, 24, 24, Math.PI / 8);
    body = (
      <>
        <polygon points={pts(o)} fill={c} />
        {o.map((p, k) => (
          <polygon key={k} points={pts([p, o[(k + 1) % 8], i[(k + 1) % 8], i[k]])} fill={k % 2 ? '#fff' : '#000'} fillOpacity={k % 2 ? 0.14 : 0.1} />
        ))}
        <polygon points={pts(i)} fill={light} />
        <polygon points={pts([i[0], i[2], i[4], i[6]])} fill="#fff" fillOpacity="0.12" />
      </>
    );
  } else if (kind === 'feather') {
    body = (
      <g transform="rotate(25 24 24)">
        <polygon points="24,2 25,46 12,22" fill={dark} />
        <polygon points="24,2 36,19 25,46" fill={light} />
        <path d="M24.5 12 L16 18 M24.7 20 L14 27 M24.8 28 L16 34 M24.6 14 L33 19 M24.8 23 L33 27" stroke="#fff" strokeOpacity="0.45" strokeWidth="0.8" />
      </g>
    );
  } else if (kind === 'flower') {
    body = (
      <>
        {[0, 90, 180, 270].map((r, k) => (
          <g key={r} transform={`rotate(${r + 45} 24 24)`}>
            <polygon points="24,24 16,13 24,3 32,13" fill={k % 2 ? light : c} />
            <polygon points="24,24 24,3 32,13" fill="#000" fillOpacity="0.08" />
          </g>
        ))}
        <polygon points={pts(poly(5, 4.2, 24, 24, -Math.PI / 2))} fill="#ffd84d" />
      </>
    );
  } else if (kind === 'berry') {
    const h = poly(6, 14, 24, 27, Math.PI / 6);
    body = (
      <>
        {h.map((p, k) => (
          <polygon key={k} points={pts([[24, 27], p, h[(k + 1) % 6]])} fill={k % 2 ? c : light} />
        ))}
        <polygon points="24,14 16,8 24,11 31,6" fill="#22b8a7" />
      </>
    );
  } else if (kind === 'petal') {
    body = (
      <g transform="rotate(-20 24 24)">
        <polygon points="24,3 36,24 24,45" fill={light} />
        <polygon points="24,3 24,45 12,24" fill={c} />
      </g>
    );
  } else if (kind === 'straw') {
    body = (
      <g transform="rotate(-38 24 24)">
        <rect x="20" y="2" width="8" height="44" rx="2.5" fill={c} />
        {[6, 14, 22, 30, 38].map((y) => (
          <rect key={y} x="20" y={y} width="8" height="3.5" fill="#fff" fillOpacity="0.4" />
        ))}
        <rect x="24" y="2" width="4" height="44" rx="2" fill="#000" fillOpacity="0.08" />
      </g>
    );
  }

  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true">
      {body}
    </svg>
  );
}

/** Low-poly paper facets to lay over coloured surfaces */
export function Facets({ seed = 1, cols = 6, rows = 4, className = '' }) {
  const tris = useMemo(() => {
    const rand = mulberry32(seed);
    const grid = [];
    for (let r = 0; r <= rows; r++)
      for (let c = 0; c <= cols; c++) {
        const edge = r === 0 || r === rows || c === 0 || c === cols;
        grid.push([(c / cols) * 100 + (edge ? 0 : (rand() - 0.5) * 9), (r / rows) * 100 + (edge ? 0 : (rand() - 0.5) * 12)]);
      }
    const P = (r, c) => grid[r * (cols + 1) + c];
    const out = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++) {
        const a = P(r, c), b = P(r, c + 1), d = P(r + 1, c), e = P(r + 1, c + 1);
        if (rand() > 0.5) out.push([a, b, e], [a, e, d]);
        else out.push([a, b, d], [b, e, d]);
      }
    return out.map((t) => ({ t, v: rand() }));
  }, [seed, cols, rows]);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden="true">
      {tris.map(({ t, v }, i) => (
        <polygon
          key={i}
          points={pts(t)}
          fill={v > 0.5 ? '#fff' : '#1e1b4b'}
          fillOpacity={v > 0.5 ? (v - 0.5) * 0.5 : (0.5 - v) * 0.2}
        />
      ))}
    </svg>
  );
}
