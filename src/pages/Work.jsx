import Seo from '../components/ui/Seo';
import ProjectCard from '../components/work/ProjectCard';
import CtaBand from '../components/ui/CtaBand';
import PageHeader from '../components/ui/PageHeader';
import { absoluteUrl, projects } from '../lib/content';

const Work = () => (
  <>
    <Seo
      title="Projects by Shair Ali – Full-Stack Developer"
      description="Projects built by Shair Ali: a real-time expert marketplace, a lien-compliance SaaS, a tenant certification platform and a hotel site with an AI assistant."
      path="/work"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects by Shair Ali',
          url: absoluteUrl('/work'),
          hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: absoluteUrl(`/work/${p.slug}`) })),
        },
      ]}
    />

    <PageHeader
      eyebrow="Work"
      title="Client projects"
      text="Real products for real businesses, each one designed, built, deployed and maintained by me. Open a project to see the problem, the solution, the architecture and the details."
    />

    <section className="section section--flush-top">
      <div className="container">
        <h2 className="visually-hidden">Projects</h2>
        <div className="work-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>

    <CtaBand />
  </>
);

export default Work;
