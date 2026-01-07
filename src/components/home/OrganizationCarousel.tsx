'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface Organization {
  id: string
  name: string
  slug: string
  domain: string | null
  sector: string | null
  logo_url: string | null
  transparency_status: string | null
}

interface OrganizationCarouselProps {
  organizations: Organization[]
  onOrganizationClick: (org: Organization) => void
}

// Scroll speeds (pixels per frame) - bottom is 2.6x faster than top
const TOP_ROW_SPEED = 0.25
const BOTTOM_ROW_SPEED = 0.65

function getLogoUrl(org: Organization): string {
  if (org.logo_url) return org.logo_url
  if (org.domain) return `https://logo.clearbit.com/${org.domain}`
  return '/logo.svg'
}

function getStatusBadge(status: string | null) {
  switch (status) {
    case 'has_policy':
      return { text: 'Has Policy', shortText: 'Policy', className: 'bg-green-100 text-green-800' }
    case 'claimed':
      return { text: 'Claimed', shortText: 'Claimed', className: 'bg-blue-100 text-blue-800' }
    case 'no_policy':
    default:
      return { text: 'No Known Policy', shortText: 'Unknown', className: 'bg-gray-100 text-gray-600' }
  }
}

interface CarouselRowProps {
  organizations: Organization[]
  speed: number
  onOrganizationClick: (org: Organization) => void
  direction: 'left' | 'right'
}

function CarouselRow({ organizations, speed, onOrganizationClick, direction }: CarouselRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isPaused) return

    let animationId: number

    const scroll = () => {
      const maxScroll = scrollContainer.scrollWidth / 2

      if (direction === 'left') {
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += speed
        }
      } else {
        if (scrollContainer.scrollLeft <= 0) {
          scrollContainer.scrollLeft = maxScroll
        } else {
          scrollContainer.scrollLeft -= speed
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)
    return () => cancelAnimationFrame(animationId)
  }, [isPaused, speed, direction])

  // Duplicate for infinite scroll
  const duplicatedOrgs = [...organizations, ...organizations]

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {duplicatedOrgs.map((org, index) => {
        const status = getStatusBadge(org.transparency_status)
        return (
          <button
            key={`${org.id}-${index}`}
            onClick={() => onOrganizationClick(org)}
            className="flex-shrink-0 bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-sm border border-gray-200 hover:border-[#0074ff] hover:shadow-md transition-all cursor-pointer w-28 sm:w-36 md:w-48"
          >
            <div className="flex flex-col items-center text-center">
              {/* Logo - responsive sizing */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-1.5 sm:mb-2 md:mb-3 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                <Image
                  src={getLogoUrl(org)}
                  alt={`${org.name} logo`}
                  width={48}
                  height={48}
                  className="object-contain w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    target.parentElement!.innerHTML = `<span class="text-base sm:text-lg md:text-2xl font-bold text-gray-400">${org.name.charAt(0)}</span>`
                  }}
                />
              </div>
              {/* Name - truncate on small screens */}
              <h3 className="font-medium text-gray-900 text-[11px] sm:text-xs md:text-sm mb-1 sm:mb-2 line-clamp-1 w-full">
                {org.name}
              </h3>
              {/* Badge - shorter text on mobile */}
              <span className={`text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${status.className}`}>
                <span className="md:hidden">{status.shortText}</span>
                <span className="hidden md:inline">{status.text}</span>
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

export function OrganizationCarousel({ organizations, onOrganizationClick }: OrganizationCarouselProps) {
  // Split organizations into two rows (alternating for variety)
  const topRowOrgs = organizations.filter((_, i) => i % 2 === 0)
  const bottomRowOrgs = organizations.filter((_, i) => i % 2 === 1)

  return (
    <section className="py-6 sm:py-8 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Do These Organizations Have a Publishing Policy?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Click to view transparency status
          </p>
        </div>
      </div>

      {/* Two-row carousel with differential speeds */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4 px-4">
        <CarouselRow
          organizations={topRowOrgs}
          speed={TOP_ROW_SPEED}
          onOrganizationClick={onOrganizationClick}
          direction="left"
        />
        <CarouselRow
          organizations={bottomRowOrgs}
          speed={BOTTOM_ROW_SPEED}
          onOrganizationClick={onOrganizationClick}
          direction="left"
        />
      </div>

      {/* Footer text */}
      <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4 px-4">
        Transparency status based on publicly available information. Organizations can{' '}
        <span className="text-[#0074ff]">claim their profile</span> to update their status.
      </p>
    </section>
  )
}
