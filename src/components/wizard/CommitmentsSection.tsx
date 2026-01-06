'use client'

import type { EditorialCommitments } from '@/types/database'

interface CommitmentsSectionProps {
  data: EditorialCommitments
  onChange: (data: EditorialCommitments) => void
}

const SOURCING_OPTIONS = [
  { value: 'single_verified', label: 'Single verified source', description: 'We verify claims with at least one reliable source' },
  { value: 'two_independent', label: 'Two independent sources', description: 'We require verification from at least two independent sources' },
  { value: 'three_or_more', label: 'Three or more sources', description: 'We require verification from multiple independent sources' },
  { value: 'varies', label: 'Varies by story type', description: 'Our sourcing requirements vary based on the nature of the content' },
] as const

const ACCURACY_OPTIONS = [
  { value: 'formal_process', label: 'Formal fact-checking process', description: 'We have a documented fact-checking workflow' },
  { value: 'editor_review', label: 'Editor review', description: 'All content is reviewed by an editor before publication' },
  { value: 'self_verified', label: 'Author verification', description: 'Authors are responsible for verifying their own work' },
  { value: 'no_formal', label: 'No formal process', description: 'We do not have a formal fact-checking process' },
] as const

const TRANSPARENCY_OPTIONS = [
  { key: 'funding', label: 'Funding sources', description: 'We disclose who funds our work' },
  { key: 'ownership', label: 'Ownership structure', description: 'We disclose who owns our organization' },
  { key: 'corrections', label: 'Corrections log', description: 'We maintain a public record of corrections' },
  { key: 'editorial_process', label: 'Editorial process', description: 'We explain how we produce our content' },
] as const

const INDEPENDENCE_OPTIONS = [
  { value: 'disclosure_policy', label: 'Disclosure policy', description: 'We disclose relevant conflicts of interest' },
  { value: 'recusal_policy', label: 'Recusal policy', description: 'Staff recuse themselves from covering topics where they have conflicts' },
  { value: 'no_formal', label: 'No formal policy', description: 'We do not have a formal conflict of interest policy' },
] as const

export function CommitmentsSection({ data, onChange }: CommitmentsSectionProps) {
  const handleRadioChange = (field: 'sourcing' | 'accuracy' | 'independence', value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleTransparencyChange = (key: keyof EditorialCommitments['transparency']) => {
    onChange({
      ...data,
      transparency: {
        ...data.transparency,
        [key]: !data.transparency[key],
      },
    })
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          What Do You Stand For?
        </h1>
        <p className="text-gray-600">
          Define your editorial commitments and standards
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Sourcing Standards */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Sourcing Standards
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            How many independent sources do you require before publishing claims?
          </p>
          <div className="space-y-3">
            {SOURCING_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.sourcing === option.value
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="sourcing"
                  value={option.value}
                  checked={data.sourcing === option.value}
                  onChange={() => handleRadioChange('sourcing', option.value)}
                  className="mt-0.5 h-4 w-4 text-[#0074ff] focus:ring-[#0074ff]"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {option.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Accuracy Commitment */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Accuracy Commitment
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            What is your fact-checking process?
          </p>
          <div className="space-y-3">
            {ACCURACY_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.accuracy === option.value
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="accuracy"
                  value={option.value}
                  checked={data.accuracy === option.value}
                  onChange={() => handleRadioChange('accuracy', option.value)}
                  className="mt-0.5 h-4 w-4 text-[#0074ff] focus:ring-[#0074ff]"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {option.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Transparency Practices */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Transparency Practices
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            What do you disclose to your audience? (Select all that apply)
          </p>
          <div className="space-y-3">
            {TRANSPARENCY_OPTIONS.map(option => (
              <label
                key={option.key}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.transparency[option.key as keyof EditorialCommitments['transparency']]
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.transparency[option.key as keyof EditorialCommitments['transparency']]}
                  onChange={() => handleTransparencyChange(option.key as keyof EditorialCommitments['transparency'])}
                  className="mt-0.5 h-4 w-4 text-[#0074ff] focus:ring-[#0074ff] rounded"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {option.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Independence */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Independence
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            How do you handle conflicts of interest?
          </p>
          <div className="space-y-3">
            {INDEPENDENCE_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.independence === option.value
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="independence"
                  value={option.value}
                  checked={data.independence === option.value}
                  onChange={() => handleRadioChange('independence', option.value)}
                  className="mt-0.5 h-4 w-4 text-[#0074ff] focus:ring-[#0074ff]"
                />
                <div className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">
                    {option.label}
                  </span>
                  <span className="block text-sm text-gray-500">
                    {option.description}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
