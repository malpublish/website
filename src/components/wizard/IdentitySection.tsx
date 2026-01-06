'use client'

import type { PublishingIdentity, SectorCategory } from '@/types/database'

interface SectorOption {
  slug: string
  name: string
  category: SectorCategory
}

interface IdentitySectionProps {
  data: PublishingIdentity
  sectors: SectorOption[]
  onChange: (data: PublishingIdentity) => void
}

const SECTOR_CATEGORIES: SectorCategory[] = [
  'Media & Journalism',
  'Academic & Research',
  'Government & Public',
  'Corporate & Professional',
  'Platform & Technology',
  'Nonprofit & Advocacy',
  'Individual & Creator',
]

export function IdentitySection({ data, sectors, onChange }: IdentitySectionProps) {
  const handleChange = (field: keyof PublishingIdentity, value: string) => {
    onChange({ ...data, [field]: value })
  }

  // Group sectors by category
  const sectorsByCategory = SECTOR_CATEGORIES.map(category => ({
    category,
    sectors: sectors.filter(s => s.category === category),
  })).filter(group => group.sectors.length > 0)

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Who Are You?
        </h1>
        <p className="text-gray-600">
          Tell us about your organization and publishing mission
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Organization Name */}
        <div>
          <label htmlFor="org-name" className="block text-sm font-medium text-gray-700 mb-1">
            Organization Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="org-name"
            value={data.organization_name}
            onChange={(e) => handleChange('organization_name', e.target.value)}
            placeholder="e.g., Acme News, City Tribune, Your Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent"
          />
        </div>

        {/* Sector Selection */}
        <div>
          <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
            What type of publisher are you? <span className="text-red-500">*</span>
          </label>
          <select
            id="sector"
            value={data.sector}
            onChange={(e) => handleChange('sector', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent bg-white"
          >
            <option value="">Select your sector...</option>
            {sectorsByCategory.map(({ category, sectors: categorySectors }) => (
              <optgroup key={category} label={category}>
                {categorySectors.map(sector => (
                  <option key={sector.slug} value={sector.slug}>
                    {sector.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Primary Audience */}
        <div>
          <label htmlFor="audience" className="block text-sm font-medium text-gray-700 mb-1">
            Who is your primary audience? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="audience"
            value={data.primary_audience}
            onChange={(e) => handleChange('primary_audience', e.target.value)}
            placeholder="e.g., Local community residents, Academic researchers, Industry professionals"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent"
          />
        </div>

        {/* Publishing Mission */}
        <div>
          <label htmlFor="mission" className="block text-sm font-medium text-gray-700 mb-1">
            What is your publishing mission?
          </label>
          <p className="text-sm text-gray-500 mb-2">
            In one or two sentences, describe why you publish.
          </p>
          <textarea
            id="mission"
            value={data.publishing_mission}
            onChange={(e) => handleChange('publishing_mission', e.target.value)}
            placeholder="e.g., To inform our community with accurate, independent journalism that holds local institutions accountable."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent resize-none"
          />
        </div>
      </div>
    </div>
  )
}
