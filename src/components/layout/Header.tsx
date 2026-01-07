'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-[#0074ff] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - always visible */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Image
              src="/logo.svg"
              alt=""
              width={28}
              height={28}
              className="text-white"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            Publishing Policy
          </Link>

          {/* Desktop navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/directory" className="hover:underline">
              Directory
            </Link>
            <Link
              href="/build"
              className="bg-white text-[#0074ff] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Build Policy
            </Link>
          </nav>

          {/* Hamburger button - visible on mobile only */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 -mr-2"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
