type CopyrightProps = {
  className?: string
}

export default function Copyright({
  className
}: CopyrightProps) {
  const year = new Date().getFullYear()
  return (
    <small className={`${className && className}`}>© {year} Prof. J.K. All Rights Reserved.</small>
  )
}