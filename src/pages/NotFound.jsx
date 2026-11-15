import Seo from '../components/ui/Seo';
import Button from '../components/ui/Button';

const NotFound = () => (
  <section className="not-found">
    <Seo title="Page not found" description="The page you were looking for doesn't exist." path="/404" noindex />
    <div className="container">
      <p className="not-found__code" aria-hidden="true">404</p>
      <h1>This page doesn&apos;t exist</h1>
      <p>It may have moved, or the link might be mistyped.</p>
      <div className="hero__actions">
        <Button to="/" icon="solar:home-2-linear">Back home</Button>
        <Button to="/work" variant="ghost">See my work</Button>
      </div>
    </div>
  </section>
);

export default NotFound;
