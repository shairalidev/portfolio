import Seo from '../components/ui/Seo';
import ProjectCard from '../components/work/ProjectCard';
import CtaBand from '../components/ui/CtaBand';
import PageHeader from '../components/ui/PageHeader';
import { absoluteUrl, projects } from '../lib/content';

const Work = () => (
  <>
    <Seo
      title="Work & case studies"
      description="Case studies of production platforms built end to end by Shair Ali: a real-time expert marketplace, a lien-compliance SaaS, a tenant certification platform and a hotel website with AI support."
      path="/work"
      jsonLd={[
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Work & case studies',
          url: absoluteUrl('/work'),
          hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: absoluteUrl(`/work/${p.slug}`) })),
        },
      ]}
    />

    <PageHeader
      eyebrow="Work"
      title="Case studies"
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
