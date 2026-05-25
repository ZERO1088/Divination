// ============================================================
// CardArt —— 22 张大阿卡纳 SVG 象征插画
// 风格：克制几何 · 金/琥珀单色 · 神秘学符号
// viewBox="0 0 80 100" 适配任意尺寸
// ============================================================

import { type ReactNode } from 'react';

interface CardArtProps {
  cardId: number;
}

export function CardArt({ cardId }: CardArtProps): ReactNode {
  return (
    <svg
      viewBox="0 0 80 100"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: 'visible' }}
    >
      {renderArt(cardId)}
    </svg>
  );
}

const G = '#fde68a';
const G2 = 'rgba(253,230,138,0.45)';
const G3 = 'rgba(253,230,138,0.22)';
const G4 = 'rgba(253,230,138,0.10)';

function renderArt(id: number): ReactNode {
  switch (id) {
    case 0: return <Fool />;
    case 1: return <Magician />;
    case 2: return <HighPriestess />;
    case 3: return <Empress />;
    case 4: return <Emperor />;
    case 5: return <Hierophant />;
    case 6: return <Lovers />;
    case 7: return <Chariot />;
    case 8: return <Strength />;
    case 9: return <Hermit />;
    case 10: return <WheelOfFortune />;
    case 11: return <Justice />;
    case 12: return <HangedMan />;
    case 13: return <Death />;
    case 14: return <Temperance />;
    case 15: return <Devil />;
    case 16: return <Tower />;
    case 17: return <Star />;
    case 18: return <Moon />;
    case 19: return <Sun />;
    case 20: return <Judgement />;
    case 21: return <World />;
    default: return null;
  }
}

/* ===== 0 · 愚者 ===== */
function Fool(): ReactNode {
  return (
    <g>
      <circle cx="58" cy="18" r="10" fill="none" stroke={G2} strokeWidth="1" />
      <circle cx="58" cy="18" r="6" fill={G4} stroke={G} strokeWidth="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1={58 + 8 * Math.cos(r)} y1={18 + 8 * Math.sin(r)}
            x2={58 + 11 * Math.cos(r)} y2={18 + 11 * Math.sin(r)} stroke={G3} strokeWidth="0.5" />
        );
      })}
      <path d="M8 78 L10 72 L30 75 L50 68 L70 72 L72 78" fill="none" stroke={G2} strokeWidth="1" />
      <circle cx="42" cy="62" r="3" fill="none" stroke={G} strokeWidth="0.8" />
      <line x1="42" y1="65" x2="42" y2="73" stroke={G} strokeWidth="0.8" />
      <line x1="38" y1="68" x2="42" y2="65" stroke={G2} strokeWidth="0.6" />
      <line x1="46" y1="68" x2="42" y2="65" stroke={G2} strokeWidth="0.6" />
      <line x1="42" y1="73" x2="38" y2="78" stroke={G2} strokeWidth="0.6" />
      <line x1="42" y1="73" x2="46" y2="78" stroke={G2} strokeWidth="0.6" />
      <ellipse cx="30" cy="76" rx="3" ry="2" fill="none" stroke={G3} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 1 · 魔术师 ===== */
function Magician(): ReactNode {
  return (
    <g>
      <path d="M30 24 C38 16, 48 16, 52 24 C56 32, 48 40, 40 40 C32 40, 28 32, 28 32" fill="none" stroke={G} strokeWidth="1.2" />
      <line x1="40" y1="38" x2="40" y2="82" stroke={G} strokeWidth="1.2" />
      <circle cx="40" cy="38" r="3" fill={G4} stroke={G} strokeWidth="0.8" />
      <circle cx="24" cy="78" r="3" fill="none" stroke={G2} strokeWidth="0.7" />
      <polygon points="52,75 55,81 49,81" fill="none" stroke={G2} strokeWidth="0.7" />
      <rect x="34" y="86" width="6" height="6" fill="none" stroke={G2} strokeWidth="0.7" transform="rotate(30,37,89)" />
      <path d="M60 88 Q64 82, 68 88" fill="none" stroke={G2} strokeWidth="0.7" />
    </g>
  );
}

/* ===== 2 · 女祭司 ===== */
function HighPriestess(): ReactNode {
  return (
    <g>
      <line x1="18" y1="20" x2="18" y2="85" stroke={G2} strokeWidth="1.5" />
      <line x1="62" y1="20" x2="62" y2="85" stroke={G2} strokeWidth="1.5" />
      <text x="16" y="18" fill={G3} fontSize="4" fontFamily="serif">B</text>
      <text x="60" y="18" fill={G3} fontSize="4" fontFamily="serif">J</text>
      <path d="M32 28 A14 14 0 1 0 48 28 A10 10 0 1 1 32 28" fill={G4} stroke={G} strokeWidth="0.8" />
      <path d="M28 44 Q40 38 52 44 L52 80 Q40 76 28 80 Z" fill={G4} stroke={G3} strokeWidth="0.5" />
      <circle cx="40" cy="58" r="4" fill="none" stroke={G2} strokeWidth="0.6" />
      <line x1="36" y1="58" x2="32" y2="58" stroke={G2} strokeWidth="0.6" />
      <line x1="44" y1="58" x2="48" y2="58" stroke={G2} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 3 · 女皇 ===== */
function Empress(): ReactNode {
  return (
    <g>
      {[30, 36, 42, 48, 54].map((cx, i) => (
        <polygon key={i} points={`${cx},18 ${cx - 2},24 ${cx + 2},24`} fill={G4} stroke={G} strokeWidth="0.5" />
      ))}
      <circle cx="40" cy="45" r="8" fill="none" stroke={G} strokeWidth="1" />
      <line x1="40" y1="53" x2="40" y2="72" stroke={G} strokeWidth="1" />
      <line x1="34" y1="64" x2="46" y2="64" stroke={G} strokeWidth="0.8" />
      <path d="M22 75 Q24 62 20 50" fill="none" stroke={G2} strokeWidth="0.7" />
      <path d="M26 76 Q27 64 24 52" fill="none" stroke={G2} strokeWidth="0.7" />
      <path d="M58 75 Q56 62 60 50" fill="none" stroke={G2} strokeWidth="0.7" />
      <path d="M54 76 Q53 64 56 52" fill="none" stroke={G2} strokeWidth="0.7" />
    </g>
  );
}

/* ===== 4 · 皇帝 ===== */
function Emperor(): ReactNode {
  return (
    <g>
      <path d="M28 32 Q24 18 32 14 Q40 16 38 24" fill="none" stroke={G} strokeWidth="1.2" />
      <path d="M52 32 Q56 18 48 14 Q40 16 42 24" fill="none" stroke={G} strokeWidth="1.2" />
      <rect x="24" y="54" width="32" height="28" rx="2" fill={G4} stroke={G2} strokeWidth="0.8" />
      <line x1="24" y1="60" x2="56" y2="60" stroke={G3} strokeWidth="0.5" />
      <line x1="24" y1="68" x2="56" y2="68" stroke={G3} strokeWidth="0.5" />
      <circle cx="36" cy="44" r="5" fill={G4} stroke={G} strokeWidth="0.8" />
      <line x1="36" y1="39" x2="36" y2="36" stroke={G} strokeWidth="0.6" />
      <circle cx="36" cy="35" r="1.5" fill="none" stroke={G} strokeWidth="0.5" />
      <line x1="48" y1="36" x2="56" y2="58" stroke={G2} strokeWidth="1" />
    </g>
  );
}

/* ===== 5 · 教皇 ===== */
function Hierophant(): ReactNode {
  return (
    <g>
      <path d="M28 24 Q34 18 40 24 Q46 18 52 24" fill="none" stroke={G} strokeWidth="1" />
      <path d="M26 28 Q34 22 40 28 Q46 22 54 28" fill="none" stroke={G2} strokeWidth="0.8" />
      <path d="M24 32 Q34 26 40 32 Q46 26 56 32" fill="none" stroke={G3} strokeWidth="0.7" />
      <line x1="30" y1="48" x2="50" y2="68" stroke={G} strokeWidth="1" />
      <line x1="50" y1="48" x2="30" y2="68" stroke={G} strokeWidth="1" />
      <circle cx="30" cy="48" r="3" fill="none" stroke={G} strokeWidth="0.6" />
      <circle cx="50" cy="48" r="3" fill="none" stroke={G} strokeWidth="0.6" />
      <circle cx="26" cy="78" r="3" fill="none" stroke={G3} strokeWidth="0.6" />
      <circle cx="54" cy="78" r="3" fill="none" stroke={G3} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 6 · 恋人 ===== */
function Lovers(): ReactNode {
  return (
    <g>
      <path d="M28 20 Q22 8 16 18 Q24 22 28 20" fill={G4} stroke={G2} strokeWidth="0.7" />
      <path d="M52 20 Q58 8 64 18 Q56 22 52 20" fill={G4} stroke={G2} strokeWidth="0.7" />
      <circle cx="40" cy="24" r="4" fill="none" stroke={G} strokeWidth="0.8" />
      <circle cx="32" cy="58" r="4" fill="none" stroke={G} strokeWidth="0.8" />
      <line x1="32" y1="62" x2="32" y2="78" stroke={G} strokeWidth="0.8" />
      <circle cx="48" cy="58" r="4" fill="none" stroke={G2} strokeWidth="0.8" />
      <line x1="48" y1="62" x2="48" y2="78" stroke={G2} strokeWidth="0.8" />
      <line x1="62" y1="38" x2="58" y2="76" stroke={G3} strokeWidth="1.2" />
      <circle cx="60" cy="42" r="5" fill={G4} stroke={G3} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 7 · 战车 ===== */
function Chariot(): ReactNode {
  return (
    <g>
      {[[30, 18], [42, 14], [54, 18], [36, 24], [48, 22]].map(([cx, cy], i) => (
        <polygon key={i} points={`${cx},${cy - 3} ${cx - 1.5},${cy + 1} ${cx + 1.5},${cy + 1}`}
          fill={G4} stroke={G3} strokeWidth="0.3" />
      ))}
      <rect x="22" y="44" width="36" height="22" rx="2" fill={G4} stroke={G2} strokeWidth="0.8" />
      <line x1="22" y1="54" x2="58" y2="54" stroke={G3} strokeWidth="0.5" />
      <circle cx="28" cy="72" r="6" fill="none" stroke={G} strokeWidth="0.8" />
      <circle cx="28" cy="72" r="2" fill={G4} stroke={G2} strokeWidth="0.5" />
      <circle cx="52" cy="72" r="6" fill="none" stroke={G} strokeWidth="0.8" />
      <circle cx="52" cy="72" r="2" fill={G4} stroke={G2} strokeWidth="0.5" />
      <line x1="18" y1="76" x2="18" y2="84" stroke={G3} strokeWidth="0.8" />
      <line x1="62" y1="76" x2="62" y2="84" stroke={G3} strokeWidth="0.8" />
    </g>
  );
}

/* ===== 8 · 力量 ===== */
function Strength(): ReactNode {
  return (
    <g>
      <path d="M32 20 Q38 14, 44 20 Q50 26, 44 32 Q38 38, 32 32 Q26 26, 32 20" fill="none" stroke={G} strokeWidth="0.9" />
      <circle cx="40" cy="48" r="5" fill="none" stroke={G} strokeWidth="0.8" />
      <line x1="40" y1="53" x2="38" y2="74" stroke={G} strokeWidth="0.8" />
      <line x1="35" y1="62" x2="45" y2="62" stroke={G2} strokeWidth="0.6" />
      <path d="M28 78 Q24 68 32 64 Q40 62 44 70" fill="none" stroke={G2} strokeWidth="0.9" />
      <circle cx="30" cy="66" r="3" fill="none" stroke={G2} strokeWidth="0.6" />
      <path d="M38 68 Q34 64 34 66" fill="none" stroke={G3} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 9 · 隐者 ===== */
function Hermit(): ReactNode {
  return (
    <g>
      <polygon points="40,18 44,26 52,26 46,32 48,40 40,34 32,40 34,32 28,26 36,26"
        fill={G4} stroke={G} strokeWidth="0.7" />
      <rect x="30" y="14" width="20" height="26" rx="2" fill="none" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="40" x2="30" y2="82" stroke={G2} strokeWidth="1" />
      <path d="M18 82 L32 62 L46 82" fill={G4} stroke={G3} strokeWidth="0.6" />
      <path d="M32 82 L44 68 L56 82" fill={G4} stroke={G3} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 10 · 命运之轮 ===== */
function WheelOfFortune(): ReactNode {
  return (
    <g>
      <circle cx="40" cy="42" r="20" fill="none" stroke={G} strokeWidth="1" />
      <circle cx="40" cy="42" r="14" fill={G4} stroke={G2} strokeWidth="0.6" />
      <circle cx="40" cy="42" r="6" fill="none" stroke={G3} strokeWidth="0.5" />
      <line x1="20" y1="42" x2="60" y2="42" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="22" x2="40" y2="62" stroke={G2} strokeWidth="0.6" />
      <text x="37" y="30" fill={G} fontSize="4" textAnchor="middle" fontFamily="serif">T</text>
      <text x="52" y="45" fill={G2} fontSize="4" textAnchor="middle" fontFamily="serif">A</text>
      <text x="37" y="60" fill={G2} fontSize="4" textAnchor="middle" fontFamily="serif">R</text>
      <text x="28" y="45" fill={G2} fontSize="4" textAnchor="middle" fontFamily="serif">O</text>
      <polygon points="40,14 37,20 43,20" fill="none" stroke={G} strokeWidth="0.6" />
      <path d="M62 78 Q68 72 64 66 Q60 62 56 66" fill="none" stroke={G3} strokeWidth="0.7" />
    </g>
  );
}

/* ===== 11 · 正义 ===== */
function Justice(): ReactNode {
  return (
    <g>
      <line x1="40" y1="20" x2="40" y2="32" stroke={G} strokeWidth="0.8" />
      <line x1="28" y1="32" x2="52" y2="32" stroke={G} strokeWidth="0.8" />
      <path d="M26 32 Q28 42 24 46" fill="none" stroke={G2} strokeWidth="0.6" />
      <path d="M54 32 Q52 42 56 46" fill="none" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="34" x2="40" y2="76" stroke={G} strokeWidth="1.2" />
      <line x1="34" y1="38" x2="46" y2="38" stroke={G2} strokeWidth="0.8" />
      <line x1="36" y1="72" x2="44" y2="72" stroke={G2} strokeWidth="0.8" />
      <rect x="30" y="66" width="20" height="18" rx="2" fill={G4} stroke={G3} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 12 · 倒吊人 ===== */
function HangedMan(): ReactNode {
  return (
    <g>
      <line x1="20" y1="18" x2="60" y2="18" stroke={G} strokeWidth="1" />
      <line x1="40" y1="18" x2="40" y2="84" stroke={G2} strokeWidth="0.8" />
      <circle cx="40" cy="46" r="10" fill="none" stroke={G} strokeWidth="0.7" />
      <circle cx="40" cy="38" r="4" fill="none" stroke={G2} strokeWidth="0.8" />
      <line x1="40" y1="42" x2="40" y2="52" stroke={G2} strokeWidth="0.8" />
      <line x1="40" y1="52" x2="34" y2="66" stroke={G2} strokeWidth="0.7" />
      <line x1="40" y1="52" x2="46" y2="60" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="44" x2="30" y2="64" stroke={G3} strokeWidth="0.6" />
      <line x1="40" y1="44" x2="50" y2="56" stroke={G3} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 13 · 死神 ===== */
function Death(): ReactNode {
  return (
    <g>
      <circle cx="60" cy="24" r="10" fill={G4} stroke={G2} strokeWidth="0.7" />
      <line x1="60" y1="14" x2="60" y2="10" stroke={G3} strokeWidth="0.5" />
      <line x1="60" y1="34" x2="60" y2="38" stroke={G3} strokeWidth="0.5" />
      <line x1="50" y1="24" x2="46" y2="24" stroke={G3} strokeWidth="0.5" />
      <line x1="70" y1="24" x2="74" y2="24" stroke={G3} strokeWidth="0.5" />
      <circle cx="34" cy="46" r="5" fill={G4} stroke={G} strokeWidth="0.9" />
      <rect x="32" y="51" width="4" height="5" rx="1" fill={G4} stroke={G} strokeWidth="0.6" />
      <path d="M28 56 L34 80 L44 74 L40 56" fill="none" stroke={G2} strokeWidth="0.8" />
      <path d="M48 44 Q56 36 62 44" fill="none" stroke={G2} strokeWidth="0.9" />
      <line x1="48" y1="44" x2="44" y2="74" stroke={G2} strokeWidth="0.7" />
      <circle cx="22" cy="76" r="2" fill="none" stroke={G3} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 14 · 节制 ===== */
function Temperance(): ReactNode {
  return (
    <g>
      <path d="M30 28 Q22 16 18 28 Q26 30 30 28" fill={G4} stroke={G2} strokeWidth="0.7" />
      <path d="M50 28 Q58 16 62 28 Q54 30 50 28" fill={G4} stroke={G2} strokeWidth="0.7" />
      <circle cx="40" cy="32" r="5" fill="none" stroke={G} strokeWidth="0.8" />
      <line x1="40" y1="37" x2="36" y2="66" stroke={G2} strokeWidth="0.8" />
      <line x1="40" y1="37" x2="44" y2="66" stroke={G2} strokeWidth="0.8" />
      <path d="M28 42 Q24 38 28 34 L34 34 Q38 38 34 42 Z" fill="none" stroke={G} strokeWidth="0.7" />
      <path d="M46 52 Q42 48 46 44 L52 44 Q56 48 52 52 Z" fill="none" stroke={G} strokeWidth="0.7" />
      <path d="M34 38 Q40 44 46 48" fill="none" stroke={G3} strokeWidth="0.5" strokeDasharray="1.5,1.5" />
      <line x1="40" y1="66" x2="40" y2="82" stroke={G3} strokeWidth="0.6" />
      <polygon points="38,82 42,82 40,88" fill={G4} stroke={G2} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 15 · 恶魔 ===== */
function Devil(): ReactNode {
  return (
    <g>
      <polygon points="40,14 44,24 54,24 46,30 50,40 40,34 30,40 34,30 26,24 36,24"
        fill={G4} stroke={G2} strokeWidth="0.8" />
      <path d="M32 56 Q28 48 34 44 Q40 42 46 44 Q52 48 48 56" fill={G4} stroke={G2} strokeWidth="0.8" />
      <circle cx="36" cy="50" r="1.2" fill={G2} />
      <circle cx="44" cy="50" r="1.2" fill={G2} />
      <path d="M34 44 L30 36" stroke={G2} strokeWidth="0.7" />
      <path d="M46 44 L50 36" stroke={G2} strokeWidth="0.7" />
      <path d="M28 62 Q24 68 22 74" fill="none" stroke={G3} strokeWidth="0.5" strokeDasharray="2,1" />
      <path d="M52 62 Q56 68 58 74" fill="none" stroke={G3} strokeWidth="0.5" strokeDasharray="2,1" />
      <circle cx="24" cy="78" r="3" fill="none" stroke={G3} strokeWidth="0.6" />
      <circle cx="56" cy="78" r="3" fill="none" stroke={G3} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 16 · 高塔 ===== */
function Tower(): ReactNode {
  return (
    <g>
      <path d="M44 14 L38 30 L42 30 L36 46" fill="none" stroke={G} strokeWidth="1.2" />
      <rect x="26" y="30" width="28" height="52" rx="1" fill={G4} stroke={G2} strokeWidth="0.8" />
      <path d="M22 30 L32 24 L48 24 L58 30" fill="none" stroke={G} strokeWidth="0.8" />
      <rect x="34" y="40" width="12" height="8" rx="1" fill="none" stroke={G3} strokeWidth="0.4" />
      <rect x="34" y="54" width="12" height="8" rx="1" fill="none" stroke={G3} strokeWidth="0.4" />
      <circle cx="20" cy="48" r="2" fill={G4} stroke={G3} strokeWidth="0.4" />
      <circle cx="60" cy="42" r="1.5" fill={G4} stroke={G3} strokeWidth="0.4" />
      <line x1="18" y1="62" x2="22" y2="58" stroke={G3} strokeWidth="0.5" />
      <circle cx="20" cy="74" r="3" fill="none" stroke={G3} strokeWidth="0.5" />
      <circle cx="60" cy="72" r="3" fill="none" stroke={G3} strokeWidth="0.5" />
    </g>
  );
}

/* ===== 17 · 星星 ===== */
function Star(): ReactNode {
  return (
    <g>
      <polygon points="40,14 43,26 54,26 46,34 48,46 40,38 32,46 34,34 26,26 37,26"
        fill={G4} stroke={G} strokeWidth="0.8" />
      {[[18, 20], [62, 16], [28, 42], [54, 40], [20, 62], [60, 64], [40, 58]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2" fill={G4} stroke={G2} strokeWidth="0.5" />
      ))}
      <path d="M18 78 Q14 74 18 70 L24 70 Q28 74 24 78 Z" fill="none" stroke={G2} strokeWidth="0.6" />
      <path d="M56 78 Q52 74 56 70 L62 70 Q66 74 62 78 Z" fill="none" stroke={G2} strokeWidth="0.6" />
      <path d="M20 74 Q22 80 24 84" fill="none" stroke={G3} strokeWidth="0.4" strokeDasharray="1,1" />
      <path d="M58 74 Q56 80 54 84" fill="none" stroke={G3} strokeWidth="0.4" strokeDasharray="1,1" />
    </g>
  );
}

/* ===== 18 · 月亮 ===== */
function Moon(): ReactNode {
  return (
    <g>
      <path d="M36 14 A16 16 0 1 0 52 30 A12 12 0 1 1 36 14" fill={G4} stroke={G} strokeWidth="0.8" />
      {[38, 42, 46].map((x, i) => (
        <ellipse key={i} cx={x} cy={34 + i * 6} rx="1.2" ry="2" fill="none" stroke={G3} strokeWidth="0.4" />
      ))}
      <rect x="16" y="50" width="10" height="30" rx="1" fill={G4} stroke={G2} strokeWidth="0.6" />
      <rect x="54" y="50" width="10" height="30" rx="1" fill={G4} stroke={G2} strokeWidth="0.6" />
      <path d="M40 56 Q36 64 40 76 Q44 82 40 86" fill="none" stroke={G3} strokeWidth="0.6" />
      <path d="M28 76 Q24 72 28 70" fill="none" stroke={G3} strokeWidth="0.6" />
      <path d="M52 76 Q56 72 52 70" fill="none" stroke={G3} strokeWidth="0.6" />
      <path d="M36 86 Q38 90 42 90 Q44 90 44 88" fill="none" stroke={G2} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 19 · 太阳 ===== */
function Sun(): ReactNode {
  return (
    <g>
      <circle cx="40" cy="34" r="18" fill={G4} stroke={G} strokeWidth="1" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return (
          <line key={i} x1={40 + 18 * Math.cos(r)} y1={34 + 18 * Math.sin(r)}
            x2={40 + 22 * Math.cos(r)} y2={34 + 22 * Math.sin(r)}
            stroke={G2} strokeWidth={i % 2 === 0 ? '1' : '0.6'} />
        );
      })}
      <circle cx="40" cy="34" r="6" fill={G4} stroke={G} strokeWidth="0.8" />
      <path d="M28 66 Q24 62 30 60 Q34 62 32 66" fill="none" stroke={G2} strokeWidth="0.8" />
      <circle cx="30" cy="60" r="2.5" fill="none" stroke={G2} strokeWidth="0.5" />
      <circle cx="24" cy="80" r="4" fill={G4} stroke={G3} strokeWidth="0.5" />
      <circle cx="56" cy="78" r="4" fill={G4} stroke={G3} strokeWidth="0.5" />
      <line x1="24" y1="80" x2="24" y2="86" stroke={G3} strokeWidth="0.4" />
      <line x1="56" y1="78" x2="56" y2="84" stroke={G3} strokeWidth="0.4" />
    </g>
  );
}

/* ===== 20 · 审判 ===== */
function Judgement(): ReactNode {
  return (
    <g>
      <circle cx="40" cy="18" r="5" fill="none" stroke={G} strokeWidth="0.8" />
      <path d="M30 22 Q24 12 20 18 Q28 22 30 22" fill={G4} stroke={G2} strokeWidth="0.6" />
      <path d="M50 22 Q56 12 60 18 Q52 22 50 22" fill={G4} stroke={G2} strokeWidth="0.6" />
      <path d="M40 24 L36 36 L46 36 L40 24" fill={G4} stroke={G} strokeWidth="0.6" />
      <line x1="26" y1="36" x2="36" y2="36" stroke={G2} strokeWidth="0.6" />
      <line x1="46" y1="36" x2="56" y2="36" stroke={G2} strokeWidth="0.6" />
      <path d="M26 42 Q22 40 26 38" fill="none" stroke={G3} strokeWidth="0.4" />
      <path d="M28 46 Q20 42 28 38" fill="none" stroke={G3} strokeWidth="0.3" />
      <rect x="22" y="58" width="36" height="24" rx="2" fill={G4} stroke={G3} strokeWidth="0.5" />
      <circle cx="30" cy="64" r="3" fill="none" stroke={G2} strokeWidth="0.6" />
      <circle cx="40" cy="62" r="3" fill="none" stroke={G2} strokeWidth="0.6" />
      <circle cx="50" cy="64" r="3" fill="none" stroke={G2} strokeWidth="0.6" />
    </g>
  );
}

/* ===== 21 · 世界 ===== */
function World(): ReactNode {
  return (
    <g>
      <ellipse cx="40" cy="36" rx="22" ry="26" fill="none" stroke={G} strokeWidth="1" />
      <ellipse cx="40" cy="36" rx="19" ry="23" fill={G4} stroke={G2} strokeWidth="0.6" />
      <circle cx="40" cy="36" r="4" fill="none" stroke={G} strokeWidth="0.8" />
      <line x1="40" y1="40" x2="40" y2="52" stroke={G2} strokeWidth="0.7" />
      <line x1="40" y1="44" x2="32" y2="50" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="44" x2="48" y2="50" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="52" x2="34" y2="60" stroke={G2} strokeWidth="0.6" />
      <line x1="40" y1="52" x2="46" y2="60" stroke={G2} strokeWidth="0.6" />
      <path d="M32 54 Q28 56 26 52" fill="none" stroke={G3} strokeWidth="0.5" />
      <path d="M48 54 Q52 56 54 52" fill="none" stroke={G3} strokeWidth="0.5" />
      <text x="16" y="20" fill={G2} fontSize="3.5" textAnchor="middle">👤</text>
      <text x="64" y="20" fill={G2} fontSize="3.5" textAnchor="middle">🦅</text>
      <text x="16" y="82" fill={G2} fontSize="3.5" textAnchor="middle">🐂</text>
      <text x="64" y="82" fill={G2} fontSize="3.5" textAnchor="middle">🦁</text>
    </g>
  );
}