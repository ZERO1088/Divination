// ============================================================
// ParticleSystem —— 暗室微尘 Canvas 粒子
// Hero Section 专用 · 非均匀分布 · 光斑附近密度更高
// ============================================================

import { useEffect, useRef, type ReactNode } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  life: number;      // 当前生命周期 (0-1)
  lifeDuration: number; // 总生命周期 (ms)
  phase: number;      // 初始相位偏移
}

interface ParticleSystemProps {
  /** 粒子数量 */
  count?: number;
  /** 整体可见度 0-1 */
  visible?: boolean;
}

/** 三个光斑中心 (vw/vh 百分比) */
const LIGHT_SPOTS = [
  { x: 0.18, y: 0.22, radius: 0.40, weight: 0.40 }, // 光斑A · 左上
  { x: 0.78, y: 0.72, radius: 0.30, weight: 0.25 }, // 光斑B · 右下
  { x: 0.65, y: 0.35, radius: 0.15, weight: 0.15 }, // 光斑C · 中右
];

/** 内容区安全范围 (避开中央文字) */
const SAFE_ZONE = {
  cx: 0.50,
  cy: 0.45,
  rx: 0.28,
  ry: 0.22,
};

function isInSafeZone(xNorm: number, yNorm: number): boolean {
  const dx = (xNorm - SAFE_ZONE.cx) / SAFE_ZONE.rx;
  const dy = (yNorm - SAFE_ZONE.cy) / SAFE_ZONE.ry;
  return dx * dx + dy * dy < 1;
}

/** 计算粒子 opacity：距离光斑越近越亮 */
function calcOpacity(xNorm: number, yNorm: number): number {
  let maxWeight = 0;
  for (const spot of LIGHT_SPOTS) {
    const dx = (xNorm - spot.x) / spot.radius;
    const dy = (yNorm - spot.y) / spot.radius;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 1) {
      const w = spot.weight * (1 - dist);
      if (w > maxWeight) maxWeight = w;
    }
  }
  // 暗区微弱可见
  const baseOpacity = 0.03;
  const range = 0.35;
  return baseOpacity + maxWeight * range;
}

function createParticle(w: number, h: number): Particle {
  // 在光斑附近生成粒子（70%概率），其余随机
  let xNorm: number;
  let yNorm: number;
  let attempts = 0;

  do {
    if (Math.random() < 0.70) {
      // 偏向光斑区域
      const spot = LIGHT_SPOTS[Math.floor(Math.random() * LIGHT_SPOTS.length)];
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * spot.radius;
      xNorm = spot.x + Math.cos(angle) * r;
      yNorm = spot.y + Math.sin(angle) * r;
    } else {
      xNorm = Math.random();
      yNorm = Math.random();
    }
    attempts++;
  } while (isInSafeZone(xNorm, yNorm) && attempts < 10);

  return {
    x: xNorm * w,
    y: yNorm * h,
    size: 1 + Math.random() * 2,
    opacity: calcOpacity(xNorm, yNorm),
    speedY: -(8 + Math.random() * 12),  // 向上漂浮
    speedX: (Math.random() - 0.5) * 6,
    life: Math.random(),                // 随机初始相位
    lifeDuration: 8000 + Math.random() * 7000,
    phase: Math.random() * Math.PI * 2,
  };
}

export function ParticleSystem({
  count = 50,
  visible = true,
}: ParticleSystemProps): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      // 重建粒子
      particlesRef.current = Array.from({ length: count }, () => createParticle(w, h));
    };

    window.addEventListener('resize', resize);
    resize();

    const FADE_IN_MS = 1000;
    const FADE_OUT_MS = 800;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min(timestamp - lastTimeRef.current, 50); // cap
      lastTimeRef.current = timestamp;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 生命周期
        p.life += dt / p.lifeDuration;
        if (p.life > 1) {
          // 重生
          const np = createParticle(w, h);
          particles[i] = { ...np, life: 0 };
          continue;
        }

        // 移动
        p.y += p.speedY * (dt / 1000);
        p.x += p.speedX * (dt / 1000) + Math.sin(timestamp * 0.0005 + p.phase) * 0.3;

        // 边界循环
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        // 淡入淡出
        let lifeOpacity = 1;
        const fadeInProgress = p.life / (FADE_IN_MS / p.lifeDuration);
        const fadeOutStart = 1 - (FADE_OUT_MS / p.lifeDuration);
        if (p.life < fadeInProgress) {
          lifeOpacity = p.life / fadeInProgress;
        } else if (p.life > fadeOutStart) {
          lifeOpacity = (1 - p.life) / (1 - fadeOutStart);
        }

        const alpha = p.opacity * lifeOpacity * (visible ? 1 : 0);

        if (alpha > 0.005) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253,230,138,${alpha.toFixed(4)})`;
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [count, visible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}
    />
  );
}
