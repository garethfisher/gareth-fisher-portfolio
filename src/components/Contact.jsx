export default function Contact({ contact }) {
  const phoneHref = contact.phone.replace(/[^\d+]/g, '');

  return (
    <section
      id="contact"
      className="relative px-6 md:px-10 py-28 md:py-40 border-t border-paper/5 overflow-hidden"
      style={{ background: 'radial-gradient(60% 60% at 50% 20%, rgba(200,90,46,0.16), transparent 65%), #0F0E12' }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr,1fr] gap-14 items-end">
        <div className="reveal">
          <p className="text-rust font-medium tracking-[0.2em] uppercase text-xs mb-6">Get in touch</p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tightish text-paper leading-[1.02] max-w-xl">
            {contact.heading}
          </h2>
        </div>
        <div className="reveal flex flex-col gap-5 md:items-end">
          <a href={`mailto:${contact.email}`} className="contact-link text-paper text-lg md:text-xl font-medium">
            {contact.email}
          </a>
          <a href={`tel:${phoneHref}`} className="contact-link text-paper/70 text-base">
            {contact.phone}
          </a>
          <a
            href={contact.linkedin_url}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
            className="contact-link text-paper/70 inline-flex"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
