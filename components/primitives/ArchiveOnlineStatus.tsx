import style from "@/styles/primitives/ArchiveOnlineStatus.module.scss"

type ArchiveOnlineStatusProps = {
  label: string
}

export default function ArchiveOnlineStatus({ label }: ArchiveOnlineStatusProps) {
  return (
    <div className={style.container}>
      <span aria-hidden="true">●</span>
      {label}
    </div>
  )
}
