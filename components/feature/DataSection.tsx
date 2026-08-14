"use client"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import SectionContainer from "@/components/primitives/SectionContainer"
import SectionTitle from "@/components/primitives/SectionTitle"
import style from "@/styles/feature/DataSection.module.scss"
import TypewriterText from "../primitives/TypewriterText"

const PROFILE_DATA = [
  {
    header: "BIRTHDAY",
    content: "7月7日"
  },
  {
    header: "HEIGHT",
    content: "167cm"
  },
  {
    header: "LIKES",
    content: "ゲーム / 開発"
  },
  {
    header: "DISLIKES",
    content: "野菜 / 片づけ"
  },
  {
    header: "MOTTO",
    content: "チビじゃない。器がデカい。"
  }
]
export default function DataSection() {
  const {
    ref,
    isVisible
  } = useIntersectionObserver({})
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