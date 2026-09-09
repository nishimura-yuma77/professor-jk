type ArrowIconProps = {
  direction?: "up-right" | "right"
  className?: string
}

export default function ArrowIcon({ direction = "up-right", className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "right" ? "M4 12h16M13 5l7 7-7 7" : "M6 18 18 6M6 6h12v12"} />
    </svg>
  )
}
