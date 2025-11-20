'use client'

interface ScrollButtonProps {
  targetId: string
  className?: string
  children: React.ReactNode
}

export function ScrollButton({ targetId, className, children }: ScrollButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
