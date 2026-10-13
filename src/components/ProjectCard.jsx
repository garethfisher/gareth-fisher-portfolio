import ArrowIcon from './ArrowIcon.jsx';

export default function ProjectCard({ title, url, image, type }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="reveal project-card card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated"
    >
      <div className="media-frame aspect-[4/3]">
        <img src={image} alt={`${title} preview`} className="w-full h-full object-cover" />
      </div>
      <div className="p-6 md:p-7 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-paper mb-1.5">{title}</h3>
          <p className="text-paper/55 text-sm">{type}</p>
        </div>
        <ArrowIcon />
      </div>
    </a>
  );
}
