import Navbar from "../components/Navbar";
import AboutHero from "../components/AboutHero";
import AboutStory from "../components/AboutStory";
import WhyChooseUs from "../components/WhyChooseUs";
import AboutStats from "../components/AboutStats";
import AboutTeam from "../components/AboutTeam";
// import Testimonials from "../components/Testimonials";
import AboutCTA from "../components/AboutCTA";

function About() {
  return (
    <>
      <Navbar />

      <AboutHero />

       <AboutStory /> 

      <WhyChooseUs />

      <AboutTeam />

      <AboutStats />

      <AboutCTA /> 

      {/* <Testimonials /> */}

    </>
  );
}

export default About;