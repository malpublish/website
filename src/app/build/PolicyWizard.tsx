'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type {
  PublishingIdentity,
  EditorialCommitments,
  AccountabilityFramework,
  SectorTemplate,
} from '@/types/database'
import {
  WizardProgress,
  IdentitySection,
  CommitmentsSection,
  AccountabilitySection,
} from '@/components/wizard'

interface PolicyWizardProps {
  sectors: Array<{
    slug: string
    name: string
    category: string | null
  }>
}

const WIZARD_STEPS = [
  { id: 1, name: 'Identity' },
  { id: 2, name: 'Commitments' },
  { id: 3, name: 'Accountability' },
  { id: 4, name: 'Your Policy' },
]

const DEFAULT_IDENTITY: PublishingIdentity = {
  organization_name: '',
  sector: '',
  primary_audience: '',
  publishing_mission: '',
}

const DEFAULT_COMMITMENTS: EditorialCommitments = {
  sourcing: 'two_independent',
  accuracy: 'editor_review',
  transparency: {
    funding: false,
    ownership: false,
    corrections: false,
    editorial_process: false,
  },
  independence: 'disclosure_policy',
}

const DEFAULT_ACCOUNTABILITY: AccountabilityFramework = {
  correction_timeframe: '48h',
  feedback_mechanism: ['email'],
  accountability_contact: '',
  review_schedule: 'annually',
}

export function PolicyWizard({ sectors }: PolicyWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [identity, setIdentity] = useState<PublishingIdentity>(DEFAULT_IDENTITY)
  const [commitments, setCommitments] = useState<EditorialCommitments>(DEFAULT_COMMITMENTS)
  const [accountability, setAccountability] = useState<AccountabilityFramework>(DEFAULT_ACCOUNTABILITY)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Validation for each step
  const isStep1Valid = identity.organization_name.trim() !== '' &&
    identity.sector !== '' &&
    identity.primary_audience.trim() !== ''

  // Step 2 is always valid since we have defaults
  const isStep2Valid = true

  // Step 3 requires at least one feedback mechanism
  const isStep3Valid = accountability.feedback_mechanism.length > 0

  const canProceed = (step: number) => {
    switch (step) {
      case 1: return isStep1Valid
      case 2: return isStep2Valid
      case 3: return isStep3Valid
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${identity.organization_name} Publishing Policy`,
          sector: identity.sector,
          publishing_identity: identity,
          editorial_commitments: commitments,
          accountability_framework: accountability,
          // Legacy fields - empty for new wizard
          items: [],
          guidelines: [],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save policy')
      }

      const { edit_token } = await response.json()
      router.push(`/policy/edit/${edit_token}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsSaving(false)
    }
  }

  // Map sectors to the format expected by IdentitySection
  const sectorOptions = sectors.map(s => ({
    slug: s.slug,
    name: s.name,
    category: (s.category || 'Other') as import('@/types/database').SectorCategory,
  }))

  return (
    <div>
      <WizardProgress steps={WIZARD_STEPS} currentStep={currentStep} />

      {/* Section 1: Identity */}
      {currentStep === 1 && (
        <IdentitySection
          data={identity}
          sectors={sectorOptions}
          onChange={setIdentity}
        />
      )}

      {/* Section 2: Commitments */}
      {currentStep === 2 && (
        <CommitmentsSection
          data={commitments}
          onChange={setCommitments}
        />
      )}

      {/* Section 3: Accountability */}
      {currentStep === 3 && (
        <AccountabilitySection
          data={accountability}
          onChange={setAccountability}
        />
      )}

      {/* Section 4: Preview (placeholder for Sprint 3) */}
      {currentStep === 4 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              You&apos;ve Defined What You Stand For
            </h1>
            <p className="text-gray-600">
              Now let&apos;s define what would violate those commitments.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Summary of selections */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {identity.organization_name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {identity.publishing_mission || 'No mission statement provided.'}
              </p>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Sector:</span>{' '}
                  <span className="text-gray-600">
                    {sectors.find(s => s.slug === identity.sector)?.name || identity.sector}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Audience:</span>{' '}
                  <span className="text-gray-600">{identity.primary_audience}</span>
                </div>
              </div>
            </div>

            {/* Placeholder for malpublish moment - Sprint 3 */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
              <p className="text-amber-800 text-sm">
                <strong>Coming next:</strong> Based on your commitments, we&apos;ll generate
                malpublishing definitions specific to your organization. This feature is
                being built in Sprint 3.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="max-w-2xl mx-auto mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed(currentStep)}
            className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Policy'}
          </button>
        )}
      </div>
    </div>
  )
}
