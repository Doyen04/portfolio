'use client';

import { motion } from 'framer-motion';

export default function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] as const }}
      className="w-full relative bg-[var(--surface-2)] border border-[var(--border)] overflow-hidden"
      style={{
        aspectRatio: '1.6 / 1',
      }}
    >
      {/* Title Bar */}
      <div
        className="h-[34px] bg-[var(--bg)] border-b border-[var(--border)] flex items-center justify-between px-4"
      >
        {/* Three dots */}
        <div className="flex items-center gap-2">
          <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span data-keep-radius="true" className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        
        {/* URL Bar */}
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            color: 'var(--muted)',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '2px 24px',
            width: '240px',
            textAlign: 'center',
            letterSpacing: '0.05em',
          }}
        >
          unplug.doyen04.dev/dashboard
        </div>

        {/* Dummy spacer */}
        <div className="w-14" />
      </div>

      {/* Browser Body */}
      <div className="p-4 h-[calc(100%-34px)] flex gap-4 text-[10px]">
        {/* Mock Sidebar */}
        <div className="w-1/4 border-r border-[var(--border)] pr-4 flex flex-col gap-3 pt-2">
          {/* Logo */}
          <div className="flex items-center gap-1.5 mb-2">
            <span data-keep-radius="true" className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span style={{ fontFamily: 'var(--serif)', fontWeight: 500, color: 'var(--white)', fontSize: '11px' }}>Unplug</span>
          </div>

          {[
            { label: 'Dashboard', active: true },
            { label: 'Subscriptions', active: false },
            { label: 'Virtual Cards', active: false },
            { label: 'Waste Alert', active: false, alert: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-1 px-1.5"
              style={{
                background: item.active ? 'var(--surface)' : 'transparent',
                color: item.active ? 'var(--white)' : 'var(--muted)',
                fontFamily: 'var(--mono)',
                fontSize: '8px',
                letterSpacing: '0.05em',
              }}
            >
              <span>{item.label}</span>
              {item.alert && (
                <span data-keep-radius="true" className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
              )}
            </div>
          ))}

          {/* Spacer / bottom item */}
          <div className="mt-auto pb-2">
            <div className="h-1.5 w-12 bg-[var(--border)]" />
          </div>
        </div>

        {/* Mock Main Area */}
        <div className="flex-1 flex flex-col gap-4 pt-2 overflow-hidden">
          {/* Top Row: Metric Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-[var(--border)] p-2.5 bg-[var(--surface)]">
              <div style={{ fontFamily: 'var(--mono)', fontSize: '7.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Monthly Burn</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--white)', marginTop: '4px' }}>
                $148<span style={{ color: 'var(--accent)' }}>.50</span>
              </div>
            </div>
            <div className="border border-[var(--border)] p-2.5 bg-[var(--surface)]">
              <div style={{ fontFamily: 'var(--mono)', fontSize: '7.5px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Waste Detected</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 500, color: 'var(--accent)' }}>
                $48<span style={{ color: 'var(--white)' }}>.00</span>
              </div>
            </div>
          </div>

          {/* Waste Alert Banner */}
          <div
            className="border border-[var(--accent)]/30 p-2.5 flex items-center justify-between"
            style={{
              background: 'rgba(200, 145, 58, 0.05)',
            }}
          >
            <div className="flex flex-col gap-0.5">
              <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--accent)', fontWeight: 500, letterSpacing: '0.05em' }}>CRITICAL ALERT</span>
              <span style={{ fontFamily: 'var(--sans)', fontSize: '9px', color: 'var(--white)', fontWeight: 300 }}>Unused Slack team costing $48/mo found.</span>
            </div>
            <button
              data-keep-radius="true"
              className="px-2.5 py-1 text-[8px] bg-[var(--accent)] text-[var(--bg)] font-mono font-medium tracking-wider uppercase hover:bg-[var(--accent-hi)] transition-colors"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Cancel Sub
            </button>
          </div>

          {/* List of active subscriptions */}
          <div className="flex flex-col gap-2">
            <div style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>
              Active Subscriptions
            </div>

            {[
              { name: 'Adobe Creative Cloud', cost: '$54.99/mo', card: '•••• 4022', unused: false },
              { name: 'Netflix Premium', cost: '$15.49/mo', card: '•••• 9110', unused: false },
              { name: 'Spotify Individual', cost: '$9.99/mo', card: '•••• 1204', unused: false },
            ].map((sub, i) => (
              <div
                key={i}
                className="border border-[var(--border)] p-2 flex items-center justify-between hover:bg-[var(--surface)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span data-keep-radius="true" className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '9.5px', color: 'var(--white)', fontWeight: 400 }}>{sub.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '8px', color: 'var(--muted)' }}>{sub.card}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '9px', color: 'var(--white)', fontWeight: 500 }}>{sub.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
