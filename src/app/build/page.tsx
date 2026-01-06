import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PolicyWizard } from './PolicyWizard'

export const metadata = {
  title: 'Build Your Publishing Policy | Publishing Policy',
  description: 'Define your publishing commitments and create an accountability framework for your organization.',
}

export default async function BuildPolicyPage() {
  const supabase = await createClient()

  // Fetch sector templates
  const { data: sectors, error } = await supabase
    .from('sector_templates')
    .select('slug, name, category')
    .order('category')
    .order('name')

  if (error) {
    console.error('Database error:', error)
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to load policy builder</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <PolicyWizard sectors={sectors || []} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
