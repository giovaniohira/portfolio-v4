import { Header } from "@/components/Header";
import { SiteLineSidebar } from "@/components/SiteLineSidebar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
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
      </main>
      <Footer />
    </>
  );
}
