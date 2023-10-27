import { Section } from "@/components/Layouts";
import Hero from "./components/Hero";

const Home = () => {
  return (
    <>
      <div className="relative z-0 container my-8">
        <Hero />
      </div>

      {/* <Section id="about">
        <div className="py-8 relative">
          <div className="container mx-auto">
            <About />
          </div>
        </div>
      </Section>

      <Section id="features">
        <div className="py-8 relative">
          <div className="container mx-auto">
            <Features />
          </div>
        </div>
      </Section>

      <Section id="pricing">
        <div className="py-8 relative">
          <div className="container mx-auto">
            <div className="flex flex-col lg:px-8 w-full justify-center items-center text-center">
              <Pricing />
            </div>
          </div>
        </div>
      </Section>

      <Section id="contact">
        <div className="py-8 relative">
          <div className="container mx-auto">
            <div className="flex flex-col lg:px-8 w-full justify-center items-center text-center">
              <Contact />
            </div>
          </div>
        </div>
      </Section> */}
    </>
  );
};

export default Home;
