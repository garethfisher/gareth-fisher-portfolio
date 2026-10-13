import ProjectCard from './ProjectCard.jsx';

export default function UXProjects({ projects }) {
  return (
    <section id="ux" className="section-field px-6 md:px-10 py-24 md:py-32 border-t border-paper/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-14">
          <p className="text-rust font-medium tracking-[0.2em] uppercase text-xs mb-4">Prototypes</p>
          <h2 className="font-display text-4xl md:text-5xl tracking-tightish text-paper max-w-2xl">UX design</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((item) => (
            <ProjectCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
