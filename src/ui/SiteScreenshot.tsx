'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  siteUrl?: string | null;
  compact?: boolean;
  noBorder?: boolean;
};

export default function SiteScreenshot({ siteUrl, compact, noBorder }: Props) {
  const [error, setError] = useState(false);
  const hasUrl = siteUrl && !error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
      className={`w-full overflow-hidden bg-(--surface-2) ${noBorder ? '' : 'border border-(--border)'}`}
      style={{ aspectRatio: compact ? '2 / 1' : '1.6 / 1' }}
    >
      {hasUrl ? (
        <img
          src={`/api/screenshot?url=${encodeURIComponent(siteUrl)}`}
          alt="Site screenshot"
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg)' }}>
          <div className="flex flex-col items-center gap-3 opacity-40">
            <svg className={`${compact ? 'w-5 h-5' : 'w-8 h-8'} text-(--muted)`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-(--muted) font-mono uppercase tracking-widest`}>
              No preview
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
