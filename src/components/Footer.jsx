export default function Footer({ name }) {
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-paper/5">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-paper/40">
        <span>&copy; {new Date().getFullYear()} {name}</span>
        <span>Web design &middot; Front-end development &middot; UX</span>
      </div>
    </footer>
  );
}
