import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-[#0074ff] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            Publishing Policy
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/directory" className="hover:underline">
              Directory
            </Link>
            <Link
              href="/build"
              className="bg-white text-[#0074ff] px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Build Policy
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
