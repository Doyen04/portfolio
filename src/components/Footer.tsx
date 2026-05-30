export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        padding: '48px',
      }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--faint)',
          }}
        >
          © {currentYear} Ademola Oluwasola Opeyemi
        </p>
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--faint)',
          }}
          className="flex items-center gap-1.5"
        >
          Built with{' '}
          <span style={{ color: 'var(--muted)' }}>Next.js</span> &{' '}
          <span style={{ color: 'var(--muted)' }}>Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
