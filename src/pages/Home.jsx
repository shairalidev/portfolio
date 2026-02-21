import { useMemo } from 'react';
import data from '../HomePageData.json';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Iconbox from '../components/Iconbox/Iconbox';
import Skill from '../components/Skill/Skill';
import Resume from '../components/Resume/ResumeSection';
import BlogSection from '../components/Blog/BlogSection';
import ReviewSection from '../components/Review/ReviewSection';
import Contact from "../components/Contact/Contact";
import PortfolioSection from '../components/Protfolio/PortfolioSection';
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { heroData, aboutData, serviceData, skillData, portfolioData, resumeData, reviewData, contactData, socialData } = data;
  const featuredProjects = portfolioData?.portfolioItems ?? [];
  const siteUrl = 'https://shairali.com/';
  const siteRoot = siteUrl.replace(/\/$/, '');
  const ogImage = `${siteUrl}images/section/hero-img.jpg`;
  const sameAs = useMemo(
    () => (socialData || []).map((item) => item.link).filter(Boolean),
    [socialData]
  );

  const portfolioImages = useMemo(
    () =>
      featuredProjects
        .map((item) => item.imgLink)
        .filter(Boolean)
        .filter((src) => !/^https?:\/\//.test(src))
        .map((src) => `${siteRoot}${src}`),
    [featuredProjects, siteRoot]
  );

  const structuredDataPerson = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Shair Ali",
      url: siteUrl,
      image: ogImage,
      jobTitle: "Full-Stack Developer & Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Freelance"
      },
      sameAs,
      email: "mailto:shair6470@gmail.com",
      telephone: "+92-307-4734113",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK"
      },
      knowsAbout: [
        "Full-stack development",
        "Artificial intelligence",
        "Chatbots",
        "AWS cloud hosting",
        "UI/UX design"
      ],
      description: "Shair Ali is a full-stack developer delivering production-grade web apps, AI assistants, and cloud deployments for global clients."
    }),
    [sameAs, ogImage, siteUrl]
  );

  const structuredDataWebsite = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: siteUrl,
      name: "Shair Ali Portfolio",
      description: "Portfolio and services of Shair Ali, a full-stack developer, AI engineer, and freelancer.",
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        name: "Shair Ali"
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }),
    [siteUrl]
  );

  const structuredDataCollection = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured Projects",
      itemListElement: featuredProjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.projectUrl || siteUrl,
        name: item.title
      }))
    }),
    [featuredProjects, siteUrl]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Shair Ali | Full-Stack Developer & Software Engineer</title>
        <meta
          name="description"
          content="Welcome to Shair Ali’s portfolio. I build modern full-stack web apps, AI chatbots, and production-ready deployments. Check out my projects, skills, and experience."
        />
        <meta
          name="keywords"
          content="Shair Ali, full stack developer, software engineer, freelance developer, AI chatbot developer, React developer, Pakistan developer"
        />
        <meta name="author" content="Shair Ali" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="image" content={ogImage} />

        {/* Open Graph */}
        <meta property="og:title" content="Shair Ali | Full-Stack Developer & Software Engineer" />
        <meta property="og:description" content="Explore full-stack case studies, AI assistants, and production deployments crafted by Shair Ali." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Shair Ali smiling with a laptop showcasing portfolio work" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shair Ali | Full-Stack Developer & Software Engineer" />
        <meta name="twitter:description" content="Discover modern web builds, AI concierge solutions, and automation by Shair Ali." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Shair Ali smiling with a laptop showcasing portfolio work" />
        <meta name="twitter:creator" content="@AliShair45057" />

        {/* Canonical & alternates */}
        <link rel="canonical" href="https://shairali.com/" />
        <link rel="author" href="mailto:shair6470@gmail.com" />
        {portfolioImages.map((image, index) => (
          <link rel="preload" as="image" href={image} key={`${image}-preload-${index}`} />
        ))}

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredDataPerson)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataWebsite)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataCollection)}</script>
      </Helmet>

      {/* Sections */}
      <Hero data={heroData} socialData={socialData} data-aos="fade-right" />
      <About data={aboutData} data-aos="fade-right" />
      <Iconbox data={serviceData} data-aos="fade-right" />
      <Skill data={skillData} data-aos="fade-right" />
      <Resume data={resumeData} />
      <PortfolioSection data={portfolioData} data-aos="fade-right" />
      <ReviewSection data={reviewData} data-aos="fade-right" />
      {/*<BlogSection data={blogData} data-aos="fade-right" />*/}
      <Contact data={contactData} socialData={socialData} data-aos="fade-right" />
    </>
  )
}

export default Home;
