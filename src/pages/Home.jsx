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
      "@id": `${siteRoot}/#person`,
      name: "Shair Ali",
      alternateName: ["Shair Ali Developer", "Shair Ali Full Stack Developer", "Shair Ali React Developer"],
      url: siteUrl,
      image: {
        "@type": "ImageObject",
        url: ogImage,
        width: 800,
        height: 800
      },
      jobTitle: ["Full-Stack Developer", "React Developer", "Software Engineer", "Freelance Developer"],
      worksFor: {
        "@type": "Organization",
        name: "Freelance"
      },
      sameAs,
      email: "mailto:shair6470@gmail.com",
      telephone: "+92-307-4734113",
      address: {
        "@type": "PostalAddress",
        addressCountry: "PK",
        addressRegion: "Pakistan"
      },
      nationality: {
        "@type": "Country",
        name: "Pakistan"
      },
      homeLocation: {
        "@type": "Country",
        name: "Pakistan"
      },
      knowsAbout: [
        "Full-Stack Web Development",
        "React.js Development",
        "React Native Development",
        "Node.js Development",
        "JavaScript Development",
        "Custom Software Development",
        "AI Chatbot Development",
        "WhatsApp Integration",
        "AWS Cloud Hosting",
        "UI/UX Design",
        "E-Commerce Development",
        "REST API Development",
        "Python Development",
        "Database Design",
        "Agile Software Development"
      ],
      knowsLanguage: ["English", "Urdu"],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationLocation: {
          "@type": "Country",
          name: "Pakistan"
        },
        description: "Full-Stack Developer specializing in React.js, Node.js, AI chatbots, and cloud deployments",
        skills: "React.js, Node.js, Python, JavaScript, AWS, MongoDB, PostgreSQL, AI/ML, REST APIs, React Native"
      },
      description: "Shair Ali is a full-stack developer from Pakistan delivering production-grade web apps, React applications, AI assistants, and cloud deployments for global clients. Available to hire for freelance projects worldwide."
    }),
    [sameAs, ogImage, siteUrl, siteRoot]
  );

  const structuredDataWebsite = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      url: siteUrl,
      name: "Shair Ali Portfolio",
      description: "Portfolio and services of Shair Ali, a full-stack developer and React expert from Pakistan.",
      inLanguage: "en",
      publisher: {
        "@type": "Person",
        "@id": `${siteRoot}/#person`,
        name: "Shair Ali"
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}?s={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }),
    [siteUrl, siteRoot]
  );

  const structuredDataCollection = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Featured Projects by Shair Ali",
      itemListElement: featuredProjects.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: item.projectUrl || siteUrl,
        name: item.title
      }))
    }),
    [featuredProjects, siteUrl]
  );

  const structuredDataService = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Full Stack Development & React Development Services",
      alternateName: "Custom Software Development Pakistan",
      url: siteUrl,
      description: "Shair Ali offers professional full-stack web development, React.js & React Native development, AI chatbot development, and custom software solutions for clients worldwide. Based in Pakistan.",
      provider: {
        "@type": "Person",
        "@id": `${siteRoot}/#person`,
        name: "Shair Ali"
      },
      areaServed: [
        { "@type": "Country", "name": "Pakistan" },
        { "@type": "Country", "name": "United States" },
        { "@type": "Country", "name": "United Kingdom" },
        { "@type": "Country", "name": "Italy" },
        { "@type": "Country", "name": "Australia" }
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Development Services by Shair Ali",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "React.js & Full Stack Web Development",
              description: "Custom web applications using React.js, Node.js, and REST APIs"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "React Native App Development",
              description: "Cross-platform mobile apps using React Native"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI Chatbot & WhatsApp Integration",
              description: "Intelligent AI chatbots with WhatsApp and multi-language support"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Custom Software Development",
              description: "Tailored software solutions including desktop applications and automation"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AWS Cloud Hosting & Deployment",
              description: "Production-grade deployments on AWS with Nginx"
            }
          }
        ]
      }
    }),
    [siteUrl, siteRoot]
  );

  const structuredDataProfile = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "Shair Ali – Full Stack Developer Portfolio",
      url: siteUrl,
      description: "Professional portfolio of Shair Ali, a full stack developer and React expert from Pakistan offering custom software development and AI solutions.",
      mainEntity: {
        "@type": "Person",
        "@id": `${siteRoot}/#person`,
        name: "Shair Ali"
      },
      inLanguage: "en",
      dateModified: "2026-02-21"
    }),
    [siteUrl, siteRoot]
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Shair Ali | Full Stack Developer Pakistan – React, Node.js &amp; AI Expert</title>
        <meta
          name="description"
          content="Hire Shair Ali — a top-rated full stack developer from Pakistan specializing in React.js, Node.js, React Native, AI chatbots, and custom software development. Trusted by global clients. Available for freelance projects worldwide."
        />
        <meta
          name="keywords"
          content="Shair Ali, shair ali developer, shair ali portfolio, full stack developer, full stack developer Pakistan, full-stack developer, full stack development, react developer, react developer Pakistan, hire react developer, hire react developers, hire react native developers, react js development, react js development services, react native developer, react native app development, react native app development services, react development company, software developer, software developer Pakistan, software development, custom software development, software development company, agile software development, freelance developer Pakistan, web developer Pakistan, javascript developer, node.js developer, AI chatbot developer, chatbot development, WhatsApp chatbot, AWS developer, software engineer Pakistan, python developer Pakistan"
        />
        <meta name="author" content="Shair Ali" />
        <meta name="language" content="English" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="image" content={ogImage} />

        {/* Geo Tags – Pakistan local SEO */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="geo.position" content="30.3753;69.3451" />
        <meta name="ICBM" content="30.3753, 69.3451" />

        {/* Open Graph */}
        <meta property="og:title" content="Shair Ali | Full Stack Developer Pakistan – React &amp; AI Expert" />
        <meta property="og:description" content="Hire Shair Ali — full stack developer from Pakistan specializing in React.js, Node.js, AI chatbots, and custom software development for global clients." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Shair Ali – Full Stack Developer from Pakistan" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Shair Ali Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Shair Ali | Full Stack Developer Pakistan – React &amp; AI Expert" />
        <meta name="twitter:description" content="Hire Shair Ali — full stack developer from Pakistan specializing in React.js, Node.js, AI chatbots, and custom software development." />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Shair Ali – Full Stack Developer from Pakistan" />
        <meta name="twitter:creator" content="@AliShair45057" />
        <meta name="twitter:site" content="@AliShair45057" />

        {/* Canonical & alternates */}
        <link rel="canonical" href="https://shairali.com/" />
        <link rel="author" href="mailto:shair6470@gmail.com" />
        <link rel="alternate" hreflang="en" href="https://shairali.com/" />
        {portfolioImages.map((image, index) => (
          <link rel="preload" as="image" href={image} key={`${image}-preload-${index}`} />
        ))}

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredDataPerson)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataWebsite)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataCollection)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataService)}</script>
        <script type="application/ld+json">{JSON.stringify(structuredDataProfile)}</script>
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
