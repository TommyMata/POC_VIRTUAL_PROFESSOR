import type { ReactNode } from 'react'

export interface CourseMetricProps {
  label: string
  value: ReactNode
  className?: string
}

export function CourseMetric({ label, value, className = '' }: CourseMetricProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-[13px] text-neutral-400 font-medium uppercase tracking-wide max-sm:text-xs">
        {label}:
      </span>
      <span className="text-lg font-semibold text-primary-500 max-lg:text-base max-sm:text-sm">
        {value}
      </span>
    </div>
  )
}
