'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { mediaSrc } from '@/lib/media';

type Props = {
    video?: string;
    image?: string;
    compact?: boolean;
    noBorder?: boolean;
    priority?: boolean;
    /** Drop the panel background so the surrounding surface shows through. */
    transparent?: boolean;
    /** Stretch to the parent box instead of holding a fixed aspect ratio. */
    fill?: boolean;
    /** Fill the box edge to edge instead of letterboxing the whole preview. */
    cover?: boolean;
};

export default function SiteScreenshot({ video, image, compact, noBorder, priority, transparent, fill, cover }: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(containerRef, { once: false, margin: '-100px' });

    const resolvedImage = mediaSrc(image);
    const resolvedVideo = mediaSrc(video);
    const isGif = String(image || '').toLowerCase().endsWith('.gif');
    const isRemote = /^https?:\/\//i.test(String(resolvedImage || ''));

    useEffect(() => {
        const mediaEl = videoRef.current;
        if (mediaEl) {
            if (isInView) {
                mediaEl.play().catch(() => {});
            } else {
                mediaEl.pause();
            }
        }
    }, [isInView]);

    const hasMedia = Boolean(video || image);
    const mediaFailed = error || (hasMedia && !video && (!image || image === ''));

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
            className={`relative w-full overflow-hidden ${fill ? 'h-full' : ''} ${transparent ? '' : 'bg-(--surface-2)'} ${noBorder ? '' : 'border border-(--border)'}`}
            style={{ aspectRatio: fill ? 'auto' : compact ? '2 / 1' : '1.6 / 1' }}
        >
            {video && !error ? (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-(--bg)">
                            <div className="animate-spin w-8 h-8 bg-(--accent)" />
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        src={resolvedVideo}
                        onLoadedData={() => setIsLoading(false)}
                        onError={() => {
                            setError(true);
                            setIsLoading(false);
                        }}
                        muted
                        loop
                        playsInline
                        preload="none"
                        className={`h-full w-full ${cover ? 'object-cover' : 'object-contain'}`}
                    />
                </>
            ) : image && !error ? (
                <>
                    {isLoading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-(--bg)">
                            <div className="animate-spin w-8 h-8 bg-(--accent)" />
                        </div>
                    )}
                    <Image
                        src={resolvedImage ?? ''}
                        alt=""
                        fill
                        sizes={fill ? '100vw' : compact ? '(min-width: 768px) 33vw, 100vw' : '100vw'}
                        quality={82}
                        priority={priority}
                        unoptimized={isGif || isRemote}
                        className={`transition-opacity duration-500 ${cover ? 'object-cover' : 'object-contain'} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setIsLoading(false)}
                        onError={() => {
                            setError(true);
                            setIsLoading(false);
                        }}
                        decoding="async"
                    />
                </>
            ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'var(--bg)' }}>
                    <div className="flex flex-col items-center gap-3 opacity-40">
                        <svg className={`${compact ? 'w-5 h-5' : 'w-8 h-8'} text-(--muted)`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                            <line x1="8" y1="21" x2="16" y2="21" />
                            <line x1="12" y1="17" x2="12" y2="21" />
                        </svg>
                        <span className={`${compact ? 'text-[8px]' : 'text-[10px]'} text-(--muted) font-mono uppercase tracking-widest`}>
                            {mediaFailed ? 'Preview failed' : 'No preview yet'}
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}