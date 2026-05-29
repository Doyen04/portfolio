export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg py-8">
      <div className="container-base text-center text-sm text-ink-muted">
        <p>
          © {currentYear} Ademola Oluwasola Opeyemi · Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}
