import Header from "@/components/feature/Header"
import HeroSection from "@/components/feature/HeroSection"
import HeroActivity from "@/components/feature/HeroActivity"
import WorkSection from "@/components/feature/WorkSection"
import WorkArchiveGrid from "@/components/feature/works/WorkArchiveGrid"
import { WORKS } from "@/const/works"
import style from "@/app/page.module.scss"
import ExperimentSection from "@/components/feature/ExperimentSection";
import BlogSection from "@/components/feature/BlogSection";
import DataSection from "@/components/feature/DataSection";
import Footer from "@/components/feature/Footer";
import PageBackground from "@/components/ui/PageBackground"

export default function Home() {
  return (
    <>
      <Header />
      <PageBackground className={style.main}>
        <HeroSection>
          <HeroActivity />
        </HeroSection>
        <WorkSection>
          <WorkArchiveGrid works={WORKS} headingLevel={3} />
        </WorkSection>
        <ExperimentSection />
        <BlogSection />
        <DataSection />
      </PageBackground>
      <Footer />
    </>
  );
}
