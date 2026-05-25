// ============================================================
// FloatingPanel —— 悬浮信息层
// Tooltip / Dropdown / 上下文菜单
// ============================================================

import { type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DURATION, EASING } from '../../utils/motion';

interface FloatingPanelProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** 触发元素的 ref，Panel 从其方向"生长" */
  anchorRef?: React.RefObject<HTMLElement | null>;
  maxWidth?: 'xs' | 'sm';
}

const maxWidthClass = {
  xs: 'max-w-[200px]',
  sm: 'max-w-xs',
};

export function FloatingPanel({
  open,
  onClose,
  children,
  maxWidth = 'xs',
}: FloatingPanelProps): ReactNode {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('mousedown', handler);
    }
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{
            duration: DURATION.microScale,
            ease: EASING.enter,
          }}
          className={`absolute z-40 ${maxWidthClass[maxWidth]} glass-card-sm p-3`}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 0 32px rgba(253,230,138,0.04)',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
