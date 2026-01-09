import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { OrganizationShowcase } from '@/components/home'
import { createClient } from '@/lib/supabase/server'

const SECTOR_CATEGORIES = [
  {
    name: 'Media & Journalism',
    examples: 'Newsrooms, podcasts, newsletters',
    icon: '📰',
  },
  {
    name: 'Academic & Research',
    examples: 'Journals, universities, think tanks',
    icon: '🎓',
  },
  {
    name: 'Government & Public',
    examples: 'Agencies, municipalities, libraries',
    icon: '🏛️',
  },
  {
    name: 'Corporate & Professional',
    examples: 'PR, internal comms, associations',
    icon: '🏢',
  },
  {
    name: 'Platform & Technology',
    examples: 'Facebook, TikTok, forums, AI tools',
    icon: '💻',
  },
  {
    name: 'Nonprofit & Advocacy',
    examples: 'Foundations, advocacy orgs',
    icon: '🤝',
  },
  {
    name: 'Individual & Creator',
    examples: 'YouTubers, bloggers, Substacks',
    icon: '✍️',
  },
]

export default async function Home() {
  // Fetch featured organizations for carousel
  const supabase = await createClient()
  const { data: organizations } = await supabase
    .from('organizations')
    .select('id, name, slug, domain, sector, logo_url, transparency_status')
    .eq('is_featured', true)
    .eq('is_public', true)
    .order('name')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#0074ff] text-white py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Your Audience Deserves to Know Your Publishing Policy
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 opacity-90">
            From newsrooms to nonprofits, universities to YouTubers, governments to Substacks, platforms like Facebook to personal blogs.
          </p>

          {/* Three Pillars - Always horizontal, compact on mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-10 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-2 sm:p-4">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎯</div>
              <h3 className="font-semibold text-xs sm:text-base">Identity</h3>
              <p className="text-[10px] sm:text-sm opacity-80 hidden sm:block">Who you are and who you serve</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-2 sm:p-4">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">📝</div>
              <h3 className="font-semibold text-xs sm:text-base">Commitments</h3>
              <p className="text-[10px] sm:text-sm opacity-80 hidden sm:block">How you verify and ensure accuracy</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-2 sm:p-4">
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⚖️</div>
              <h3 className="font-semibold text-xs sm:text-base">Accountability</h3>
              <p className="text-[10px] sm:text-sm opacity-80 hidden sm:block">How you correct and stay accountable</p>
            </div>
          </div>

          <Link
            href="/build"
            className="inline-block bg-white text-[#0074ff] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Build Your Publishing Policy
          </Link>
        </div>
      </section>

      {/* Organization Carousel */}
      {organizations && organizations.length > 0 && (
        <OrganizationShowcase organizations={organizations} />
      )}

      {/* The Malpublish Moment */}
      <section className="py-10 sm:py-14 md:py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-lg shadow-sm border-l-4 border-[#0074ff]">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Then We Define What Violates Those Commitments
            </h2>
            <p className="text-gray-700 mb-4">
              Based on your commitments, we generate <strong>malpublishing definitions</strong> specific to your organization. If you commit to two-source verification, then publishing without it is malpublishing <em>for you</em>.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-500 italic mb-2">
                &ldquo;Malpublish&rdquo; /mal-PUB-lish/ (verb)
              </p>
              <p className="text-gray-700">
                To publish in a manner that violates your own stated ethical standards.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Term coined March 2023 by Roarke Clinton.{' '}
                <a href="https://malpublish.org" target="_blank" rel="noopener noreferrer" className="text-[#0074ff] hover:underline">
                  malpublish.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">
            Built for Every Entity
          </h2>
          <p className="text-center text-gray-600 mb-8 sm:mb-10 md:mb-12 text-sm sm:text-base">
            31 templates across 7 categories. Start with one designed for your organization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {SECTOR_CATEGORIES.map((sector) => (
              <div
                key={sector.name}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#0074ff] transition-colors"
              >
                <span className="text-2xl sm:text-3xl mb-2 sm:mb-3 block">{sector.icon}</span>
                <h3 className="font-semibold text-base sm:text-lg">{sector.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{sector.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon: Certification */}
      <section className="py-10 sm:py-14 md:py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Coming Soon
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Certification Tiers
          </h2>
          <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
            Move beyond self-declaration. Earn verification badges that show your audience you mean business.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Declared</div>
              <p className="text-gray-500 text-[11px] sm:text-sm">Self-published policy</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Committed</div>
              <p className="text-gray-500 text-[11px] sm:text-sm">Public accountability</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-blue-200 border-2">
              <div className="font-semibold text-blue-700 mb-1">Verified</div>
              <p className="text-gray-500 text-[11px] sm:text-sm">Third-party review</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-amber-200 border-2">
              <div className="font-semibold text-amber-700 mb-1">Exemplary</div>
              <p className="text-gray-500 text-[11px] sm:text-sm">Industry leadership</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-[#0074ff] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            Ready to Define Your Standards?
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90">
            Join the movement toward transparent, accountable publishing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build"
              className="bg-white text-[#0074ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Build Your Policy
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Directory
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
