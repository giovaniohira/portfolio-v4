import { Header } from "@/components/Header";
import { SiteLineSidebar } from "@/components/SiteLineSidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <SiteLineSidebar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Expertise />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
