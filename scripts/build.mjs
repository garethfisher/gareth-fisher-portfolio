import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const template = fs.readFileSync(path.join(root, 'src/template.html'), 'utf-8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'content/site.json'), 'utf-8'));

data.contact.phone_href = data.contact.phone.replace(/[^\d+]/g, '');

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function getPath(obj, dotted) {
  return dotted.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function renderTokens(str, data) {
  return str.replace(/\{\{([\w.]+)\}\}/g, (match, keyPath) => {
    const value = getPath(data, keyPath);
    return value == null ? '' : escapeHtml(value);
  });
}

const arrowIconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;

function renderProjectCard({ title, url, image, type }, { featured = false } = {}) {
  return `      <a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="reveal project-card card rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated${featured ? ' md:col-span-2' : ''}">
        <div class="media-frame aspect-[4/3]">
          <img src="${escapeHtml(image)}" alt="${escapeHtml(title)} preview" class="w-full h-full object-cover">
        </div>
        <div class="p-6 md:p-7 flex items-center justify-between gap-4">
          <div>
            <h3 class="font-display text-xl text-paper mb-1.5">${escapeHtml(title)}</h3>
            <p class="text-paper/55 text-sm">${escapeHtml(type)}</p>
          </div>
          <span class="visit-arrow text-rust shrink-0">
            ${arrowIconSvg}
          </span>
        </div>
      </a>`;
}

function renderMoreWorkRow({ title, url, meta }) {
  return `        <a href="${escapeHtml(url)}" target="_blank" rel="noopener" class="extra-row flex flex-col md:flex-row md:items-baseline md:justify-between gap-x-6 gap-y-1 py-4 px-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
          <span class="text-paper text-base">${escapeHtml(title)}</span>
          <span class="text-paper/45 text-sm">${escapeHtml(meta)}</span>
        </a>`;
}

function renderSkillChip(skill) {
  return `      <span class="skill-chip px-5 py-2.5 rounded-full text-sm text-paper/85">${escapeHtml(skill)}</span>`;
}

let html = renderTokens(template, data);

html = html.replace('<!--SKILLS_CHIPS-->', data.skills.map(renderSkillChip).join('\n'));
html = html.replace('<!--WEBSITES_CARDS-->', data.websites.map((item) => renderProjectCard(item)).join('\n\n'));
html = html.replace('<!--MORE_WORK_ROWS-->', data.more_web_work.map(renderMoreWorkRow).join('\n'));
html = html.replace('<!--UX_CARDS-->', data.ux_projects.map((item) => renderProjectCard(item)).join('\n\n'));

fs.writeFileSync(path.join(root, 'index.html'), html);
console.log('Built index.html from content/site.json');
