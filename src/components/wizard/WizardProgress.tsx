'use client'

interface WizardStep {
  id: number
  name: string
  description?: string
}

interface WizardProgressProps {
  steps: WizardStep[]
  currentStep: number
}

export function WizardProgress({ steps, currentStep }: WizardProgressProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center gap-2 md:gap-4">
        {steps.map((step, index) => {
          const isComplete = step.id < currentStep
          const isCurrent = step.id === currentStep
          const isPending = step.id > currentStep

          return (
            <li key={step.id} className="flex items-center">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold
                    ${isComplete ? 'bg-[#0074ff] text-white' : ''}
                    ${isCurrent ? 'border-2 border-[#0074ff] bg-white text-[#0074ff]' : ''}
                    ${isPending ? 'border-2 border-gray-300 bg-white text-gray-400' : ''}
                  `}
                >
                  {isComplete ? (
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs font-medium hidden md:block
                    ${isCurrent ? 'text-[#0074ff]' : ''}
                    ${isPending ? 'text-gray-400' : ''}
                    ${isComplete ? 'text-gray-600' : ''}
                  `}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-0.5 w-8 md:w-16 mx-2
                    ${step.id < currentStep ? 'bg-[#0074ff]' : 'bg-gray-300'}
                  `}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
