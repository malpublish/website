import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'About | Publishing Policy',
  description: 'Learn about Publishing Policy and our mission to bring accountability to publishing through transparent, self-defined standards.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[#0074ff] text-white py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            About Publishing Policy
          </h1>
          <p className="text-lg sm:text-xl opacity-90">
            Bringing accountability to publishing through transparent, self-defined standards.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Every publisher—from major newsrooms to independent bloggers—makes implicit promises
            to their audience about how they create and verify content. Publishing Policy makes
            those promises explicit.
          </p>
          <p className="text-gray-700 mb-4">
            We believe that when publishers clearly define their standards, two things happen:
            audiences can make informed decisions about what to trust, and publishers hold
            themselves accountable to their own stated values.
          </p>
          <p className="text-gray-700">
            Our tool guides organizations through defining their publishing identity, editorial
            commitments, and accountability framework—then generates a clear, shareable policy
            document.
          </p>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-10 sm:py-14 md:py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">The Malpublish Concept</h2>
          <div className="bg-white p-4 sm:p-5 md:p-6 rounded-lg border-l-4 border-[#0074ff] mb-4 sm:mb-6">
            <p className="text-sm text-gray-500 italic mb-2">
              &ldquo;Malpublish&rdquo; /mal-PUB-lish/ (verb)
            </p>
            <p className="text-gray-700">
              To publish in a manner that constitutes malpractice.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Term coined March 2023 by Roarke Clinton.{' '}
              <a href="https://malpublish.org" target="_blank" rel="noopener noreferrer" className="text-[#0074ff] hover:underline">
                Full definition at malpublish.org
              </a>
            </p>
          </div>
          <p className="text-gray-700 mb-4">
            As <a href="https://malpublish.org" target="_blank" rel="noopener noreferrer" className="text-[#0074ff] hover:underline">malpublish.org</a> explains,
            {' '}&ldquo;Malpublishing is the cause of misinformation. There would be no misinformation
            without publishing malpractice.&rdquo; The term combines the prefix &ldquo;mal-&rdquo;
            (meaning bad or wrongful) with &ldquo;publish,&rdquo; following patterns like malpractice
            and malfunction.
          </p>
          <p className="text-gray-700 mb-4">
            Unlike universal ethics codes that try to apply the same rules to everyone,
            malpublishing is personal. A tabloid and an academic journal have different
            standards—and that&apos;s fine. What matters is that each organization clearly
            states its own standards and lives up to them.
          </p>
          <p className="text-gray-700">
            When you create a policy through our tool, we automatically generate malpublishing
            definitions based on your specific commitments. If you commit to two-source
            verification, then publishing without it is malpublishing <em>for you</em>.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">How It Works</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-[#0074ff] font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Define Your Identity</h3>
                <p className="text-gray-600">
                  Tell us who you are, who you serve, and your publishing mission. Select
                  from 31 sector templates across 7 categories.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-[#0074ff] font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">State Your Commitments</h3>
                <p className="text-gray-600">
                  Choose your standards for sourcing, accuracy, transparency, and independence.
                  Be honest—these become your accountability framework.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-[#0074ff] font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Set Your Accountability</h3>
                <p className="text-gray-600">
                  Define how you handle corrections, receive feedback, and review your practices.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <span className="text-[#0074ff] font-bold">4</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Get Your Policy</h3>
                <p className="text-gray-600">
                  We generate your policy document with personalized malpublishing definitions.
                  Share it publicly or keep it internal—your choice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-10 sm:py-14 md:py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Who It&apos;s For</h2>
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            Publishing Policy serves any organization or individual that publishes content
            and wants to be transparent about their standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">📰</span>
              <h3 className="font-semibold text-sm sm:text-base">Media & Journalism</h3>
              <p className="text-xs sm:text-sm text-gray-500">Newsrooms, podcasts, newsletters</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">🎓</span>
              <h3 className="font-semibold text-sm sm:text-base">Academic & Research</h3>
              <p className="text-xs sm:text-sm text-gray-500">Journals, universities, think tanks</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">🏛️</span>
              <h3 className="font-semibold text-sm sm:text-base">Government & Public</h3>
              <p className="text-xs sm:text-sm text-gray-500">Agencies, municipalities, libraries</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">🏢</span>
              <h3 className="font-semibold text-sm sm:text-base">Corporate & Professional</h3>
              <p className="text-xs sm:text-sm text-gray-500">PR, internal comms, associations</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">💻</span>
              <h3 className="font-semibold text-sm sm:text-base">Platform & Technology</h3>
              <p className="text-xs sm:text-sm text-gray-500">Social platforms, forums, AI content</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2 block">🤝</span>
              <h3 className="font-semibold text-sm sm:text-base">Nonprofit & Advocacy</h3>
              <p className="text-xs sm:text-sm text-gray-500">Foundations, advocacy orgs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-10 sm:py-14 md:py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Get In Touch</h2>
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            Have questions, feedback, or want to learn more about Publishing Policy?
          </p>
          <a
            href="mailto:stopmalpublishing@gmail.com"
            className="text-[#0074ff] hover:underline font-medium text-sm sm:text-base"
          >
            stopmalpublishing@gmail.com
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 sm:py-14 md:py-16 px-4 bg-[#0074ff] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            Ready to Define Your Standards?
          </h2>
          <p className="mb-4 sm:mb-6 opacity-90 text-sm sm:text-base">
            Create your publishing policy in minutes.
          </p>
          <Link
            href="/build"
            className="inline-block bg-white text-[#0074ff] px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm sm:text-base"
          >
            Build Your Policy
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
