import ProjectCard from './ProjectCard.jsx';

export default function Websites({ websites, moreWebWork }) {
  return (
    <section id="websites" className="section-field px-6 md:px-10 py-24 md:py-32 border-t border-paper/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-rust font-medium tracking-[0.2em] uppercase text-xs mb-4">Selected work</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tightish text-paper max-w-2xl">Websites</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {websites.map((item) => (
            <ProjectCard key={item.title} {...item} />
          ))}
        </div>

        <div className="reveal mt-16 md:mt-20">
          <h3 className="font-display text-2xl text-paper mb-2">More web work</h3>
          <div className="mt-4">
            {moreWebWork.map((item) => (
              <a
                key={item.title}
                href={item.url}
                target="_blank"
                rel="noopener"
                className="extra-row flex flex-col md:flex-row md:items-baseline md:justify-between gap-x-6 gap-y-1 py-4 px-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              >
                <span className="text-paper text-base">{item.title}</span>
                <span className="text-paper/45 text-sm">{item.meta}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
