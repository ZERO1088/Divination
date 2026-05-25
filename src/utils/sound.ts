// ============================================================
// sound.ts —— Web Audio 合成音效 (克制 · 安静 · 不游戏化)
// 铜钱碰击 · 木桌落定 · 仅用于仪式反馈
// ============================================================

let audioCtx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/** 铜钱抛起：短促金属颤音 */
export function coinToss(): void {
  try {
    const c = ctx();
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400, t);
    osc.frequency.exponentialRampToValueAtTime(850, t + 0.10);
    gain.gain.setValueAtTime(0.045, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  } catch {
    // 静默失败：音频不可用时不影响功能
  }
}

/** 铜钱落桌：低沉木质感 */
export function coinLand(): void {
  try {
    const c = ctx();
    const t = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.08);
    gain.gain.setValueAtTime(0.035, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.10);
    osc.connect(gain).connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.10);
  } catch {
    // 静默失败
  }
}
