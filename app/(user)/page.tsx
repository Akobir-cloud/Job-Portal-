import Actions from "@/components/Actions";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import Stats from "@/components/Stats";
import TrustedStats from "@/components/Stats2";

export default function Home() {
  return (
    <div >
      <Hero/>
      <ScrollReveal>
        <Stats />
      </ScrollReveal>
      
      <ScrollReveal>
        <Features />
      </ScrollReveal>

      <ScrollReveal>
        <TrustedStats />
      </ScrollReveal>

      <ScrollReveal>
        <Actions/>
      </ScrollReveal>
    </div>
  );
}
