import site from './data/site.json';
import GrainOverlay from './components/GrainOverlay.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Skills from './components/Skills.jsx';
import Websites from './components/Websites.jsx';
import UXProjects from './components/UXProjects.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Nav name={site.hero.name} ctaPrimary={site.hero.cta_primary} />
      <Hero hero={site.hero} />
      <Skills skills={site.skills} />
      <Websites websites={site.websites} moreWebWork={site.more_web_work} />
      <UXProjects projects={site.ux_projects} />
      <Contact contact={site.contact} />
      <Footer name={site.hero.name} />
    </>
  );
}
