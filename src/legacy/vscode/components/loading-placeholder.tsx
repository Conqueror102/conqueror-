export function LoadingPlaceholder({ height = "400px" }: { height?: string }) {
  return (
    <div className="w-full bg-[#1E1E1E] rounded-md flex items-center justify-center" style={{ height }}>
      <div className="text-[#569CD6] opacity-50 animate-pulse">Loading...</div>
    </div>
  )
}
