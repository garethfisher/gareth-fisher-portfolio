export default function Hero({ hero }) {
  return (
    <section id="top" className="hero-field relative pt-40 pb-28 md:pt-52 md:pb-36 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr,auto] gap-12 md:gap-16 items-center">
        <div className="order-2 md:order-1">
          <h1 className="reveal hero-headline font-display text-[13vw] md:text-[6.2vw] leading-[0.98] tracking-tightish text-paper max-w-5xl">
            {hero.greeting}<br />
            <span className="italic text-rust">{hero.name}</span>.
          </h1>
          <p className="reveal leading-relaxed-body text-paper/70 text-base md:text-lg max-w-2xl mt-8">
            {hero.bio}
          </p>
          <div className="reveal flex flex-wrap gap-4 mt-10">
            <a href="#contact" className="btn-primary px-7 py-3.5 rounded-full font-medium shadow-elevated">{hero.cta_primary}</a>
            <a href="#websites" className="btn-ghost px-7 py-3.5 rounded-full font-medium text-paper">{hero.cta_secondary}</a>
          </div>
        </div>

        <div className="hero-photo order-1 md:order-2 relative w-48 h-48 md:w-72 md:h-72 mx-auto md:mx-0 shrink-0">
          <div
            className="absolute -inset-4 rounded-full"
            style={{
              background: 'radial-gradient(60% 60% at 50% 40%, rgba(200,90,46,0.45), transparent 70%)',
              filter: 'blur(18px)',
            }}
          />
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-floating ring-1 ring-paper/10">
            <img src={hero.photo} alt={`Portrait of ${hero.name}`} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
