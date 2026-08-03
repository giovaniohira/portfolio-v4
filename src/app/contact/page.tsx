import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactPageContent } from "@/components/contact/ContactPageContent";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description: `Get in touch with ${site.name}. Hiring, collaboration, or project inquiries.`,
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <ContactPageContent />
      </main>
      <Footer />
    </>
  );
}
