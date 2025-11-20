'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    // Wait for DOM to be fully loaded
    const extractHeadings = () => {
      // Extract headings from the article
      const article = document.querySelector('article')
      if (!article) {
        // Retry after a short delay if article not found
        setTimeout(extractHeadings, 100)
        return
      }

      const headingElements = article.querySelectorAll('h2, h3')
      if (headingElements.length === 0) {
        // Retry if no headings found yet
        setTimeout(extractHeadings, 100)
        return
      }

      const headingData: Heading[] = []

      headingElements.forEach((heading, index) => {
        const text = heading.textContent || ''
        const level = parseInt(heading.tagName[1])

        // Create ID from text if it doesn't exist
        if (!heading.id) {
          heading.id = `heading-${index}`
        }

        headingData.push({
          id: heading.id,
          text,
          level
        })
      })

      setHeadings(headingData)

      // Clean up existing observer
      if (observer) {
        observer.disconnect()
      }

      // Intersection Observer for active heading
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id)
            }
          })
        },
        { rootMargin: '-80px 0px -80% 0px' }
      )

      headingElements.forEach((heading) => {
        observer?.observe(heading)
      })
    }

    // Reset headings when pathname changes
    setHeadings([])
    setActiveId('')

    // Extract headings
    extractHeadings()

    // Cleanup function
    return () => {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    }
  }, [pathname]) // Re-run when pathname changes

  if (headings.length === 0) return null

  return (
    <nav className="sticky top-24 hidden lg:block">
      <div className="bg-gradient-to-br from-[#1C162D] to-[#0D0A16] rounded-lg p-6 border border-gray-700">
        <h4 className="text-sm font-semibold text-[#F4B860] mb-4 uppercase tracking-wide">
          On This Page
        </h4>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={heading.level === 3 ? 'ml-4' : ''}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm transition-colors ${
                  activeId === heading.id
                    ? 'text-[#F4B860] font-semibold'
                    : 'text-gray-400 hover:text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  })
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
