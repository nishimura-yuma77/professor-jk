import Header from "@/components/feature/Header"
import HeroSection from "@/components/feature/HeroSection"
import style from "@/app/page.module.scss"
import ExperimentSection from "@/components/feature/ExperimentSection";
import MediaSection from "@/components/feature/MediaSection";
import DataSection from "@/components/feature/DataSection";

export default function Home() {
  return (
    <>
      <Header />
      <main className={style.main}>
        <HeroSection />
        <ExperimentSection />
        <MediaSection />
        <DataSection />
      </main>
    </>
  );
}
