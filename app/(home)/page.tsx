import { AmbientBackground } from "@/components/portfolio/ambient-background";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Skills } from "@/components/portfolio/skills";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Process } from "@/components/portfolio/process";
import { CodeShowcase } from "@/components/portfolio/code-showcase";
import { Metrics } from "@/components/portfolio/metrics";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default async function Home() {
  return (
    <div className="relative bg-zinc-950 text-zinc-100 min-h-screen">
      <AmbientBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Process />
      <CodeShowcase />
      <Metrics />
      <Contact />
      <Footer />
    </div>
  );
}
