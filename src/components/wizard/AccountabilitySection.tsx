'use client'

import type { AccountabilityFramework } from '@/types/database'

interface AccountabilitySectionProps {
  data: AccountabilityFramework
  onChange: (data: AccountabilityFramework) => void
}

const CORRECTION_OPTIONS = [
  { value: '24h', label: 'Within 24 hours', description: 'We correct confirmed errors within one day' },
  { value: '48h', label: 'Within 48 hours', description: 'We correct confirmed errors within two days' },
  { value: '1_week', label: 'Within one week', description: 'We correct confirmed errors within a week' },
  { value: 'no_policy', label: 'No set timeframe', description: 'We correct errors but have no specific timeframe' },
] as const

const FEEDBACK_OPTIONS = [
  { value: 'email', label: 'Email', description: 'Readers can email us directly' },
  { value: 'form', label: 'Contact form', description: 'We have a dedicated feedback form' },
  { value: 'public_comment', label: 'Public comments', description: 'Readers can comment publicly on our content' },
] as const

const REVIEW_OPTIONS = [
  { value: 'quarterly', label: 'Quarterly', description: 'We review this policy every three months' },
  { value: 'annually', label: 'Annually', description: 'We review this policy once a year' },
  { value: 'as_needed', label: 'As needed', description: 'We review this policy when circumstances require' },
] as const

export function AccountabilitySection({ data, onChange }: AccountabilitySectionProps) {
  const handleRadioChange = (field: 'correction_timeframe' | 'review_schedule', value: string) => {
    onChange({ ...data, [field]: value })
  }

  const handleFeedbackToggle = (value: 'email' | 'form' | 'public_comment') => {
    const current = data.feedback_mechanism
    const newValue = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    onChange({ ...data, feedback_mechanism: newValue })
  }

  const handleContactChange = (value: string) => {
    onChange({ ...data, accountability_contact: value })
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          How Do You Stay Accountable?
        </h1>
        <p className="text-gray-600">
          Define your accountability framework and review process
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Correction Timeframe */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Corrections Policy
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Within what timeframe do you correct confirmed errors?
          </p>
          <div className="space-y-3">
            {CORRECTION_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.correction_timeframe === option.value
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="correction"
                  value={option.value}
                  checked={data.correction_timeframe === option.value}
                  onChange={() => handleRadioChange('correction_timeframe', option.value)}
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

        {/* Feedback Mechanism */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Feedback Channels
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            How can your audience raise concerns? (Select all that apply)
          </p>
          <div className="space-y-3">
            {FEEDBACK_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.feedback_mechanism.includes(option.value)
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={data.feedback_mechanism.includes(option.value)}
                  onChange={() => handleFeedbackToggle(option.value)}
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

        {/* Accountability Contact */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Accountability Contact
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Who is responsible for upholding editorial standards?
          </p>
          <input
            type="text"
            value={data.accountability_contact}
            onChange={(e) => handleContactChange(e.target.value)}
            placeholder="e.g., Editor-in-Chief, Managing Editor, Jane Smith (Publisher)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent"
          />
        </div>

        {/* Review Schedule */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Policy Review Schedule
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            How often do you review and update this policy?
          </p>
          <div className="space-y-3">
            {REVIEW_OPTIONS.map(option => (
              <label
                key={option.value}
                className={`
                  flex items-start p-3 rounded-lg border cursor-pointer transition-colors
                  ${data.review_schedule === option.value
                    ? 'border-[#0074ff] bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <input
                  type="radio"
                  name="review"
                  value={option.value}
                  checked={data.review_schedule === option.value}
                  onChange={() => handleRadioChange('review_schedule', option.value)}
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
