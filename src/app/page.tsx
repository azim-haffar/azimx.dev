import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Experience />
      <FeaturedProjects />
      <Skills />
      <About />
      <Contact />
    </>
  );
}
