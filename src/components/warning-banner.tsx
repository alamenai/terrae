export const WarningBanner = () => {
  return (
    <div className="relative z-50 w-full bg-linear-to-r from-rose-500/20 via-red-500/20 to-rose-500/20 border-b border-rose-500/30 px-3 sm:px-6 py-2 sm:py-3">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm text-rose-900 dark:text-rose-200 font-medium">
          This library is not production-ready yet. Developers should use it with caution and expect breaking changes.
        </p>
      </div>
    </div>
  )
}
