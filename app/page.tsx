import Header from "@/components/feature/Header"
import HeroSection from "@/components/feature/HeroSection"
import WorkSection from "@/components/feature/WorkSection"
import HomeWorkCard from "@/components/feature/works/HomeWorkCard"
import { WORKS } from "@/const/works"
import style from "@/app/page.module.scss"
import ExperimentSection from "@/components/feature/ExperimentSection";
import BlogSection from "@/components/feature/BlogSection";
import DataSection from "@/components/feature/DataSection";
import Footer from "@/components/feature/Footer";
import PageBackground from "@/components/ui/PageBackground"

const homeWorks = [...WORKS].sort(
  (a, b) => Number(b.period === "現在") - Number(a.period === "現在")
)

export default function Home() {
  return (
    <>
      <Header />
      <PageBackground className={style.main}>
        <HeroSection />
        <WorkSection>
          {homeWorks.map((work) => <HomeWorkCard key={work.code} work={work} />)}
        </WorkSection>
        <ExperimentSection />
        <BlogSection />
        <DataSection />
      </PageBackground>
      <Footer />
    </>
  );
}
