import useInView from '../hooks/useInView.js';

export default function Skills({ skills }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <section id="skills" className="section-field px-6 md:px-10 py-24 md:py-32 border-t border-paper/5">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-12">
          <h2 className="font-display text-4xl md:text-5xl tracking-tightish text-paper">Skills &amp; tools</h2>
        </div>
        <div ref={ref} className={`flex flex-wrap gap-3${inView ? ' skills-in-view' : ''}`}>
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="skill-chip skill-chip-anim px-5 py-2.5 rounded-full text-sm text-paper/85"
              style={{ '--i': i }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
