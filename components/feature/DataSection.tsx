"use client"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import SectionContainer from "@/components/primitives/SectionContainer"
import SectionTitle from "@/components/primitives/SectionTitle"
import style from "@/styles/feature/DataSection.module.scss"
import TypewriterText from "../primitives/TypewriterText"
import { PROFILE_DATA } from "@/const/profile"

export default function DataSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver<HTMLDivElement>({ once: true })
  return (
    <SectionContainer ref={ref}>
      <SectionTitle title={"003_DATA"} isVisible={isVisible} />
      <table className={style.profile_table}>
        <tbody>
          {PROFILE_DATA.map((profile) => {
            return (
              <tr key={profile.header}>
                <th scope="row"><TypewriterText text={profile.header} isVisible={isVisible}/></th>
                <td><TypewriterText text={profile.content} isVisible={isVisible}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </SectionContainer>
  )
}
