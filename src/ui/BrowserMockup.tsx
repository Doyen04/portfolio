'use client';

import { motion } from 'framer-motion';
import TitleBar from './BrowserMockup/TitleBar';
import MockBody from './BrowserMockup/MockBody';

export default function BrowserMockup() {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }} className="w-full relative bg-(--surface-2) border border-(--border) overflow-hidden" style={{ aspectRatio: '1.6 / 1' }}>
            <TitleBar />
            <MockBody />
        </motion.div>
    );
}
    

