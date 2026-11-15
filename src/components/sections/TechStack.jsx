import { Icon } from '@iconify/react';
import Reveal from '../ui/Reveal';
import skills from '../../data/skills.json';

/** Grouped technology logos (replaces the old percentage bars). */
const TechStack = () => (
  <div className="tech-stack">
    {skills.map((group, i) => (
      <Reveal key={group.group} delay={i * 70} className="tech-stack__group">
        <h3>{group.group}</h3>
        <ul>
          {group.items.map((item) => (
            <li key={item.name}>
              <Icon icon={item.icon} aria-hidden="true" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    ))}
  </div>
);

/** Infinite logo ribbon for the home page. */
export const TechMarquee = () => {
  const items = skills.flatMap((g) => g.items);
  return (
    // Focusable so keyboard users can pause it (it pauses on hover and focus).
    <div className="marquee" role="region" aria-label="Technologies I work with" tabIndex={0}>
      <ul className="marquee__track">
        {[...items, ...items].map((item, i) => (
          <li key={`${item.name}-${i}`} aria-hidden={i >= items.length}>
            <Icon icon={item.icon} aria-hidden="true" />
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TechStack;
