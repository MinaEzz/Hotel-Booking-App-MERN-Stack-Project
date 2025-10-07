import Image from "next/image";
import HERO_BG from "@/assets/home/hero-bg-img.jpg";
import HeroContent from "./hero-content/HeroContent.component";

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen relative overflow-hidden flex items-center justify-center">
      <Image
        src={HERO_BG}
        className="w-full h-full absolute object-center object-cover -z-10"
        alt=""
      />
      <div className="black-layer-to-top -z-5" />
      <div className="container">
        <HeroContent />
      </div>
    </section>
  );
}
