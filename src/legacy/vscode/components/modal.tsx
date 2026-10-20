import React from "react"

export function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg p-0 min-w-[320px] max-w-full">
        {children}
      </div>
    </div>
  )
} 