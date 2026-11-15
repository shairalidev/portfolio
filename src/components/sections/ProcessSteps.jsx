import Reveal from '../ui/Reveal';
import { process } from '../../data/services.json';

const ProcessSteps = () => (
  <ol className="process">
    {process.map((p, i) => (
      <Reveal as="li" key={p.step} delay={i * 100} className="process__step">
        <span className="process__num">{p.step}</span>
        <h3>{p.title}</h3>
        <p>{p.text}</p>
      </Reveal>
    ))}
  </ol>
);

export default ProcessSteps;
