'use client';

import { useState, useEffect } from 'react';

export default function Loading() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--bg)">
      <div className="h-px w-24 bg-(--border) relative overflow-hidden">
        <div className="absolute inset-0 bg-(--accent) animate-pulse" />
      </div>
    </div>
  );
}
