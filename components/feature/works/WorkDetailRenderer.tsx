import type { Work, WorkDetailSection } from "@/const/works"
import style from "@/styles/feature/works/WorkDetailRenderer.module.scss"

function DetailSection({ section, index }: { section: WorkDetailSection; index: number }) {
  return (
    <section className={style.section} aria-labelledby={`work-${section.id}`}>
      <h2 id={`work-${section.id}`}><span aria-hidden="true">{String(index).padStart(2, "0")}</span>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.items && (
        <ul className={section.id === "responsibilities" ? style.compact_list : undefined}>
          {section.items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      )}
    </section>
  )
}

export default function WorkDetailRenderer({ work }: { work: Work }) {
  const overview = work.details.find((section) => section.id === "overview")
  const sections: WorkDetailSection[] = [
    {
      id: "overview",
      title: "担当した仕事",
      paragraphs: [...(overview?.paragraphs ?? [work.summary[0]]), ...work.summary.slice(1)],
    },
    {
      id: "responsibilities",
      title: "担当範囲",
      items: work.responsibilities,
    },
    ...work.details.filter((section) => section.id !== "overview"),
  ]

  return (
    <div className={style.content}>
      {sections.map((section, index) => <DetailSection key={section.id} section={section} index={index + 1} />)}
    </div>
  )
}
