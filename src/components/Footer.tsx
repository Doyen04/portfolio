export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-subtle py-12">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-medium text-ink-muted">
          © {currentYear} Ademola Oluwasola Opeyemi
        </p>
        <p className="text-sm text-ink-muted flex items-center gap-1.5">
          Built with <span className="text-ink font-medium">Next.js</span> & <span className="text-ink font-medium">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
