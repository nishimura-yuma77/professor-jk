import Header from "@/components/feature/Header"
import HeroSection from "@/components/feature/HeroSection"
import style from "@/app/page.module.scss"
import ExperimentSection from "@/components/feature/ExperimentSection";
import MediaSection from "@/components/feature/MediaSection";
import DataSection from "@/components/feature/DataSection";
import Footer from "@/components/feature/Footer";
import PageBackground from "@/components/ui/PageBackground"

export default function Home() {
  return (
    <>
      <Header />
      <PageBackground className={style.main}>
        <HeroSection />
        <ExperimentSection />
        <MediaSection />
        <DataSection />
      </PageBackground>
      <Footer />
    </>
  );
}
