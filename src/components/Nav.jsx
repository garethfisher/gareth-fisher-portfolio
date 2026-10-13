export default function Nav({ name, ctaPrimary }) {
  return (
    <header className="fixed top-0 inset-x-0 z-50 nav-glass px-6 md:px-10">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tightish text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded">
          {name}
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-paper/80">
          <a href="#skills" className="nav-link hover:text-paper">Skills</a>
          <a href="#websites" className="nav-link hover:text-paper">Websites</a>
          <a href="#ux" className="nav-link hover:text-paper">UX</a>
          <a href="#contact" className="btn-primary px-4 py-2 rounded-full text-sm font-medium">{ctaPrimary}</a>
        </nav>
        <a href="#contact" className="md:hidden btn-primary px-4 py-2 rounded-full text-sm font-medium">Contact</a>
      </div>
    </header>
  );
}
