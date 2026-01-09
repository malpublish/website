import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Publishing Policy</h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Every publisher needs a policy. Define your commitments and be held accountable to your own standards.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Links</h4>
            <ul className="space-y-2 text-gray-400 text-xs sm:text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/directory" className="hover:text-white transition-colors">Directory</Link></li>
              <li><Link href="/build" className="hover:text-white transition-colors">Build Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <a
              href="mailto:stopmalpublishing@gmail.com"
              className="text-[#64b4ff] hover:underline text-xs sm:text-sm break-all"
            >
              stopmalpublishing@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-500 text-xs sm:text-sm">
          <p>&ldquo;Malpublish&rdquo; (/mal-PUB-lish/): Publishing in a manner that constitutes malpractice.</p>
          <p className="mt-2">
            Term coined by Roarke Clinton, March 2023.{' '}
            <a href="https://malpublish.org" target="_blank" rel="noopener noreferrer" className="text-[#64b4ff] hover:underline">
              malpublish.org
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
