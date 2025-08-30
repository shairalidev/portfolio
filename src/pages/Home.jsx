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

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Shair Ali | Full-Stack Developer & Software Engineer</title>
        <meta 
          name="description" 
          content="Welcome to Shair Ali’s portfolio. I build modern full-stack web apps, AI chatbots, and production-ready deployments. Check out my projects, skills, and experience." 
        />
        <link rel="canonical" href="https://shairali.com/" />
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
